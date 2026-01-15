# analyze_pitch.py
import json
import numpy as np
import librosa
import soundfile as sf
import os
from pathlib import Path

def extract_pitch_contour(audio_path):
    """Extract pitch contour using librosa"""
    try:
        # Load audio
        y, sr = librosa.load(audio_path, sr=22050)

        # Extract pitch using PYIN algorithm (good for speech)
        f0, voiced_flag, voiced_probs = librosa.pyin(
            y,
            fmin=librosa.note_to_hz('C2'),  # ~65 Hz
            fmax=librosa.note_to_hz('C7'),  # ~2093 Hz
            sr=sr,
            frame_length=2048,
            hop_length=512
        )

        # Convert to Hz, filter unvoiced segments
        times = librosa.times_like(f0, sr=sr, hop_length=512)
        pitch_data = []

        for t, pitch, voiced in zip(times, f0, voiced_flag):
            if voiced and not np.isnan(pitch):
                pitch_data.append({
                    'time': float(t),
                    'pitch': float(pitch),
                    'midi': float(librosa.hz_to_midi(pitch) if pitch > 0 else 0)
                })

        # Extract additional features
        duration = librosa.get_duration(y=y, sr=sr)
        rms = librosa.feature.rms(y=y, hop_length=512)[0]
        energy = float(np.mean(rms))

        # Tone classification for Mandarin (simplified)
        tone = classify_mandarin_tone(pitch_data)

        return {
            'file': os.path.basename(audio_path),
            'duration': float(duration),
            'energy': energy,
            'tone': tone,
            'pitch_contour': pitch_data,
            'stats': {
                'mean_pitch': float(np.nanmean(f0[voiced_flag])),
                'std_pitch': float(np.nanstd(f0[voiced_flag])),
                'min_pitch': float(np.nanmin(f0[voiced_flag])),
                'max_pitch': float(np.nanmax(f0[voiced_flag]))
            }
        }

    except Exception as e:
        print(f"Error processing {audio_path}: {e}")
        return None

def classify_mandarin_tone(pitch_data):
    """Simple tone classification based on pitch contour"""
    if not pitch_data:
        return 5  # Neutral

    pitches = [p['pitch'] for p in pitch_data]
    if len(pitches) < 3:
        return 5

    # Normalize pitches
    pitches_norm = (pitches - np.mean(pitches)) / np.std(pitches)

    # Calculate slope (linear regression)
    x = np.arange(len(pitches_norm))
    slope = np.polyfit(x, pitches_norm, 1)[0]

    # Classify based on contour shape
    if abs(slope) < 0.1:  # Flat
        if np.mean(pitches) > 200:
            return 1  # High level tone
        else:
            return 3  # Low/dipping level tone
    elif slope > 0.2:  # Rising
        return 2  # Rising tone
    elif slope < -0.2:  # Falling
        return 4  # Falling tone
    else:  # Complex contour
        return 3  # Dipping (simplified)

def analyze_directory_to_js(audio_dir, output_file='words_analysis.js'):
    """Analyze all audio files and save as JavaScript file"""
    results = {}

    audio_extensions = {'.mp3', '.wav', '.m4a', '.ogg', '.flac'}

    print(f"Scanning directory: {audio_dir}")

    for file_path in Path(audio_dir).iterdir():
        if file_path.suffix.lower() in audio_extensions:
            print(f"Analyzing: {file_path.name}")
            analysis = extract_pitch_contour(str(file_path))
            if analysis:
                # Use filename without extension as key
                key = file_path.stem

                # Clean up the key for JavaScript (no spaces, special chars)
                key = key.replace(' ', '_').replace('-', '_').lower()

                results[key] = analysis

    # Generate JavaScript file content
    js_content = f"""// Auto-generated pitch analysis data
// Generated from audio files in: {audio_dir}
// Total files analyzed: {len(results)}

const WORDS_ANALYSIS = {json.dumps(results, indent=2, ensure_ascii=False, sort_keys=True)};

// Export for use in Vue app
if (typeof window !== 'undefined') {{
  window.WORDS_ANALYSIS = WORDS_ANALYSIS;
}}
"""

    # Save to JS file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"\n✅ Analysis saved to: {output_file}")
    print(f"📊 Files analyzed: {len(results)}")

    # Print summary
    print("\n📋 Summary of analyzed words:")
    for key in results:
        tone = results[key].get('tone', '?')
        print(f"  - {key}: Tone {tone}, Duration: {results[key]['duration']:.2f}s")

    return results


if __name__ == "__main__":
    analyze_directory_to_js("../../magic/audio", output_file="../../magic/words_analysis.js")

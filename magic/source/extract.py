import cv2
import os
import subprocess
import numpy as np

class WordSlideExtractor:
    def __init__(self, video_path, output_folder):
        self.video_path = video_path
        self.output_folder = output_folder
        self.video_cv = cv2.VideoCapture(video_path)

        # Create output directories
        self.slide_dir = os.path.join(output_folder, "slides")
        self.audio_dir = os.path.join(output_folder, "../audio")
        os.makedirs(self.slide_dir, exist_ok=True)
        os.makedirs(self.audio_dir, exist_ok=True)

        self.fps = self.video_cv.get(cv2.CAP_PROP_FPS)
        self.frame_count = int(self.video_cv.get(cv2.CAP_PROP_FRAME_COUNT))
        self.duration = self.frame_count / self.fps if self.fps > 0 else 0

    def detect_slide_changes(self, threshold=30.0):
        """Detect when slides change"""
        print("Detecting slide changes...")

        slide_times = [0.0]  # Start with beginning
        prev_frame = None
        frame_count = 0

        while True:
            ret, frame = self.video_cv.read()
            if not ret:
                break

            current_time = frame_count / self.fps

            # Convert to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            if prev_frame is not None:
                diff = cv2.absdiff(gray, prev_frame)
                diff_score = np.mean(diff)

                # If significant change, mark as slide change
                if diff_score > threshold and (current_time - slide_times[-1]) > 1.0:
                    slide_times.append(current_time)
                    print(f"Slide change detected at {current_time:.2f}s")

            prev_frame = gray.copy()
            frame_count += 1

        # Add end time
        slide_times.append(self.duration)

        # Reset video capture
        self.video_cv.release()
        self.video_cv = cv2.VideoCapture(self.video_path)

        return slide_times

    def extract_slides_and_audio(self, slide_times):
        """Extract slides and audio for each detected segment"""
        print(f"\nExtracting {len(slide_times)-1} slides...")

        for i in range(len(slide_times) - 1):
            start_time = slide_times[i]
            end_time = slide_times[i + 1]

            # Extract slide at the start of the segment
            self.video_cv.set(cv2.CAP_PROP_POS_MSEC, start_time * 1000)
            ret, frame = self.video_cv.read()

            if ret and (end_time - start_time) > 0.1:  # Ignore very short segments
                # Save slide
                slide_path = os.path.join(self.slide_dir, f"word_{i:03d}.jpg")
                cv2.imwrite(slide_path, frame)

                # Extract audio segment using ffmpeg
                audio_path = os.path.join(self.audio_dir, f"word_{i:03d}.mp3")
                
                cmd = [
                    'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error',
                    '-i', self.video_path,
                    '-ss', str(start_time),
                    '-to', str(end_time),
                    '-vn', # No video
                    '-acodec', 'libmp3lame',
                    audio_path
                ]

                try:
                    subprocess.run(cmd, check=True)
                    print(f"Extracted: word_{i:03d}.jpg + word_{i:03d}.mp3 "
                          f"({end_time-start_time:.1f}s)")
                except subprocess.CalledProcessError as e:
                    print(f"Error extracting audio for segment {i}: {e}")
                except FileNotFoundError:
                    print("Error: ffmpeg not found. Please ensure ffmpeg is installed.")
                    return

    def run(self):
        """Main extraction process"""
        print(f"Processing: {os.path.basename(self.video_path)}")
        print(f"Duration: {self.duration:.2f}s")

        # Detect slide changes
        slide_times = self.detect_slide_changes()

        # Extract slides and audio
        self.extract_slides_and_audio(slide_times)

        # Cleanup
        self.video_cv.release()

        print(f"\n✅ Extraction complete!")
        print(f"Slides saved in: {self.slide_dir}")
        print(f"Audio saved in: {self.audio_dir}")

# Usage
if __name__ == "__main__":
    # Install required packages first:
    # pip install opencv-python numpy

    extractor = WordSlideExtractor(
        video_path="../magic汉字_视频.mp4",
        output_folder="../"
    )
    extractor.run()

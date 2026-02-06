//
//  ContentView.swift
//  MandarinWatch Watch App
//
//  Main view for displaying flashcards on Apple Watch
//

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var connectivity: WatchConnectivityManager
    @State private var currentIndex = 0
    @State private var showPinyin = true
    @State private var showEnglish = true
    
    var currentWord: WordData? {
        guard !connectivity.words.isEmpty else { return nil }
        return connectivity.words[currentIndex]
    }
    
    var body: some View {
        NavigationView {
            if connectivity.words.isEmpty {
                EmptyStateView()
            } else {
                FlashcardView(
                    word: currentWord,
                    currentIndex: currentIndex,
                    totalWords: connectivity.words.count,
                    showPinyin: $showPinyin,
                    showEnglish: $showEnglish,
                    onNext: nextWord,
                    onPrevious: previousWord
                )
            }
        }
    }
    
    private func nextWord() {
        if currentIndex < connectivity.words.count - 1 {
            currentIndex += 1
            // Send update to iPhone
            connectivity.sendCurrentIndex(currentIndex)
        }
    }
    
    private func previousWord() {
        if currentIndex > 0 {
            currentIndex -= 1
            // Send update to iPhone
            connectivity.sendCurrentIndex(currentIndex)
        }
    }
}

struct EmptyStateView: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "iphone.and.arrow.forward")
                .font(.system(size: 40))
                .foregroundColor(.blue)
            
            Text("Waiting for iPhone")
                .font(.headline)
            
            Text("Start a session on your iPhone to begin")
                .font(.caption)
                .multilineTextAlignment(.center)
                .foregroundColor(.secondary)
                .padding(.horizontal)
        }
        .padding()
    }
}

struct FlashcardView: View {
    let word: WordData?
    let currentIndex: Int
    let totalWords: Int
    @Binding var showPinyin: Bool
    @Binding var showEnglish: Bool
    let onNext: () -> Void
    let onPrevious: () -> Void
    
    private func getDisplayIcon() -> String {
        if showPinyin && showEnglish {
            return "textformat.abc"  // Both shown
        } else if showPinyin {
            return "textformat.alt"  // Pinyin only
        } else if showEnglish {
            return "textformat.123"  // English only
        } else {
            return "eye.slash"       // None shown (shouldn't happen)
        }
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 8) {
                // Progress indicator
                HStack {
                    Text("\(currentIndex + 1)/\(totalWords)")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Spacer()
                }
                .padding(.horizontal, 4)
                
                if let word = word {
                    // Image
                    if let imageData = word.imageData,
                       let uiImage = UIImage(data: imageData) {
                        Image(uiImage: uiImage)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(maxHeight: 100)
                            .cornerRadius(8)
                    } else {
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.gray.opacity(0.3))
                            .frame(height: 100)
                            .overlay(
                                Image(systemName: "photo")
                                    .font(.largeTitle)
                                    .foregroundColor(.gray)
                            )
                    }
                    
                    // Chinese characters
                    Text(word.hanzi)
                        .font(.system(size: 28, weight: .bold))
                        .padding(.top, 4)
                    
                    // Pinyin (toggleable)
                    if showPinyin {
                        Text(word.pinyin)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                    
                    // English (toggleable)
                    if showEnglish {
                        Text(word.english)
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                            .padding(.top, 2)
                    }
                    
                    // Categories
                    if !word.categories.isEmpty {
                        HStack(spacing: 4) {
                            ForEach(word.categories.prefix(2), id: \.self) { category in
                                Text(category)
                                    .font(.system(size: 8))
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(Color.blue.opacity(0.2))
                                    .cornerRadius(4)
                            }
                        }
                        .padding(.top, 4)
                    }
                    
                    // Navigation buttons
                    HStack(spacing: 12) {
                        Button(action: onPrevious) {
                            Image(systemName: "chevron.left")
                                .font(.title3)
                        }
                        .disabled(currentIndex == 0)
                        .buttonStyle(.bordered)
                        
                        Spacer()
                        
                        // Toggle button (cycles through display modes)
                        Button(action: {
                            // Cycle through: Both → Pinyin only → English only → Both
                            if showPinyin && showEnglish {
                                showEnglish = false
                            } else if showPinyin && !showEnglish {
                                showPinyin = false
                                showEnglish = true
                            } else if !showPinyin && showEnglish {
                                showPinyin = true
                                showEnglish = true
                            } else {
                                showPinyin = true
                                showEnglish = false
                            }
                        }) {
                            Image(systemName: getDisplayIcon())
                                .font(.title3)
                        }
                        .buttonStyle(.bordered)
                        
                        Spacer()
                        
                        Button(action: onNext) {
                            Image(systemName: "chevron.right")
                                .font(.title3)
                        }
                        .disabled(currentIndex >= totalWords - 1)
                        .buttonStyle(.bordered)
                    }
                    .padding(.top, 8)
                }
            }
            .padding()
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(WatchConnectivityManager.shared)
}

//
//  WatchSyncPlugin.swift
//  App
//
//  Capacitor plugin to sync data with Apple Watch
//

import Foundation
import Capacitor

@objc(WatchSyncPlugin)
public class WatchSyncPlugin: CAPPlugin {
    private let connectivity = PhoneConnectivityManager.shared
    
    @objc func syncWords(_ call: CAPPluginCall) {
        guard let wordsArray = call.getArray("words", [String: Any].self) else {
            call.reject("Words array is required")
            return
        }
        
        // Process words to include base64 images
        var processedWords: [[String: Any]] = []
        
        for word in wordsArray {
            var wordDict = word
            
            // Convert image path to base64 if available
            if let imagePath = word["image"] as? String {
                let imageData = loadImageAsBase64(imagePath)
                wordDict["imageBase64"] = imageData
            }
            
            processedWords.append(wordDict)
        }
        
        connectivity.updateWords(processedWords)
        call.resolve(["success": true])
    }
    
    @objc func syncCurrentIndex(_ call: CAPPluginCall) {
        guard let index = call.getInt("index") else {
            call.reject("Index is required")
            return
        }
        
        connectivity.updateCurrentIndex(index)
        call.resolve(["success": true])
    }
    
    @objc func isWatchConnected(_ call: CAPPluginCall) {
        call.resolve(["connected": connectivity.isWatchConnected])
    }
    
    private func loadImageAsBase64(_ imagePath: String) -> String? {
        // Remove leading slash if present
        let cleanPath = imagePath.hasPrefix("/") ? String(imagePath.dropFirst()) : imagePath
        
        // Try to load from bundle
        guard let url = Bundle.main.url(forResource: cleanPath, withExtension: nil),
              let imageData = try? Data(contentsOf: url) else {
            return nil
        }
        
        return imageData.base64EncodedString()
    }
}

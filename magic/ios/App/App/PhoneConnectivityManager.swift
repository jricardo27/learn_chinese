//
//  PhoneConnectivityManager.swift
//  App
//
//  Manages communication between iPhone and Apple Watch
//  This file should be added to your iOS app target
//

import Foundation
import Combine
import WatchConnectivity
import Capacitor

class PhoneConnectivityManager: NSObject, ObservableObject {
    static let shared = PhoneConnectivityManager()
    
    @Published var isWatchConnected = false
    private var currentWords: [[String: Any]] = []
    private var currentIndex: Int = 0
    
    private override init() {
        super.init()
        
        if WCSession.isSupported() {
            let session = WCSession.default
            session.delegate = self
            session.activate()
        }
    }
    
    // Call this from your JavaScript bridge
    func updateWords(_ words: [[String: Any]]) {
        self.currentWords = words
        sendWordsToWatch()
    }
    
    func updateCurrentIndex(_ index: Int) {
        self.currentIndex = index
        sendIndexToWatch()
    }
    
    private func sendWordsToWatch() {
        guard WCSession.default.activationState == .activated else { return }
        
        // Send via application context for reliable delivery
        do {
            try WCSession.default.updateApplicationContext(["words": currentWords])
        } catch {
            print("Error sending words to watch: \(error.localizedDescription)")
        }
        
        // Also try immediate message if watch is reachable
        if WCSession.default.isReachable {
            WCSession.default.sendMessage(["words": currentWords], replyHandler: nil) { error in
                print("Error sending immediate words: \(error.localizedDescription)")
            }
        }
    }
    
    private func sendIndexToWatch() {
        guard WCSession.default.isReachable else { return }
        
        let message = ["currentIndex": currentIndex]
        WCSession.default.sendMessage(message, replyHandler: nil) { error in
            print("Error sending index to watch: \(error.localizedDescription)")
        }
    }
}

extension PhoneConnectivityManager: WCSessionDelegate {
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        DispatchQueue.main.async {
            self.isWatchConnected = activationState == .activated && session.isWatchAppInstalled
        }
    }
    
    func sessionDidBecomeInactive(_ session: WCSession) {
        DispatchQueue.main.async {
            self.isWatchConnected = false
        }
    }
    
    func sessionDidDeactivate(_ session: WCSession) {
        session.activate()
    }
    
    func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
        // Handle messages from watch
        if let index = message["currentIndex"] as? Int {
            DispatchQueue.main.async {
                self.currentIndex = index
                // Notify JavaScript
                NotificationCenter.default.post(
                    name: NSNotification.Name("WatchIndexChanged"),
                    object: nil,
                    userInfo: ["index": index]
                )
            }
        }
        
        if message["request"] as? String == "words" {
            // Watch is requesting current words
            sendWordsToWatch()
        }
    }
}

//
//  WatchConnectivityManager.swift
//  MandarinWatch Watch App
//
//  Manages communication between iPhone and Apple Watch
//

import Foundation
import Combine
import WatchConnectivity

class WatchConnectivityManager: NSObject, ObservableObject {
    static let shared = WatchConnectivityManager()
    
    @Published var words: [WordData] = []
    @Published var currentIndexFromPhone: Int = 0
    @Published var isConnected = false
    
    private override init() {
        super.init()
        
        if WCSession.isSupported() {
            let session = WCSession.default
            session.delegate = self
            session.activate()
        }
    }
    
    func sendCurrentIndex(_ index: Int) {
        guard WCSession.default.isReachable else { return }
        
        let message = ["currentIndex": index]
        WCSession.default.sendMessage(message, replyHandler: nil) { error in
            print("Error sending index to iPhone: \(error.localizedDescription)")
        }
    }
    
    func requestWords() {
        guard WCSession.default.isReachable else { return }
        
        let message = ["request": "words"]
        WCSession.default.sendMessage(message, replyHandler: { response in
            if let wordsData = response["words"] as? [[String: Any]] {
                self.parseWords(wordsData)
            }
        }) { error in
            print("Error requesting words: \(error.localizedDescription)")
        }
    }
    
    private func parseWords(_ wordsData: [[String: Any]]) {
        DispatchQueue.main.async {
            self.words = wordsData.compactMap { dict in
                guard let pinyin = dict["pinyin"] as? String,
                      let hanzi = dict["hanzi"] as? String,
                      let english = dict["english"] as? String else {
                    return nil
                }
                
                let categories = dict["categories"] as? [String] ?? []
                let imageBase64 = dict["imageBase64"] as? String
                let imageData = imageBase64.flatMap { Data(base64Encoded: $0) }
                
                return WordData(
                    pinyin: pinyin,
                    hanzi: hanzi,
                    english: english,
                    categories: categories,
                    imageData: imageData
                )
            }
        }
    }
}

extension WatchConnectivityManager: WCSessionDelegate {
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        DispatchQueue.main.async {
            self.isConnected = activationState == .activated
        }
        
        if activationState == .activated {
            requestWords()
        }
    }
    
    func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
        if let wordsData = message["words"] as? [[String: Any]] {
            parseWords(wordsData)
        }
        
        if let index = message["currentIndex"] as? Int {
            DispatchQueue.main.async {
                self.currentIndexFromPhone = index
            }
        }
    }
    
    func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
        if let wordsData = applicationContext["words"] as? [[String: Any]] {
            parseWords(wordsData)
        }
    }
}

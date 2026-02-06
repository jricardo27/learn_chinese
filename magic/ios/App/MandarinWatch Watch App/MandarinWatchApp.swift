//
//  MandarinWatchApp.swift
//  MandarinWatch Watch App
//
//  Mandarin Learner Watch Companion App
//

import SwiftUI

@main
struct MandarinWatch_Watch_AppApp: App {
    @StateObject private var connectivity = WatchConnectivityManager.shared
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(connectivity)
        }
    }
}

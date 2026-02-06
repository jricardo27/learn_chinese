//
//  WatchSyncPlugin.m
//  App
//
//  Capacitor plugin registration for WatchSync
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(WatchSyncPlugin, "WatchSync",
    CAP_PLUGIN_METHOD(syncWords, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(syncCurrentIndex, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(isWatchConnected, CAPPluginReturnPromise);
)

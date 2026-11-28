//
//  WordData.swift
//  MandarinWatch Watch App
//
//  Data model for Chinese words
//

import Foundation

struct WordData: Identifiable, Codable {
    let id = UUID()
    let pinyin: String
    let hanzi: String
    let english: String
    let categories: [String]
    let imageData: Data?
    
    enum CodingKeys: String, CodingKey {
        case pinyin, hanzi, english, categories, imageData
    }
}

import React from 'react'
import { Brain, BookOpen, MessageCircle, TrendingUp, Shield, Lock, Heart, Sparkles, ChevronRight, Menu, X, Check, Star } from 'lucide-react';

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">WellNest</span>
          </div>
          <p className="text-sm">&copy; 2025 WellNest. Your emotions, your privacy, your journey.</p>
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer
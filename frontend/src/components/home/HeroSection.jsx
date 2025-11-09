import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Sparkles, ChevronRight, Check } from 'lucide-react';



const HeroSection = () => {
  const benefits = [
    "End-to-end AES encryption",
    "Private & secure by default",
    "No ads, ever",
    "Export your data anytime"
  ];

  return (
    <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">AI-Powered Mental Wellness</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your personal space for<br />
                <span className="text-emerald-600">emotional wellness</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Journal your thoughts, understand your emotions, and chat with an AI companion that truly cares. All private, secure, and designed for your mental health.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-semibold text-base shadow-lg shadow-emerald-600/20 flex items-center gap-2">
                  Start Journaling Free
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-all font-semibold text-base">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center text-sm text-gray-500 font-medium">WellNest Dashboard</div>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-emerald-50 to-blue-50">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Journal Preview */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Today's Entry</h3>
                        <p className="text-sm text-gray-500">October 18, 2025</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-100 rounded w-full"></div>
                      <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {['😊', '😌', '😐', '😔', '😤'].map((emoji, i) => (
                        <button key={i} className="w-10 h-10 bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all text-lg">
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Insights Preview */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-900 text-sm">AI Insight</span>
                      </div>
                      <p className="text-sm text-gray-600">You're experiencing positive growth this week. Keep it up! 🌟</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Mood Trend</span>
                        <span className="text-sm text-emerald-600 font-semibold">↑ 23%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-3/4 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
  )
}

export default HeroSection
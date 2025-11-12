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
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                className="max-w-6xl mx-auto mt-20"
            >
                <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-300/30 border border-gray-200 overflow-hidden">
                    {/* Mockup Top Bar (Browser/App Header) */}
                    <div className="bg-gray-100 border-b border-gray-200 px-6 py-3 flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="flex-1 text-center text-sm text-gray-500 font-medium">wellnest.app/dashboard</div>
                    </div>
                    
                    {/* Mockup Content */}
                    <div className="p-8 bg-gradient-to-br from-gray-50 to-emerald-50/50">
                        <div className="grid md:grid-cols-2 gap-8">
                            
                            {/* Journal Preview Card */}
                            <motion.div 
                                whileHover={{ y: -5, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Morning Flow State</h3>
                                        <p className="text-sm text-gray-500">Oct 25, 2025 | Mood: Happy 😊</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    "I achieved a flow state during my project work today. The distraction-free morning was crucial. I felt calm, focused, and deeply productive..."
                                </p>
                                <div className="flex gap-3">
                                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">#work</span>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">#gratitude</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">#focus</span>
                                </div>
                            </motion.div>

                            {/* AI Insights Card */}
                            <motion.div 
                                whileHover={{ y: -5, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="space-y-4"
                            >
                                {/* AI Summary Block */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Brain className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="font-bold text-gray-900 text-lg">Pattern Analysis</span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        The AI detects a strong correlation between **early mornings** and your **peak flow state**. Try optimizing your schedule around this finding.
                                    </p>
                                </div>
                                
                                {/* Mood Trend Block */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Recent Mood Index</span>
                                        <span className="text-base text-emerald-600 font-bold flex items-center gap-1">
                                            <Sparkles className="w-4 h-4"/> +23%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[80%] rounded-full"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Overall positive sentiment increase over the last 7 days.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
  )
}

export default HeroSection
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, Plus, Save, X, Tag, Brain, TrendingUp, Sparkles, Clock, Filter, ChevronLeft, ChevronRight, Check, Smile, Meh, Frown, Heart, Zap } from 'lucide-react';

const AiInsightPanel = () => {
      const [journalContent, setJournalContent] = useState('');

      const aiInsights = {
        emotion: 'Reflective and Calm',
        emotionColor: 'from-emerald-500 to-teal-500',
        summary: 'You mentioned feeling grateful and hopeful. Your writing shows a positive shift in perspective.',
        trend: 'Your stress levels are 25% lower than last week. Keep up the mindful journaling! 🌟'
      };

  return (
    <div className='w-fu'>
        <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Emotion Insight Card */}
            <div className={`bg-gradient-to-br ${aiInsights.emotionColor} rounded-3xl shadow-xl p-6 text-white relative overflow-hidden`}>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/80">Detected Emotion</p>
                    <p className="text-lg font-bold">{aiInsights.emotion}</p>
                  </div>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{aiInsights.summary}</p>
              </div>
            </div>

            {/* Trend Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Emotional Trend</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{aiInsights.trend}</p>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Writing Tip</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Try writing about three things you're grateful for today. Gratitude journaling can boost your mood! ✨
              </p>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Today's Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Words written</span>
                  <span className="text-sm font-bold text-gray-900">{journalContent.split(' ').filter(w => w).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Time spent</span>
                  <span className="text-sm font-bold text-gray-900">5 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Current streak</span>
                  <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    7 days
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
    </div>
  )
}

export default AiInsightPanel
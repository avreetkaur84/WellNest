import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Filter, Grid, List, Eye, Edit2, Trash2, X, TrendingUp, Flame, BookOpen, Download, ChevronDown, BarChart3, Plus, CloudDownload } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const JournalHistory = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const moods = [
    { value: 'all', label: 'All Moods', emoji: '🌈' },
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'sad', label: 'Sad', emoji: '😔' },
    { value: 'anxious', label: 'Anxious', emoji: '😤' },
    { value: 'angry', label: 'Angry', emoji: '😡' }
  ];

  const tags = ['all', 'work', 'family', 'gratitude', 'stress', 'health', 'friends', 'love'];

  const mockEntries = [
    { 
      id: 1, 
      date: 'Oct 18, 2025', 
      fullDate: 'October 18, 2025',
      mood: { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      title: 'Morning Reflections',
      preview: 'Today started with a peaceful walk in the park. The autumn leaves were beautiful, and I felt deeply grateful for the simple pleasures in life...',
      content: 'Today started with a peaceful walk in the park. The autumn leaves were beautiful, and I felt deeply grateful for the simple pleasures in life. Work has been challenging lately, but I\'m learning to appreciate the small victories. Spent quality time with family in the evening. These moments remind me what truly matters.',
      tags: ['gratitude', 'family', 'health'],
      wordCount: 156,
      aiSummary: 'Your tone is optimistic and reflective. You expressed gratitude and appreciation for life\'s simple moments. The balance between acknowledging challenges and celebrating small wins shows emotional maturity.'
    },
    {
      id: 2,
      date: 'Oct 17, 2025',
      fullDate: 'October 17, 2025',
      mood: { emoji: '😤', label: 'Anxious', color: 'bg-orange-100 text-orange-700 border-orange-300' },
      title: 'Work Deadline Approaching',
      preview: 'The project deadline is approaching and I\'m feeling overwhelmed. There\'s so much to do and not enough time. I need to remind myself to take breaks...',
      content: 'The project deadline is approaching and I\'m feeling overwhelmed. There\'s so much to do and not enough time. I need to remind myself to take breaks and not let stress consume me. Deep breaths. One task at a time. I\'ve handled difficult situations before, and I will handle this one too.',
      tags: ['work', 'stress'],
      wordCount: 89,
      aiSummary: 'You mentioned feeling overwhelmed by work pressure. Remember to practice self-compassion during stressful times. Your recognition of the need for breaks is a positive coping strategy.'
    },
    {
      id: 3,
      date: 'Oct 16, 2025',
      fullDate: 'October 16, 2025',
      mood: { emoji: '😌', label: 'Calm', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      title: 'Evening Gratitude',
      preview: 'Spent quality time with family today. We had dinner together and shared stories from our week. These moments are precious...',
      content: 'Spent quality time with family today. We had dinner together and shared stories from our week. These moments are precious and remind me what really matters in life. Feeling peaceful and content. The connection with loved ones is healing.',
      tags: ['family', 'love', 'gratitude'],
      wordCount: 112,
      aiSummary: 'Your writing shows warmth and connection. Family time brought you peace and contentment. Social bonds are clearly important to your emotional wellbeing.'
    },
    {
      id: 4,
      date: 'Oct 15, 2025',
      fullDate: 'October 15, 2025',
      mood: { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      title: 'Tough Day',
      preview: 'Feeling a bit low today. Not sure why, but everything feels heavier. Maybe I just need rest...',
      content: 'Feeling a bit low today. Not sure why, but everything feels heavier. Maybe I just need rest. Sometimes it\'s okay to not be okay. Tomorrow is a new day. I\'m allowing myself to feel these emotions without judgment.',
      tags: ['health', 'stress'],
      wordCount: 78,
      aiSummary: 'You acknowledged difficult emotions with self-compassion. Remember that rest and recovery are important. Your acceptance of negative feelings is a healthy approach.'
    },
    {
      id: 5,
      date: 'Oct 14, 2025',
      fullDate: 'October 14, 2025',
      mood: { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      title: 'Catching Up with Friends',
      preview: 'Had coffee with Sarah today. We laughed so much! It\'s been too long since we connected. Friendship is healing...',
      content: 'Had coffee with Sarah today. We laughed so much! It\'s been too long since we connected. Friendship is healing. I need to make more time for the people who lift me up. Good conversations nourish the soul.',
      tags: ['friends', 'love'],
      wordCount: 95,
      aiSummary: 'Social connection brought you joy. Your entries show the importance of maintaining friendships. Consider scheduling regular meetups with friends who energize you.'
    },
    {
      id: 6,
      date: 'Oct 13, 2025',
      fullDate: 'October 13, 2025',
      mood: { emoji: '😌', label: 'Calm', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      title: 'Meditation and Reflection',
      preview: 'Started my day with 20 minutes of meditation. The mental clarity it brings is incredible. I feel centered and ready...',
      content: 'Started my day with 20 minutes of meditation. The mental clarity it brings is incredible. I feel centered and ready to face whatever comes my way. Need to make this a consistent habit. Mindfulness is powerful.',
      tags: ['health', 'gratitude'],
      wordCount: 102,
      aiSummary: 'Your mindfulness practice is bringing you peace. Consistency in wellness routines shows positive growth. The intention to maintain this habit is encouraging.'
    }
  ];

  const moodTrendData = [
    { date: 'Oct 10', score: 6 },
    { date: 'Oct 11', score: 5 },
    { date: 'Oct 12', score: 7 },
    { date: 'Oct 13', score: 8 },
    { date: 'Oct 14', score: 8 },
    { date: 'Oct 15', score: 4 },
    { date: 'Oct 16', score: 8 },
    { date: 'Oct 17', score: 5 },
    { date: 'Oct 18', score: 9 }
  ];

  const stats = {
    totalEntries: 47,
    mostFrequentMood: { emoji: '😌', label: 'Calm' },
    longestStreak: 12,
    topWords: ['grateful', 'peace', 'work', 'family', 'hope', 'stress', 'happy']
  };

  const filteredEntries = mockEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = selectedMood === 'all' || entry.mood.label.toLowerCase() === selectedMood;
    const matchesTag = selectedTag === 'all' || entry.tags.includes(selectedTag);
    return matchesSearch && matchesMood && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-teal-50/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Your Reflections</h1>
              <p className="text-lg text-gray-600">A look back at your emotional journey</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center gap-2"
              >
                <CloudDownload className="w-5 h-5" />
                Export All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-emerald-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-emerald-300'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by words, moods, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Mood Filter */}
              <div className="relative">
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white cursor-pointer min-w-[160px] font-medium text-gray-700"
                >
                  {moods.map(mood => (
                    <option key={mood.value} value={mood.value}>
                      {mood.emoji} {mood.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Tag Filter */}
              <div className="relative">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white cursor-pointer min-w-[140px] font-medium text-gray-700"
                >
                  {tags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag === 'all' ? '🏷️ All Tags' : `#${tag}`}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-emerald-600">{filteredEntries.length}</span> of <span className="font-semibold">{mockEntries.length}</span> entries
              </p>
              {(searchQuery || selectedMood !== 'all' || selectedTag !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMood('all');
                    setSelectedTag('all');
                  }}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Insights Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Stats Summary */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
                Your Journey
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Entries</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalEntries}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Flame className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Longest Streak</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.longestStreak} <span className="text-lg">days</span></p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                  <p className="text-sm text-gray-600 font-medium mb-3">Most Frequent Mood</p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{stats.mostFrequentMood.emoji}</span>
                    <span className="text-2xl font-bold text-gray-900">{stats.mostFrequentMood.label}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Trend Chart */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mood Trend (Last 9 Days)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={moodTrendData}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '500' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '500' }} domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '12px', 
                      padding: '8px 12px' 
                    }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#moodGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Word Cloud */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Used Words</h3>
              <div className="flex flex-wrap gap-2 justify-center py-2">
                {stats.topWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-4 py-2 bg-white border-2 border-purple-200 rounded-full font-bold text-purple-700 cursor-pointer hover:border-purple-400 transition-all ${
                      index < 2 ? 'text-base' : index < 4 ? 'text-sm' : 'text-xs'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Journal Entries */}
          <div className="lg:col-span-8">
            {filteredEntries.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-lg border-2 border-dashed border-gray-300 p-16 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">No entries found</h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                  Try adjusting your filters or search query to find what you're looking for
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMood('all');
                    setSelectedTag('all');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            ) : (
              /* Grid/List View */
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                {filteredEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedEntry(entry)}
                    className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-300 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 ${entry.mood.color} rounded-2xl border-2 flex items-center justify-center text-2xl shadow-sm`}>
                          {entry.mood.emoji}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
                            {entry.title}
                          </h3>
                          <p className="text-sm text-gray-500">{entry.date}</p>
                        </div>
                      </div>
                      <Eye className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all" />
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{entry.preview}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {entry.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="font-medium">{entry.wordCount} words</span>
                      <span className={`px-3 py-1 ${entry.mood.color} border rounded-full font-semibold`}>
                        {entry.mood.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Entry Detail Modal */}
      {/* <AnimatePresence>
        {selectedEntry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntry(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              {/* <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl shadow-lg">
                      {selectedEntry.mood.emoji}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{selectedEntry.title}</h2>
                      <p className="text-emerald-100 text-lg">{selectedEntry.fullDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Body */}
              {/* <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                  {/* Journal Content */}
                  {/* <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                      Journal Entry
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                      <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{selectedEntry.content}</p>
                      <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-300">{selectedEntry.wordCount} words</p>
                    </div>
                  </div> */} 

                  {/* AI Summary */}
                  {/* <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{selectedEntry.aiSummary}</p>
                  </div> */}

                  {/* Actions */}
                  {/* <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-5 h- */}

    </div>
    )};

export default JournalHistory;
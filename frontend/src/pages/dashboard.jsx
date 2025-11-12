import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, MessageCircle, TrendingUp, Calendar, Sparkles, RefreshCw, ArrowRight, Flame, Clock, Smile, Frown, Meh, Award, Target } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../pages/Auth'; 

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useAuth();
  // const [userName] = useState('Avreet');
  
  // Mock data - replace with API calls later
  const weeklyMoodData = [
    { day: 'Mon', calm: 7, stress: 3, joy: 6, sad: 2 },
    { day: 'Tue', calm: 8, stress: 2, joy: 7, sad: 1 },
    { day: 'Wed', calm: 6, stress: 5, joy: 5, sad: 3 },
    { day: 'Thu', calm: 9, stress: 1, joy: 8, sad: 1 },
    { day: 'Fri', calm: 8, stress: 2, joy: 9, sad: 1 },
    { day: 'Sat', calm: 9, stress: 1, joy: 8, sad: 1 },
    { day: 'Sun', calm: 7, stress: 3, joy: 7, sad: 2 }
  ];

  const emotionDistribution = [
    { name: 'Calm', value: 40, color: '#10b981' },
    { name: 'Happy', value: 30, color: '#3b82f6' },
    { name: 'Anxious', value: 20, color: '#f59e0b' },
    { name: 'Sad', value: 10, color: '#ef4444' }
  ];

  const recentEntries = [
    { id: 1, title: 'Morning Reflections', date: 'Oct 18, 2025', mood: '😊', preview: 'Today started with a peaceful walk. Feeling grateful for...', tag: 'Calm' },
    { id: 2, title: 'Work Thoughts', date: 'Oct 17, 2025', mood: '😐', preview: 'The project deadline is approaching. Feeling a bit overwhelmed...', tag: 'Stressed' },
    { id: 3, title: 'Evening Gratitude', date: 'Oct 16, 2025', mood: '😌', preview: 'Spent quality time with family today. These moments are precious...', tag: 'Happy' }
  ];

  const frequentKeywords = [
    { word: 'work', count: 45, size: 'text-3xl' },
    { word: 'family', count: 38, size: 'text-2xl' },
    { word: 'grateful', count: 32, size: 'text-2xl' },
    { word: 'sleep', count: 28, size: 'text-xl' },
    { word: 'friends', count: 25, size: 'text-xl' },
    { word: 'health', count: 22, size: 'text-lg' },
    { word: 'peace', count: 18, size: 'text-lg' }
  ];

  const stats = [
    { icon: Flame, label: 'Current Streak', value: '7 days', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: BookOpen, label: 'Total Entries', value: '124', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Target, label: 'Weekly Goal', value: '5/7', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Hey {user?.fullName || "there"}, how are you feeling today? 👋
                </h1>
                <p className="text-emerald-100">Your mental wellness dashboard</p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Write Journal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat with AI
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Mood Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 col-span-1 md:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">This Week's Mood</h3>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                😊
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">Calm & Positive</p>
            <p className="text-sm text-gray-600">You've been feeling great this week! Keep it up! 🌟</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">↑ 23% better than last week</span>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}

          {/* Last Journal Entry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Last Entry</p>
                <p className="text-xs text-gray-500">October 18, 2025</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">2 hours ago</p>
          </motion.div>
        </div>

        {/* Mood Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Mood Trends</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600">Calm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Joy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Stress</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyMoodData}>
                <defs>
                  <linearGradient id="calmGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="joyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip />
                <Area type="monotone" dataKey="calm" stroke="#10b981" fillOpacity={1} fill="url(#calmGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="joy" stroke="#3b82f6" fillOpacity={1} fill="url(#joyGradient)" strokeWidth={2} />
                <Line type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Emotion Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Emotion Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={emotionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emotionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {emotionDistribution.map((emotion, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: emotion.color }}></div>
                    <span className="text-gray-700">{emotion.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{emotion.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Journal Insights & AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Keyword Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">What You Write About</h3>
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center py-6">
              {frequentKeywords.map((keyword, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`${keyword.size} font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors`}
                  style={{ opacity: 0.5 + (keyword.count / 50) }}
                >
                  {keyword.word}
                </motion.span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span><span className="font-semibold text-gray-900">Sentiment:</span> You've been more positive this week! 🌟</span>
              </p>
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            
            <div className="space-y-4">
              {/* Daily Affirmation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                <p className="text-sm text-purple-600 font-medium mb-2">💜 Daily Affirmation</p>
                <p className="text-gray-800 italic">"You're doing your best — and that's enough. Progress, not perfection."</p>
              </div>

              {/* AI Tip */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                <p className="text-sm text-purple-600 font-medium mb-2">🤖 AI Recommendation</p>
                <p className="text-gray-800">Consider journaling about gratitude tomorrow. Your entries show increased positivity when you focus on thankfulness.</p>
              </div>

              {/* Reflection Quote */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                <p className="text-sm text-purple-600 font-medium mb-2">💭 Reflection</p>
                <p className="text-gray-800">You mentioned "work" frequently this week. Remember to balance productivity with self-care.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Insights
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Recent Journal Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Entries</h3>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              See All Journals
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {recentEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
              >
                <div className="text-3xl">{entry.mood}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{entry.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      entry.tag === 'Calm' ? 'bg-emerald-100 text-emerald-700' :
                      entry.tag === 'Happy' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {entry.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{entry.preview}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{entry.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
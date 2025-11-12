import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, Plus, Save, X, Tag, Brain, TrendingUp, Sparkles, Clock, Filter, ChevronLeft, ChevronRight, Check, Smile, Meh, Frown, Heart, Zap } from 'lucide-react';
import JournalAPI from '../../api/journalAPI.js';
import { useAuth } from '../../pages/Auth'; 
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';


const JournalIndex = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [journalContent, setJournalContent] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();


  const [entries, setEntries] = useState([]);

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200' },
    { emoji: '😌', label: 'Calm', color: 'bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-200' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200' },
    { emoji: '😤', label: 'Anxious', color: 'bg-orange-100 border-orange-300 text-orange-700 hover:bg-orange-200' },
    { emoji: '😡', label: 'Angry', color: 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200' }
  ];

  const mockEntries = [
    { id: 1, date: 'Oct 18, 2025', mood: '😊', title: 'Morning Reflections', preview: 'Today started with a peaceful walk...', tags: ['gratitude', 'morning'] },
    { id: 2, date: 'Oct 17, 2025', mood: '😐', title: 'Work Thoughts', preview: 'The project deadline is approaching...', tags: ['work', 'stress'] },
    { id: 3, date: 'Oct 16, 2025', mood: '😌', title: 'Evening Gratitude', preview: 'Spent quality time with family...', tags: ['family', 'love'] },
    { id: 4, date: 'Oct 15, 2025', mood: '😔', title: 'Tough Day', preview: 'Feeling a bit overwhelmed today...', tags: ['health', 'stress'] }
  ];

  const aiInsights = {
    emotion: 'Reflective and Calm',
    emotionColor: 'from-emerald-500 to-teal-500',
    summary: 'You mentioned feeling grateful and hopeful. Your writing shows a positive shift in perspective.',
    trend: 'Your stress levels are 25% lower than last week. Keep up the mindful journaling! 🌟'
  };


  // Auto-save simulation
  useEffect(() => {
    if (journalContent.length > 0) {
      const timer = setTimeout(() => {
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 2000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [journalContent]);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    console.log("Save button clicked"); // 👈 add this first
      if (!journalContent.trim() || !selectedMood) {
        toast.error("Please write something and select your mood!");
        return;
      }

    const entryData = {
      title: '', // optional auto-title logic
      content: journalContent,
      moodEmoji: selectedMood.emoji,
      moodLabel: selectedMood.label,
      entryDate: currentDate.toISOString().split('T')[0], // YYYY-MM-DD
    };

    try {
      const userId = user.id; 
      const response = await fetch(`http://localhost:8080/api/journals?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData)
      });
      
      if (!response.ok) throw new Error('Failed to save entry');

      const savedEntry = await response.json();
      setEntries([savedEntry, ...entries]); // prepend new entry
      setJournalContent('');
      setSelectedMood(null);
      setTags([]);
      setIsEditing(false);

      console.log("Journal saved:", savedEntry);
      toast.success("🎉 Your journal entry has been saved!", {
        duration: 5000, // show for 5 seconds
        style: {
          background: '#10b981', // emerald-500
          color: '#fff',
          fontWeight: 'bold',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981',
        },
      });
      setTimeout(() => navigate('/journal/history'), 1000);
    } catch (err) {
      console.error("Failed to save entry:", err);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-teal-50/20">
      <div className="max-w-7xl mx-auto px-6 py-6 pb-40">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPreviousDay}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{formatDate(currentDate)}</h1>
                  <p className="text-sm text-gray-500">Your safe space to reflect</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNextDay}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your thoughts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-64 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Entry
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Editor Area */}
          <div className={`${showHistory ? 'lg:col-span-8' : 'lg:col-span-8'} space-y-6`}>
            {/* Editor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Mood Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">How are you feeling?</label>
                  <div className="flex flex-wrap gap-3">
                    {moods.map((mood, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMood(mood)}
                        className={`px-4 py-2.5 rounded-xl border-2 font-medium transition-all flex items-center gap-2 ${
                          selectedMood?.label === mood.label
                            ? mood.color + ' ring-4 ring-offset-2'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl">{mood.emoji}</span>
                        <span className="text-sm">{mood.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Text Editor */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Write your thoughts</label>
                  <textarea
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                    placeholder="How are you feeling today? Let your thoughts flow freely..."
                    className="w-full h-64 p-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">{journalContent.length} characters</p>
                    <AnimatePresence>
                      {autoSaved && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-1 text-xs text-emerald-600 font-medium"
                        >
                          <Check className="w-3 h-3" />
                          Auto-saved
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Tags Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Tags (optional)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Add tags like 'work', 'family', 'gratitude' (press Enter)"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Entry
                </motion.button>
              </div>
            </motion.div>

            {/* Empty State */}
            {/* {!journalContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-dashed border-emerald-300 p-12 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No entry yet today</h3>
                <p className="text-gray-600">Start your first journal entry and let your thoughts flow freely 💭</p>
              </motion.div>
            )} */}
          </div>

          {/* AI Insights Panel */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-4"
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
      </div>
    </div>
  );
};

export default JournalIndex;
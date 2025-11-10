import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Filter, Grid, List, Eye, Edit2, Trash2, X, TrendingUp, Flame, BookOpen, Download, ChevronDown, BarChart3, Plus, CloudDownload } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import JournalAPI from '../../api/journalAPI.js';
import { useAuth } from '../../pages/Auth';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const JournalHistory = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navigate = useNavigate();

  const moods = [
    { value: 'all', label: 'All Moods', emoji: '🌈' },
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'sad', label: 'Sad', emoji: '😔' },
    { value: 'anxious', label: 'Anxious', emoji: '😤' },
    { value: 'angry', label: 'Angry', emoji: '😡' }
  ];

  const moodColors = {
    Happy: "bg-yellow-100 border-yellow-300 text-yellow-700",
    Calm: "bg-emerald-100 border-emerald-300 text-emerald-700",
    Neutral: "bg-gray-100 border-gray-300 text-gray-700",
    Sad: "bg-blue-100 border-blue-300 text-blue-700",
    Anxious: "bg-orange-100 border-orange-300 text-orange-700",
    Angry: "bg-red-100 border-red-300 text-red-700",
    default: "bg-gray-100 border-gray-300 text-gray-700",
  };

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

  const stats = {
    totalEntries: 47,
    mostFrequentMood: { emoji: '😌', label: 'Calm' },
    longestStreak: 12,
    topWords: ['grateful', 'peace', 'work', 'family', 'hope', 'stress', 'happy']
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood =
      selectedMood === "all" || entry.moodLabel.toLowerCase() === selectedMood;
    const matchesTag =
      selectedTag === "all" ||
      (entry.tags && entry.tags.includes(selectedTag));
    return matchesSearch && matchesMood && matchesTag;
  });

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/journals?userId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch journals");

        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error("Error fetching journals:", err);
        toast.error("Failed to load your journal entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user]);

  const handleEdit = async (entryToEdit) => {
    const updatedContent = prompt("Edit your journal entry:", entryToEdit.content);
    if (updatedContent === null) return; // user cancelled

    try {
      const updatedEntry = await JournalAPI.update(user.id, entryToEdit.id, {
        ...entryToEdit,
        content: updatedContent,
      });
      // Update UI
      setEntries(entries.map(e => e.id === entryToEdit.id ? updatedEntry : e));
      toast.success("Journal entry updated!");
      setSelectedEntry(null); // close modal
    } catch (err) {
      console.error("Failed to update entry:", err);
      toast.error("Failed to update entry!");
    }
  };

  const handleDelete = async (entryToDelete) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await JournalAPI.delete(user.id, entryToDelete.id);
      setEntries(entries.filter(e => e.id !== entryToDelete.id));
      toast.success("Entry deleted successfully!");
      setSelectedEntry(null);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete entry.");
    }
  };


  // Entry Detail Modal Component
  const EntryDetailModal = ({ entry, onClose }) => {
    if (!entry) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" // Shadcn Dialog Backdrop
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-w-4xl mx-auto" // Shadcn Dialog/Sheet
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  {entry.moodEmoji}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{entry.title}</h2>
                  <p className="text-emerald-100 text-lg">{entry.entryDate}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {entry?.tags?.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-8">
              {/* Journal Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Journal Entry
                </h3>
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                  <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{entry.content}</p>
                  <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-300">{entry.wordCount} words</p>
                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{entry.aiSummary || "No AI insights available yet."}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEdit(entry)}
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:border-emerald-600 transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Entry
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(entry)}
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Entry
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export
                </motion.button>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-teal-50/20">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* 1. Page Header / Navigation Bar */}
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
              {/* View Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid'
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
                className={`p-3 rounded-xl transition-all ${viewMode === 'list'
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

              {/* Optional: Date Range Picker Placeholder */}
              <div className="relative">
                <button
                  className="appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white cursor-pointer min-w-[140px] font-medium text-gray-700 flex items-center justify-between"
                  title="Date Range Picker (Future Feature)"
                >
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  Date Range
                </button>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-emerald-600" />
                Your Journey
              </h3>
              <span className="text-sm text-gray-500 italic">
                Keep tracking your growth 🌱
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Total Entries */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-md shadow-emerald-500/30">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Total Entries</p>
                    <p className="text-4xl font-extrabold text-gray-900">{stats.totalEntries}</p>
                  </div>
                </div>
              </motion.div>

              {/* Longest Streak */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-md shadow-orange-500/30">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Longest Streak</p>
                    <p className="text-4xl font-extrabold text-gray-900">
                      {stats.longestStreak}
                      <span className="text-lg font-semibold text-gray-600 ml-1">days</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Most Frequent Mood */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all flex flex-col items-start"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/30">
                    <span className="text-3xl">{stats.mostFrequentMood.emoji}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Most Frequent Mood</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.mostFrequentMood.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>


        {/* 2. Main Layout: Insights and Journal List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-10 mb-20">
          {/* 2. Journal List View (Core Section) */}
          <div className="lg:col-span-12">
            {loading ?
              (
                <p className="text-center text-gray-500">Loading your journal entries...</p>
              ) : filteredEntries.length === 0 ? (
                /* 6. Empty State */
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
                    No journal entries yet. Start writing your first thoughts today 💭 or try adjusting your filters.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // This should ideally navigate to the journaling page
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                  >
                    Go to Journal
                  </motion.button>
                </motion.div>
              ) : (
                /* Grid/List View */
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-6'}>
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
      {/* Mood Circle with dynamic colors */}
      <div
        className={`w-14 h-14 flex items-center justify-center text-2xl shadow-sm rounded-2xl border-2 ${
          moodColors[entry.moodLabel] || moodColors.default
        }`}
      >
        {entry.moodEmoji}
      </div>

      <div>
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">
          {entry.title || "Untitled Entry"}
        </h3>
        <p className="text-sm text-gray-500">{entry.entryDate}</p>
      </div>
    </div>

    <Eye className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:scale-110 transition-all" />
  </div>

  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
    {entry.content.slice(0, 120)}...
  </p>

  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
    <span className="font-medium">{entry.wordCount} words</span>
    <span
      className={`px-3 py-1 rounded-full font-semibold border ${
        moodColors[entry.moodLabel] || moodColors.default
      }`}
    >
      {entry.moodLabel}
    </span>
  </div>
</motion.div>

                  ))}
                </div>
              )}
          </div>
        </div>
      </div>

      {/* 3. Journal Details Modal / Drawer */}
      <EntryDetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />

    </div>
  )
};

export default JournalHistory;
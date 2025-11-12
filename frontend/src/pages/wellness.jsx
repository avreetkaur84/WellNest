import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Pause, Clock, Bookmark, Star, Shuffle, ChevronRight, MessageCircle, ThumbsUp, Send, Filter, Search, AlertCircle, X } from 'lucide-react';

const Wellness = () => {
  const [activeTab, setActiveTab] = useState('meditations');
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [ventContent, setVentContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showComments, setShowComments] = useState(null);

  const tabs = [
    { id: 'meditations', label: 'Meditations', emoji: '🧘' },
    { id: 'affirmations', label: 'Affirmations', emoji: '💬' },
    { id: 'venting', label: 'Venting Board', emoji: '🫂' }
  ];

  const meditations = [
    { id: 1, title: 'Morning Calm', description: 'Start your day with grounding breaths', duration: '10 min', category: 'Mindfulness', difficulty: 'Beginner', gradient: 'from-emerald-400 to-teal-500', favorited: false },
    { id: 2, title: 'Deep Sleep', description: 'Gentle guidance into restful sleep', duration: '15 min', category: 'Sleep', difficulty: 'Beginner', gradient: 'from-blue-400 to-purple-500', favorited: true },
    { id: 3, title: 'Stress Release', description: 'Let go of tension and worry', duration: '12 min', category: 'Stress', difficulty: 'Intermediate', gradient: 'from-orange-400 to-red-500', favorited: false },
    { id: 4, title: 'Focus Flow', description: 'Enhance concentration and clarity', duration: '8 min', category: 'Focus', difficulty: 'Intermediate', gradient: 'from-cyan-400 to-blue-500', favorited: false },
    { id: 5, title: 'Healing Hearts', description: 'Emotional healing and self-compassion', duration: '20 min', category: 'Healing', difficulty: 'Advanced', gradient: 'from-pink-400 to-rose-500', favorited: true },
    { id: 6, title: 'Body Scan', description: 'Progressive relaxation technique', duration: '15 min', category: 'Mindfulness', difficulty: 'Intermediate', gradient: 'from-green-400 to-emerald-500', favorited: false }
  ];

  const affirmations = [
    "I am enough, just as I am.",
    "My feelings are valid and I honor them.",
    "I choose peace and release what I cannot control.",
    "I am worthy of love and belonging.",
    "Today, I focus on progress, not perfection.",
    "I trust my journey and embrace growth.",
    "I am resilient and capable of overcoming challenges.",
    "My mental health is a priority, not a luxury."
  ];

  const ventingPosts = [
    { id: 1, content: "Feeling overwhelmed with work deadlines. Just needed to say it out loud.", tags: ['stress', 'work'], timestamp: '2 hours ago', likes: 12, comments: 3 },
    { id: 2, content: "Today was tough. Missing someone I lost. But I'm grateful for the memories.", tags: ['grief', 'gratitude'], timestamp: '5 hours ago', likes: 28, comments: 7 },
    { id: 3, content: "Anxiety is high today but I'm trying to breathe through it.", tags: ['anxiety'], timestamp: '1 day ago', likes: 15, comments: 5 }
  ];

  const ventTags = ['stress', 'anxiety', 'relationships', 'loneliness', 'work', 'grief', 'gratitude', 'health'];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const shuffleAffirmation = () => {
    setCurrentAffirmation(Math.floor(Math.random() * affirmations.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 py-16">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">Your Wellness Space</h1>
          <p className="text-xl text-gray-600 italic">Breathe. Reflect. Reconnect.</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 inline-flex gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {/* Meditations Section */}
          {activeTab === 'meditations' && (
            <motion.div
              key="meditations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <p className="text-lg text-gray-700 italic">"Take a moment to pause."</p>
              </div>

              {/* Meditation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meditations.map((meditation, index) => (
                  <motion.div
                    key={meditation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedMeditation(meditation)}
                    className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer group"
                  >
                    <div className={`h-40 bg-gradient-to-br ${meditation.gradient} relative overflow-hidden`}>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-white/10"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </motion.div>
                      </div>
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/50 transition-all">
                        <Bookmark className={`w-5 h-5 ${meditation.favorited ? 'fill-white text-white' : 'text-white'}`} />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{meditation.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{meditation.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{meditation.duration}</span>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                          {meditation.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Affirmations Section */}
          {activeTab === 'affirmations' && (
            <motion.div
              key="affirmations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                key={currentAffirmation}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl shadow-2xl p-12 md:p-16 text-center relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-white/5"
                  style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                />
                
                <div className="relative z-10">
                  <Star className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-relaxed">
                    {affirmations[currentAffirmation]}
                  </h2>
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shuffleAffirmation}
                      className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                    >
                      <Shuffle className="w-5 h-5" />
                      Next Affirmation
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all flex items-center gap-2"
                    >
                      <Heart className="w-5 h-5" />
                      Save
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Daily Affirmation */}
              <div className="mt-8 bg-white rounded-3xl shadow-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Practice</h3>
                <p className="text-gray-600">Repeat this affirmation to yourself throughout the day. Let it sink into your heart and mind.</p>
              </div>
            </motion.div>
          )}

          {/* Venting Board Section */}
          {activeTab === 'venting' && (
            <motion.div
              key="venting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Intro Banner */}
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-300 rounded-3xl p-6 mb-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Let it out. You are not alone.</h3>
                <p className="text-gray-700">Share your thoughts anonymously in a safe, judgment-free space. Be kind to yourself and others.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Post Composer */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What's on your mind?</h3>
                    <textarea
                      value={ventContent}
                      onChange={(e) => setVentContent(e.target.value)}
                      placeholder="Share your thoughts... (Max 500 characters)"
                      maxLength={500}
                      className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">{ventContent.length}/500</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Post Anonymously
                      </motion.button>
                    </div>

                    {/* Tag Selector */}
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Add tags (optional)</p>
                      <div className="flex flex-wrap gap-2">
                        {ventTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedTags.includes(tag)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Posts Feed */}
                  <div className="space-y-4">
                    {ventingPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-white text-lg">👤</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-900">Anonymous</span>
                              <span className="text-sm text-gray-500">• {post.timestamp}</span>
                            </div>
                            <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span className="text-sm font-medium">{post.likes} Reassure</span>
                              </button>
                              <button 
                                onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
                              >
                                <MessageCircle className="w-5 h-5" />
                                <span className="text-sm font-medium">{post.comments} Comments</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Guidelines */}
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-6 h-6 text-emerald-600" />
                      <h3 className="font-bold text-gray-900">Community Guidelines</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Be kind and respectful</li>
                      <li>• No hate speech or bullying</li>
                      <li>• Keep posts anonymous</li>
                      <li>• Offer support, not judgment</li>
                      <li>• Report harmful content</li>
                    </ul>
                  </div>

                  {/* Filter */}
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Filter className="w-5 h-5 text-emerald-600" />
                      Filter Posts
                    </h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        Most Recent
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        Most Reassured
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        With Comments
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Meditation Player Modal */}
      <AnimatePresence>
        {selectedMeditation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMeditation(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className={`bg-gradient-to-br ${selectedMeditation.gradient} rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-white relative overflow-hidden`}>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-0 bg-white/10 rounded-full blur-3xl"
                />
                
                <div className="relative z-10">
                  <button
                    onClick={() => setSelectedMeditation(null)}
                    className="absolute top-0 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <h2 className="text-4xl font-bold mb-4">{selectedMeditation.title}</h2>
                  <p className="text-white/90 text-lg mb-8">{selectedMeditation.description}</p>

                  {/* Player Controls */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-6 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl"
                      >
                        {isPlaying ? (
                          <Pause className="w-10 h-10 text-gray-900" />
                        ) : (
                          <Play className="w-10 h-10 text-gray-900 ml-1" />
                        )}
                      </motion.button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isPlaying ? '100%' : '0%' }}
                          transition={{ duration: parseInt(selectedMeditation.duration) * 60, ease: "linear" }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>0:00</span>
                      <span>{selectedMeditation.duration}</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-4 bg-white/20 backdrop-blur-sm rounded-2xl font-semibold hover:bg-white/30 transition-all">
                    Mark as Completed
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wellness;
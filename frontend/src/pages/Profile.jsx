import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, Shield, Settings, LogOut, Trash2, Camera, Edit2, Check, X, Lock, Bell, Globe, Moon, Sun, Monitor, HelpCircle, MessageCircle, Download, Activity, Flame, BookOpen, ChevronRight } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [storageMode, setStorageMode] = useState('cloud');
  const [themeMode, setThemeMode] = useState('system');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Avreet Singh',
    email: 'avreet@wellnest.com',
    avatar: null,
    tagline: 'Mindful since March 2025',
    memberSince: 'March 15, 2025'
  });

  const stats = [
    { icon: BookOpen, label: 'Journal Entries', value: '124', color: 'from-emerald-500 to-teal-500' },
    { icon: Flame, label: 'Current Streak', value: '12 days', color: 'from-orange-500 to-red-500' },
    { icon: Activity, label: 'Active Days', value: '89', color: 'from-blue-500 to-purple-500' },
    { icon: MessageCircle, label: 'AI Chats', value: '47', color: 'from-pink-500 to-purple-500' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-teal-50/20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </motion.div>

        {/* Identity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-6"
        >
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-4 border-white">
                    {profileData.avatar ? (
                      <img src={profileData.avatar} alt="Profile" className="w-full h-full rounded-3xl object-cover" />
                    ) : (
                      profileData.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-gray-200">
                    <Camera className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Name & Info */}
                <div className="pb-2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                  <p className="text-gray-600 mb-2">{profileData.email}</p>
                  <p className="text-sm text-emerald-600 font-medium">{profileData.tagline}</p>
                </div>
              </div>

              {/* Edit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 md:mt-0 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-200"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-emerald-600" />
                Account Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profileData.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Verified</span>
                </div>

                <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">{profileData.memberSince}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-3">
                  <Activity className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="font-medium text-gray-900">Today at 10:30 AM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-emerald-600" />
                Preferences
              </h3>

              <div className="space-y-6">
                {/* Storage Mode */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Storage Preference</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStorageMode('cloud')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        storageMode === 'cloud'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Cloud Sync</span>
                        {storageMode === 'cloud' && <Check className="w-5 h-5 text-emerald-600" />}
                      </div>
                      <p className="text-xs text-gray-600 text-left">Access from anywhere</p>
                    </button>
                    <button
                      onClick={() => setStorageMode('local')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        storageMode === 'local'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Local Only</span>
                        {storageMode === 'local' && <Check className="w-5 h-5 text-emerald-600" />}
                      </div>
                      <p className="text-xs text-gray-600 text-left">Maximum privacy</p>
                    </button>
                  </div>
                </div>

                {/* Theme Mode */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setThemeMode(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          themeMode === option.value
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <option.icon className={`w-6 h-6 mx-auto mb-2 ${themeMode === option.value ? 'text-emerald-600' : 'text-gray-400'}`} />
                        <p className="text-sm font-medium text-gray-900">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Notifications</label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive updates and reminders</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        emailNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-emerald-600" />
                Security
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Change Password</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Logout All Sessions</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors border border-red-200"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-600">Delete Account</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Activity Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-xl p-8 text-white"
            >
              <h3 className="text-xl font-bold mb-6">Activity Summary</h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-emerald-100 text-sm mb-1">Last Journal Entry</p>
                  <p className="font-semibold text-lg">2 hours ago</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-emerald-100 text-sm mb-1">Wellness Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-4/5"></div>
                    </div>
                    <span className="font-semibold">8.5/10</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-emerald-100 text-sm mb-1">This Month</p>
                  <p className="font-semibold text-lg">23 entries written</p>
                </div>
              </div>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                Support
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Help Center</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Export Data</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Delete Account?</h3>
                <p className="text-gray-600 text-center mb-6">
                  This action cannot be undone. All your journal entries, data, and progress will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    Delete Forever
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

export default Profile;
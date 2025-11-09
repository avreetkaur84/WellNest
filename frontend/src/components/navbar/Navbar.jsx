import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, MessageCircle, TrendingUp, Sparkles, Settings, LogOut, Menu, X, Home } from 'lucide-react';

const Navbar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', color: 'text-emerald-600' },
    { icon: BookOpen, label: 'Journal', path: '/journal/index', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'History', path: '/journal/history', color: 'text-purple-600' },
    { icon: MessageCircle, label: 'Companion', path: '/companion', color: 'text-teal-600' },
    { icon: Sparkles, label: 'Wellness', path: '/wellness', color: 'text-pink-600' },
  ];

  const bottomNavItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: LogOut, label: 'Logout', path: '/login' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">WellNest</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? '280px' : '80px',
          x: isMobileMenuOpen ? 0 : '-100%'
        }}
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? 'lg:translate-x-0' : ''
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              {isSidebarOpen && (
                <span className="text-xl font-semibold text-gray-900">WellNest</span>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all group"
              >
                <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                {isSidebarOpen && (
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Bottom Nav */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            {bottomNavItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all group"
              >
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900 group-hover:scale-110 transition-transform" />
                {isSidebarOpen && (
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>
                )}
              </a>
            ))}
            
            {/* Toggle Button (Desktop only) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex items-center justify-center w-full py-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 lg:pt-0 ${
          isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[80px]'
        }`}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Navbar;
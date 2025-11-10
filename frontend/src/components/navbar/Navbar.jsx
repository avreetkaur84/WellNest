import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, MessageCircle, TrendingUp, Sparkles, Settings, LogOut, Menu, X, Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// MOCK IMPORT PATH: Update this path to match where your AuthContext is located
import { useAuth } from '../../pages/Auth'; 

const Navbar = ({ children }) => {
  // --- Auth Consumption ---
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  // --- State ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Handlers ---
  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false); // Close sidebar on logout
    navigate('/');
  };

  // --- Navigation Data (Conditional Profile Link) ---
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', color: 'text-emerald-600' },
    // Profile link is only added if the user is authenticated
    ...(isAuthenticated ? [{ icon: User, label: 'Profile', path: '/profile', color: 'text-blue-500' }] : []),
    { icon: BookOpen, label: 'Journal', path: '/journal/index', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'History', path: '/journal/history', color: 'text-purple-600' },
    { icon: MessageCircle, label: 'Companion', path: '/companion', color: 'text-teal-600' },
    { icon: Sparkles, label: 'Wellness', path: '/wellness', color: 'text-pink-600' },
  ];

  const bottomNavItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      
      {/* UNIFIED Header (visible on all screen sizes) */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Menu button to open the sidebar */}
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-800" />
            </button>
            <div className="flex items-center gap-2"
                  onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">WellNest</span>
            </div>
          </div>

          {/* Login/Signup/Profile Buttons - CONDITIONAL RENDERING */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Display user name/initials */}
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">Hi, {user?.fullName.split(' ')[0]}</span>
                <a 
                    href="/profile" 
                    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold hover:ring-2 ring-blue-300 transition-all shrink-0"
                    title="View Profile"
                >
                    {user?.fullName.charAt(0)}
                </a>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="px-3 py-1.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
                  Login
                </a>
                <a href="/signup" className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
                  Signup
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        className={`fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-200 z-50 transition-transform duration-300 shadow-xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Close Button */}
          <div className="p-6 border-b border-gray-200 h-16">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">WellNest</span>
              </div>
              
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all group"
                onClick={() => setIsSidebarOpen(false)} // Close on item click
              >
                <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform shrink-0`} />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
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
                onClick={() => setIsSidebarOpen(false)} // Close on item click
              >
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
              </a>
            ))}
            {/* Conditional Logout link in bottom nav for mobile convenience */}
             {isAuthenticated && (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors group"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className=""> 
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Navbar;
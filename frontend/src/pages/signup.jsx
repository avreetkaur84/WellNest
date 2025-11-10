import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, User, Shield, Brain, Sparkles, Check } from 'lucide-react';
import API from "../api/api.js";
import { useAuth, AuthProvider, AuthContext } from '../pages/Auth.jsx'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', text: '' }); 
  const [loading, setLoading] = useState(false); 
  const { login} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    syncMode: 'cloud' // 'cloud' or 'local'
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setFeedbackMessage({ type: '', text: '' }); 
    if (formData.password !== formData.confirmPassword) {
        setFeedbackMessage({ type: 'error', text: "Passwords do not match." });
        return;
    }
    if (!formData.agreeToTerms) {
        setFeedbackMessage({ type: 'error', text: "You must agree to the Terms of Service and Privacy Policy." });
        return;
    }

    setLoading(true);
    console.log('Signup:', formData);
    // Map formData to the backend expected format
    const payload = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      storagePreference: formData.syncMode === 'cloud' ? 'CLOUD_SYNC' : 'LOCAL' // match backend enum
    };

    try {
      const response = await API.post("/auth/signup", payload);
      console.log("Signup successful:", response.data);
      // alert(`Signup successful! Welcome ${response.data.fullName}`);
      // 1. Call the login function from AuthContext to establish the user session
      login(response.data); 

      // Display success message before simulating navigation
      setFeedbackMessage({ 
          type: 'success', 
          text: `Account created successfully! Welcome, ${response.data.fullName}. Redirecting...`
      });
      
      // 2. Redirect the user to a protected page (simulated)
      setTimeout(() => navigate('/dashboard'), 1000); 
      // You can redirect to login page here
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      // Extract the error message from the simulated API response structure
      const errorMessage = error.response?.data?.message || "An unexpected error occurred during signup.";
      setFeedbackMessage({ 
          type: 'error', 
          text: errorMessage 
      });
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 14) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl relative z-10"
      >
        {/* Combined Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-2">
            
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-12 lg:p-16 text-white relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">WellNest</span>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                      Start your wellness journey today
                    </h1>
                    <p className="text-lg text-emerald-50 leading-relaxed">
                      Join thousands finding peace, clarity, and emotional growth with AI-powered support.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {[
                      { icon: Shield, text: 'Military-grade encryption' },
                      { icon: Brain, text: 'Smart emotion analysis' },
                      { icon: Sparkles, text: 'Personalized insights daily' },
                      { icon: Heart, text: 'Empathetic AI companion' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-emerald-50">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Quote */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-emerald-100 italic text-sm">
                    "Free forever. Your data, your control."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="p-8 lg:p-10 bg-white">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Create account</h2>
                  <p className="text-gray-600 text-sm">Get started with your free account</p>
                </div>

                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        className="w-full pl-10 pr-11 py-2.5 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${strength.strength}%` }}
                              className={`h-full ${strength.color} transition-all duration-300`}
                            />
                          </div>
                          <span className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>
                            {strength.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-11 py-2.5 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>

                  {/* Storage Mode Toggle */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Storage Preference</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, syncMode: 'cloud' }))}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          formData.syncMode === 'cloud'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Cloud Sync
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, syncMode: 'local' }))}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          formData.syncMode === 'local'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Local Only
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5 border-2 border-gray-300 rounded text-emerald-600 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                    />
                    <span className="text-xs text-gray-600 group-hover:text-gray-900">
                      I agree to the{' '}
                      <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Privacy Policy</a>
                    </span>
                  </label>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={!formData.agreeToTerms}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-white text-gray-500">Or sign up with</span>
                    </div>
                  </div>

                  {/* Social Signup Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Google</span>
                    </button>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Facebook</span>
                    </button>
                  </div>

                  {/* Login Link */}
                  <p className="text-center text-sm text-gray-600 pt-1">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, MessageCircle, TrendingUp, Shield, Lock, Heart, Sparkles, ChevronRight, Menu, X, Check, Star } from 'lucide-react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeatureSection';

const WellNestLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Smart Journaling",
      description: "Write freely in a beautiful, distraction-free editor with mood tracking and rich formatting options.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: Brain,
      title: "AI Emotion Insights",
      description: "Advanced sentiment analysis detects patterns in your entries and provides actionable emotional intelligence.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Empathetic AI Companion",
      description: "Chat with an AI that remembers your journey, understands context, and responds with genuine empathy.",
      color: "bg-teal-50 text-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Wellness Dashboard",
      description: "Visualize your emotional journey with beautiful charts, streaks, and personalized recommendations.",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Mental Health Advocate",
      text: "WellNest helped me understand my emotional patterns in ways traditional journaling never could.",
      rating: 5
    },
    {
      name: "James K.",
      role: "Product Designer",
      text: "The AI companion feels genuinely empathetic. It's like having a supportive friend available 24/7.",
      rating: 5
    },
    {
      name: "Emily R.",
      role: "Therapist",
      text: "I recommend WellNest to my clients. It's a powerful tool for self-reflection and emotional growth.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 ">
      {/* Navigation */}
      {/* <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">WellNest</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">How it Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Testimonials</a>
            <a href="/login" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Sign In</a>
            <a href="/signup" className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
              Get Started Free
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-10">
        <HeroSection />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need for emotional wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to support your mental health journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* <FeaturesSection /> */}

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, powerful, private
            </h2>
            <p className="text-xl text-gray-600">Your wellness journey in three easy steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "Journal Your Day", desc: "Write freely about your thoughts, feelings, and experiences in our secure platform" },
              { step: "2", title: "AI Analyzes Emotions", desc: "Our advanced AI detects emotional patterns and provides meaningful insights" },
              { step: "3", title: "Receive Support", desc: "Chat with your AI companion and track your progress with visual dashboards" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-emerald-600/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by thousands
            </h2>
            <p className="text-xl text-gray-600">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start your wellness journey today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who are finding peace, clarity, and emotional growth with WellNest
          </p>
          <button className="px-10 py-4 bg-white text-emerald-600 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl">
            Get Started Free
          </button>
          <p className="text-sm mt-4 opacity-75">No credit card required • Free forever</p>
        </div>
      </section>
    </div>
  );
};

export default WellNestLanding;
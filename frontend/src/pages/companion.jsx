import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Plus, Trash2, Moon, Sun, RefreshCw, Brain, Mic, Paperclip, Smile, MoreVertical } from 'lucide-react';

const Companion = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const chatHistory = [
    { id: 1, title: 'Morning Check-in', lastMessage: "I'm feeling better today...", timestamp: '2 hours ago', mood: '🌤' },
    { id: 2, title: 'Work Stress', lastMessage: "The deadline is overwhelming...", timestamp: 'Yesterday', mood: '🌧' },
    { id: 3, title: 'Evening Reflection', lastMessage: "Thank you for listening...", timestamp: '2 days ago', mood: '✨' }
  ];

  const suggestedPrompts = [
    { icon: '😔', text: "I'm feeling low", prompt: "I'm feeling low today and could use some support." },
    { icon: '💪', text: "I need motivation", prompt: "I need some motivation to get through my day." },
    { icon: '🧘', text: "Help me calm down", prompt: "I'm feeling anxious and need help calming down." },
    { icon: '🌅', text: "Reflect on my day", prompt: "Can you help me reflect on my day?" },
    { icon: '💫', text: "Give me a positive thought", prompt: "I need a positive thought or affirmation." }
  ];

  const quotes = [
    "Healing doesn't mean the damage never existed. It means it no longer controls you.",
    "You are allowed to be both a masterpiece and a work in progress.",
    "Your mental health is a priority, not a luxury.",
    "Progress, not perfection."
  ];

  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: generateResponse(messageText),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateResponse = (userMessage) => {
    const responses = {
      'low': "I hear you, and I want you to know that what you're feeling is valid. It's okay to have difficult days. Would you like to talk about what's weighing on you, or would you prefer some grounding exercises?",
      'motivation': "I believe in you! Remember, you don't have to do everything perfectly. Just taking small steps forward is progress. What's one small thing you can do today that will make you feel accomplished?",
      'calm': "Let's take this moment together. Close your eyes if you can, and take a deep breath with me. Breathe in for 4 counts... hold for 4... and out for 6. You're safe. You're okay. Let's do that again.",
      'reflect': "Reflection is powerful. Let's think about today - what's one thing that brought you even a small moment of peace or joy? And what's one thing that challenged you?",
      'positive': "Here's something to hold onto: You are worthy of love, peace, and happiness. Your journey matters, and you're doing better than you think. Every day you show up is a victory.",
      'default': "I'm here to listen. Your feelings matter, and this is a safe space. Would you like to tell me more about what's on your mind?"
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) return response;
    }
    return responses.default;
  };

  const handlePromptClick = (prompt) => {
    handleSendMessage(prompt);
  };

  const startNewChat = () => {
    setMessages([]);
    setActiveChat(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Left Sidebar */}
        <div className={`w-90 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col transition-colors`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your AI Companion</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Always here to listen 🤖</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center transition-colors`}
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
                <button className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center transition-colors`}>
                  <Trash2 className={`w-5 h-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startNewChat}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              New Chat
            </motion.button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Recent Conversations</h3>
            {chatHistory.map((chat) => (
              <motion.button
                key={chat.id}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  activeChat === chat.id
                    ? 'bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-300'
                    : darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{chat.title}</span>
                  <span className="text-2xl">{chat.mood}</span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate mb-1`}>{chat.lastMessage}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{chat.timestamp}</p>
              </motion.button>
            ))}
          </div>

          {/* Suggested Prompts */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>Need help starting?</h3>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePromptClick(prompt.prompt)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors flex items-center gap-2`}
                >
                  <span className="text-lg">{prompt.icon}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{prompt.text}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Inspirational Footer */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50'}`}>
            <p className={`text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center leading-relaxed`}>
              "{currentQuote}"
            </p>
          </div>
        </div>

        {/* Right Column - Chat Interface */}
        <div className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
          {/* Chat Header */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-emerald-50 to-teal-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {activeChat ? `Chat ${activeChat}` : 'New Conversation'}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Online • Ready to help</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-colors border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <RefreshCw className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <button className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} flex items-center justify-center transition-colors border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <Brain className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="w-16 h-16 text-emerald-600" />
                </div>
                <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  Hey there, I'm WellNest 👋
                </h3>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mb-8`}>
                  What's on your mind today? I'm here to listen, support, and help you through whatever you're feeling.
                </p>
                <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
                  {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePromptClick(prompt.prompt)}
                      className={`px-5 py-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm`}
                    >
                      <span className="text-xl">{prompt.icon}</span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{prompt.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Messages */
              <>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-2xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                            : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                        }`}>
                          {message.role === 'user' ? (
                            <span className="text-white font-bold">You</span>
                          ) : (
                            <MessageCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className={`rounded-2xl px-5 py-4 ${
                            message.role === 'user'
                              ? darkMode
                                ? 'bg-blue-900/50 text-white'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : darkMode
                              ? 'bg-gray-800 text-gray-100 border border-gray-700'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="leading-relaxed">{message.content}</p>
                          </div>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className={`rounded-2xl px-5 py-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div className="flex gap-2">
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className={`w-2 h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} rounded-full`}
                          />
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className={`w-2 h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} rounded-full`}
                          />
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className={`w-2 h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-400'} rounded-full`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className={`p-6 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`flex gap-3 items-end ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-3 border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                rows={1}
                className={`flex-1 ${darkMode ? 'bg-gray-900 text-white placeholder:text-gray-500' : 'bg-white text-gray-900 placeholder:text-gray-400'} outline-none resize-none max-h-32`}
              />
              <div className="flex gap-2">
                <button className={`w-10 h-10 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} flex items-center justify-center transition-colors`}>
                  <Smile className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    inputValue.trim()
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl'
                      : darkMode
                      ? 'bg-gray-800 text-gray-600'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center mt-3`}>
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companion;
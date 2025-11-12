import React from 'react';
import { motion } from 'framer-motion';
// Assuming you import relevant icons like PenTool, MessageSquare, LineChart, Shield
import { PenTool, MessageSquare, LineChart, Shield } from 'lucide-react'; 

// Placeholder Data (Replace with your actual features prop)
const featuresData = [
    {
        icon: PenTool,
        color: "bg-emerald-100 text-emerald-600",
        title: "Private AI Journaling",
        description: "Capture your daily thoughts and feelings in a secure, encrypted space. Our intuitive interface makes reflection effortless.",
        highlight: true,
    },
    {
        icon: MessageSquare,
        color: "bg-blue-100 text-blue-600",
        title: "Guided AI Companion",
        description: "Chat with an empathetic AI designed to listen without judgment, offering personalized insights and coping strategies.",
        highlight: false,
    },
    {
        icon: LineChart,
        color: "bg-purple-100 text-purple-600",
        title: "Emotional Trend Tracking",
        description: "Visualize your emotional patterns over time, helping you identify triggers and measure your progress toward better mental health.",
        highlight: false,
    },
    {
        icon: Shield,
        color: "bg-yellow-100 text-yellow-600",
        title: "Complete Data Privacy",
        description: "Your data is secured with end-to-end encryption. You own your data—we don't train our AI on your private entries.",
        highlight: false,
    }
];

const FeaturesSection = () => {
    // Separate the highlight feature from the rest
    const highlightFeature = featuresData.find(f => f.highlight);
    const regularFeatures = featuresData.filter(f => !f.highlight);

    return (
        <section id="features" className="py-24 px-6 bg-gray-50"> {/* Added bg-gray-50 */}
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Everything you need for **emotional wellness** 🧠
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to support your mental health journey, all in one private space.
                    </p>
                </div>

                {/* Dynamic Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* 1. Highlight Feature (Takes 2/3 width on large screens) */}
                    {highlightFeature && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-2 bg-white rounded-3xl p-10 border border-emerald-200 shadow-xl shadow-emerald-100/50 flex flex-col justify-between"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Icon and Text */}
                                <div className="flex-shrink-0">
                                    <div className={`w-16 h-16 ${highlightFeature.color} rounded-xl flex items-center justify-center mb-5 ring-4 ring-emerald-500/20`}> {/* Larger, more prominent icon */}
                                        <highlightFeature.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{highlightFeature.title}</h3>
                                    <p className="text-lg text-gray-700 leading-relaxed max-w-xl">{highlightFeature.description}</p>
                                </div>
                            </div>
                            
                            {/* Feature specific visual/CTA can go here */}
                            <div className="mt-8">
                                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">⭐ Core Feature</span>
                            </div>
                        </motion.div>
                    )}

                    {/* 2. Smaller Features (Takes 1/3 width on large screens) */}
                    <div className="lg:col-span-1 grid gap-8">
                        {regularFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                whileHover={{ y: -5, shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg transition-all"
                            >
                                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <feature.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
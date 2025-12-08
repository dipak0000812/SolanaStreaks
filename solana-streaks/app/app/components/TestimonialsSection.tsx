"use client";

import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "Finally, a prediction market I actually want to check daily. The streak system is genuinely addictive!",
        author: "Alex Chen",
        role: "DeFi Trader",
        avatar: "👨‍💼",
        stats: "8-day streak"
    },
    {
        quote: "I'm up 12 SOL in a week just from the streak multipliers. This changes everything.",
        author: "Sarah K.",
        role: "Crypto Investor",
        avatar: "👩‍💻",
        stats: "15-day streak"
    },
    {
        quote: "Way better than Polymarket. The tournament feature makes it actually fun.",
        author: "Marcus J.",
        role: "Web3 Gamer",
        avatar: "🎮",
        stats: "Rank #23"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-transparent to-space-black/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
                        What Beta Testers Say
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Real feedback from real users
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="glass-panel rounded-2xl border border-white/10 p-6 hover:border-neon-green/30 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-4xl">{testimonial.avatar}</span>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.author}</p>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                    <p className="text-xs text-neon-green font-bold mt-1">{testimonial.stats}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

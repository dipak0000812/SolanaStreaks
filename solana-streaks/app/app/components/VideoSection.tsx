"use client";

import { motion } from 'framer-motion';

export default function VideoSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-space-black/50 to-transparent">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-neon-pink/20 border border-neon-pink/30 text-neon-pink text-sm font-bold mb-4">
                            🎥 2 MINUTE DEMO
                        </span>
                        <h2 className="font-orbitron font-bold text-5xl text-white mb-4">
                            See It In Action
                        </h2>
                        <p className="text-xl text-gray-400">
                            Watch how SolanaStreaks solves the $2B retention problem
                        </p>
                    </motion.div>

                    {/* Video placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-video rounded-3xl overflow-hidden border-2 border-neon-green/30 bg-gradient-to-br from-space-black to-gray-900"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <motion.span
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-6xl mb-4 block"
                                >
                                    🎬
                                </motion.span>
                                <p className="text-xl font-orbitron font-bold text-white mb-2">
                                    Video Coming Soon
                                </p>
                                <p className="text-sm text-gray-400">
                                    Try the live demo while you wait
                                </p>
                            </div>
                        </div>

                        {/* Animated border glow */}
                        <div className="absolute inset-0 opacity-50">
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple animate-pulse-glow" style={{ filter: 'blur(20px)' }} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

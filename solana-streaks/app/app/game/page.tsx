"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, ExternalLink, Trophy, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function GamePage() {
    const [isPlaying, setIsPlaying] = useState(false);

    const openFullScreen = () => {
        const gameWindow = window.open('/game/index.html', '_blank');
        if (gameWindow) {
            gameWindow.focus();
        }
    };

    return (
        <div className="min-h-screen space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <div className="text-6xl mb-4">🎮</div>
                    <h1 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-4">
                        PREDICTION ARENA
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Multiplayer prediction game powered by <span className="text-neon-cyan">Moddio</span> & <span className="text-neon-green">Solana</span>
                    </p>
                </motion.div>
            </div>

            {/* Features Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
                <div className="glass-panel rounded-2xl border border-neon-green/30 p-6 text-center">
                    <Users className="w-12 h-12 text-neon-green mx-auto mb-3" />
                    <h3 className="font-orbitron font-bold text-lg text-white mb-2">Live Multiplayer</h3>
                    <p className="text-sm text-gray-400">See other players' predictions in real-time</p>
                </div>

                <div className="glass-panel rounded-2xl border border-neon-cyan/30 p-6 text-center">
                    <Zap className="w-12 h-12 text-neon-cyan mx-auto mb-3" />
                    <h3 className="font-orbitron font-bold text-lg text-white mb-2">Wallet Integration</h3>
                    <p className="text-sm text-gray-400">Connect Phantom to see your stats</p>
                </div>

                <div className="glass-panel rounded-2xl border border-neon-purple/30 p-6 text-center">
                    <Trophy className="w-12 h-12 text-neon-purple mx-auto mb-3" />
                    <h3 className="font-orbitron font-bold text-lg text-white mb-2">Live Feed</h3>
                    <p className="text-sm text-gray-400">Watch predictions happen on Solana</p>
                </div>
            </motion.div>

            {/* Game Embed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-6xl mx-auto"
            >
                <div className="glass-panel rounded-3xl border border-white/20 p-2 overflow-hidden">
                    <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            src="/game/index.html"
                            className="absolute top-0 left-0 w-full h-full rounded-2xl"
                            style={{ minHeight: '600px' }}
                            allow="fullscreen"
                            title="Prediction Arena Game"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center mt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openFullScreen}
                        className="px-8 py-4 bg-success-gradient text-black font-orbitron font-bold rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all flex items-center gap-2"
                    >
                        <ExternalLink className="w-5 h-5" />
                        Open Full Screen
                    </motion.button>

                    <Link href="/markets">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 glass-panel border border-neon-cyan/50 text-white font-orbitron font-bold rounded-xl hover:border-neon-cyan transition-all flex items-center gap-2"
                        >
                            <Gamepad2 className="w-5 h-5" />
                            Place Real Bets
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-4xl mx-auto glass-panel rounded-3xl border border-white/10 p-8"
            >
                <h2 className="font-orbitron font-bold text-2xl text-white mb-4">How It Works</h2>
                <div className="space-y-4 text-gray-300">
                    <p>
                        <span className="text-neon-green font-semibold">1. Connect Wallet:</span> Click the button in the game to connect your Phantom wallet
                    </p>
                    <p>
                        <span className="text-neon-cyan font-semibold">2. View Live Feed:</span> See real predictions from other players on the Solana blockchain
                    </p>
                    <p>
                        <span className="text-neon-purple font-semibold">3. Check Your Stats:</span> Your streak, level, and win rate display automatically
                    </p>
                    <p>
                        <span className="text-neon-orange font-semibold">4. Place Bets:</span> Go to Markets page to place real predictions and earn rewards
                    </p>
                </div>

                <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                    <p className="text-sm text-gray-300">
                        <strong className="text-neon-green">Powered by Moddio:</strong> This multiplayer game is built with Moddio's game engine and integrated with SolanaStreaks for real-time blockchain data.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

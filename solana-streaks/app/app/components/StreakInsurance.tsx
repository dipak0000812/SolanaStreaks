"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Flame, Trophy, Sparkles } from "lucide-react";

interface StreakInsuranceProps {
    userStreak: number;
    currentMultiplier: string;
    nextStreak: number;
    onPurchase: () => void;
}

export default function StreakInsurance({
    userStreak,
    currentMultiplier,
    nextStreak,
    onPurchase
}: StreakInsuranceProps) {
    const [hasInsurance, setHasInsurance] = useState(false);

    const handlePurchase = () => {
        setHasInsurance(true);
        onPurchase();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl border-2 border-neon-purple/30 p-6 bg-gradient-to-br from-neon-purple/10 to-neon-pink/10"
        >
            {!hasInsurance ? (
                <>
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="text-4xl"
                        >
                            🛡️
                        </motion.div>
                        <div>
                            <h3 className="font-orbitron font-bold text-xl text-white">
                                Streak Insurance
                            </h3>
                            <p className="text-sm text-gray-400">
                                Protect your {userStreak}-day streak from one wrong prediction
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="text-neon-green">✓</span>
                            One-time protection for your next loss
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="text-neon-green">✓</span>
                            Keep your {currentMultiplier} multiplier
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="text-neon-green">✓</span>
                            Don't lose progress toward {nextStreak}-day NFT
                        </div>
                    </div>

                    <div className="glass-panel rounded-xl p-4 bg-neon-gold/10 border border-neon-gold/30 mb-4">
                        <p className="text-xs text-center text-gray-300">
                            💡 <span className="font-semibold">Smart Investment:</span> Losing your {userStreak}-day streak
                            means losing {currentMultiplier} rewards. Insurance costs just 0.1 SOL!
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePurchase}
                        className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-lg hover:shadow-neon-purple/50 text-white font-orbitron font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Shield className="w-5 h-5" />
                        PROTECT STREAK - 0.1 SOL
                    </motion.button>
                </>
            ) : (
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center py-4"
                >
                    <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl mb-4 block"
                    >
                        🛡️
                    </motion.span>
                    <h3 className="font-orbitron font-bold text-2xl neon-text-green mb-2">
                        STREAK PROTECTED
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Your next wrong prediction won't reset your streak
                    </p>
                    <div className="glass-panel rounded-lg p-3 bg-neon-green/10 border border-neon-green/30">
                        <p className="text-xs text-neon-green font-semibold">
                            ✓ Active Protection • Expires after 1 use
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

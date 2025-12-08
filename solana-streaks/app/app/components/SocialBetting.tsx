"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Flame, Copy } from "lucide-react";

const TOP_PREDICTORS = [
    {
        name: "CryptoWhale",
        avatar: "🐋",
        prediction: "YES",
        amount: 5.2,
        streak: 15,
        winRate: 89,
        followers: 1234
    },
    {
        name: "StreakMaster",
        avatar: "🔥",
        prediction: "YES",
        amount: 3.1,
        streak: 12,
        winRate: 85,
        followers: 892
    },
    {
        name: "DiamondHands",
        avatar: "💎",
        prediction: "NO",
        amount: 2.8,
        streak: 10,
        winRate: 82,
        followers: 567
    },
];

interface SocialBettingProps {
    marketId: string;
    onCopyBet: (predictor: typeof TOP_PREDICTORS[0]) => void;
}

export default function SocialBetting({ marketId, onCopyBet }: SocialBettingProps) {
    const totalCopiers = 124;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 glass-panel rounded-2xl border border-white/10 p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-orbitron font-semibold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-neon-green" />
                    What Top Predictors Are Betting
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-neon-green font-bold">{totalCopiers}</span> copied today
                </div>
            </div>

            <div className="space-y-3">
                {TOP_PREDICTORS.map((predictor, index) => (
                    <motion.div
                        key={predictor.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-3 glass-panel rounded-xl border border-white/5 hover:border-neon-green/30 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-3 flex-1">
                            <span className="text-3xl">{predictor.avatar}</span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold text-white text-sm">{predictor.name}</p>
                                    {index === 0 && (
                                        <span className="text-xs bg-neon-gold/20 text-neon-gold px-2 py-0.5 rounded-full border border-neon-gold/30">
                                            TOP
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Flame className="w-3 h-3 text-neon-orange" />
                                        {predictor.streak} streak
                                    </span>
                                    <span>•</span>
                                    <span>{predictor.winRate}% win rate</span>
                                    <span>•</span>
                                    <span>{predictor.followers} followers</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className={`font-orbitron font-bold text-sm ${predictor.prediction === "YES" ? "text-neon-green" : "text-neon-pink"
                                    }`}>
                                    {predictor.prediction}
                                </p>
                                <p className="text-xs text-gray-400">{predictor.amount} SOL</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onCopyBet(predictor)}
                                className="opacity-0 group-hover:opacity-100 bg-neon-green text-black px-4 py-2 rounded-lg text-sm font-orbitron font-bold transition-all hover:shadow-lg hover:shadow-neon-green/50 flex items-center gap-1"
                            >
                                <Copy className="w-3 h-3" />
                                COPY
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 p-3 rounded-xl bg-neon-purple/10 border border-neon-purple/30 text-center"
            >
                <p className="text-xs text-gray-300">
                    💡 <span className="font-semibold">Pro Tip:</span> Follow top predictors to get notified when they place bets
                </p>
            </motion.div>
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";
import { Target, Flame, Users, Zap, Trophy, Clock } from "lucide-react";

const DAILY_CHALLENGES = [
    {
        id: 1,
        icon: "🎯",
        title: "Daily Predictor",
        description: "Make 3 predictions today",
        progress: 2,
        goal: 3,
        reward: "0.05 SOL bonus",
        status: "in_progress",
        color: "neon-green"
    },
    {
        id: 2,
        icon: "🔥",
        title: "Streak Guardian",
        description: "Maintain your 5+ day streak",
        progress: 7,
        goal: 5,
        reward: "2x multiplier for 24h",
        status: "complete",
        color: "neon-orange"
    },
    {
        id: 3,
        icon: "🎲",
        title: "Risk Taker",
        description: "Bet on an underdog (odds < 30%)",
        progress: 0,
        goal: 1,
        reward: "1.5x if you win",
        status: "locked",
        color: "neon-pink"
    },
    {
        id: 4,
        icon: "👥",
        title: "Social Butterfly",
        description: "Follow 2 top predictors",
        progress: 1,
        goal: 2,
        reward: "Free streak insurance",
        status: "in_progress",
        color: "neon-purple"
    }
];

export default function DailyChallenges() {
    const timeUntilReset = "14h 32m";
    const completedCount = DAILY_CHALLENGES.filter(c => c.status === 'complete').length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl border border-white/10 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-orbitron font-bold text-2xl text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-neon-gold" />
                    Daily Challenges
                </h3>
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Resets in</span>
                    <span className="text-neon-green font-orbitron font-bold">{timeUntilReset}</span>
                </div>
            </div>

            {/* Progress Overview */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-neon-gold/10 to-neon-orange/10 border border-neon-gold/30">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Daily Progress</span>
                    <span className="font-orbitron font-bold text-neon-gold">
                        {completedCount}/{DAILY_CHALLENGES.length} Complete
                    </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedCount / DAILY_CHALLENGES.length) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-neon-gold to-neon-orange rounded-full"
                    />
                </div>
            </div>

            {/* Challenges List */}
            <div className="space-y-4 mb-6">
                {DAILY_CHALLENGES.map((challenge, index) => (
                    <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className={`p-4 rounded-xl border transition-all ${challenge.status === 'complete'
                                ? 'bg-neon-green/10 border-neon-green/30'
                                : challenge.status === 'locked'
                                    ? 'bg-white/5 border-white/10 opacity-60'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <motion.span
                                animate={challenge.status === 'complete' ? {
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                } : {}}
                                transition={{ repeat: challenge.status === 'complete' ? Infinity : 0, duration: 2 }}
                                className="text-3xl"
                            >
                                {challenge.icon}
                            </motion.span>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-orbitron font-semibold text-white">{challenge.title}</h4>
                                    {challenge.status === 'complete' && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-xs bg-neon-green text-black px-3 py-1 rounded-full font-bold"
                                        >
                                            ✓ COMPLETE
                                        </motion.span>
                                    )}
                                    {challenge.status === 'locked' && (
                                        <span className="text-xs bg-white/10 text-gray-400 px-3 py-1 rounded-full font-bold">
                                            🔒 LOCKED
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-400 mb-3">{challenge.description}</p>

                                {/* Progress Bar */}
                                {challenge.status !== 'locked' && (
                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">Progress</span>
                                            <span className={`font-orbitron font-bold ${challenge.status === 'complete' ? 'text-neon-green' : 'text-white'
                                                }`}>
                                                {challenge.progress}/{challenge.goal}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                                className={`h-full bg-gradient-to-r ${challenge.status === 'complete'
                                                        ? 'from-neon-green to-neon-cyan'
                                                        : 'from-neon-purple to-neon-pink'
                                                    } rounded-full`}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Reward */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Trophy className="w-4 h-4 text-neon-gold" />
                                    <span className="text-gray-400">Reward:</span>
                                    <span className="text-neon-gold font-semibold">{challenge.reward}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Completion Bonus */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-gradient-to-r from-neon-gold/20 to-neon-orange/20 border-2 border-neon-gold/30 rounded-xl text-center"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-5xl mb-3"
                >
                    🏆
                </motion.div>
                <p className="text-sm text-gray-300 mb-2">Complete all 4 daily challenges</p>
                <p className="font-orbitron font-bold text-2xl text-neon-gold mb-1">
                    MEGA BONUS
                </p>
                <p className="text-lg font-semibold text-white">
                    0.5 SOL + Rare NFT Badge
                </p>
            </motion.div>
        </motion.div>
    );
}

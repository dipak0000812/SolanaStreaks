"use client";

import { motion } from "framer-motion";
import { Trophy, Clock, Flame, TrendingUp } from "lucide-react";

const TOURNAMENT_LEADERS = [
    { rank: 1, name: "CryptoWhale", avatar: "🐋", points: 2847, prize: "20 SOL", streak: 24 },
    { rank: 2, name: "StreakMaster", avatar: "🔥", points: 2103, prize: "12 SOL", streak: 21 },
    { rank: 3, name: "DiamondHands", avatar: "💎", points: 1876, prize: "8 SOL", streak: 19 },
    { rank: 4, name: "BullRun", avatar: "🐂", points: 1654, prize: "5 SOL", streak: 15 },
    { rank: 5, name: "MoonShot", avatar: "🚀", points: 1432, prize: "3 SOL", streak: 14 },
];

export default function LiveTournament() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-neon-pink/20 via-transparent to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/20 border border-neon-pink/30 text-neon-pink text-sm font-bold mb-4"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-pink opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-pink"></span>
                        </span>
                        LIVE TOURNAMENT
                    </motion.span>

                    <h2 className="font-orbitron font-bold text-5xl text-white mb-4">
                        December Tournament
                    </h2>
                    <p className="text-xl text-gray-400 mb-2">
                        Top 10 predictors win prize pool
                    </p>
                    <motion.p
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="text-3xl font-orbitron font-bold text-neon-gold"
                    >
                        50 SOL Prize Pool
                    </motion.p>
                </div>

                {/* Tournament Leaderboard */}
                <div className="max-w-4xl mx-auto glass-panel rounded-3xl border-2 border-white/10 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-orbitron font-bold text-2xl text-white flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-neon-gold" />
                            Live Rankings
                        </h3>
                        <div className="text-right">
                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Ends in
                            </p>
                            <motion.p
                                animate={{ opacity: [1, 0.7, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="font-orbitron font-bold text-xl text-neon-green"
                            >
                                4d 23h 15m
                            </motion.p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {TOURNAMENT_LEADERS.map((user, index) => (
                            <motion.div
                                key={user.rank}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 4, scale: 1.02 }}
                                className="flex items-center justify-between p-4 glass-panel rounded-xl hover:border-neon-green/30 transition-all border border-white/5"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-orbitron font-bold text-xl ${user.rank === 1 ? 'bg-gradient-to-br from-neon-gold to-neon-orange text-black shadow-lg shadow-neon-gold/50' :
                                            user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black shadow-lg shadow-gray-300/50' :
                                                user.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-black shadow-lg shadow-orange-400/50' :
                                                    'bg-white/10 text-white'
                                        }`}>
                                        {user.rank}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{user.avatar}</span>
                                        <div>
                                            <p className="font-semibold text-white">{user.name}</p>
                                            <p className="text-sm text-gray-400 flex items-center gap-1">
                                                <Flame className="w-3 h-3 text-neon-orange" />
                                                {user.streak} streak
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-orbitron font-bold text-lg text-neon-green flex items-center gap-1 justify-end">
                                        <TrendingUp className="w-4 h-4" />
                                        {user.points}
                                    </p>
                                    <p className="text-sm text-neon-gold font-semibold">{user.prize}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 p-4 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 border border-neon-green/30 rounded-xl text-center"
                    >
                        <p className="text-sm text-gray-400 mb-1">Your Rank</p>
                        <p className="font-orbitron font-bold text-2xl text-white mb-1">#47</p>
                        <p className="text-xs text-gray-400">
                            987 points • Keep betting to climb!
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

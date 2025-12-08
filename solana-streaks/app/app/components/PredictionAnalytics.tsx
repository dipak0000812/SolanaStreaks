"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, Lightbulb } from "lucide-react";

const PERFORMANCE_DATA = [
    { day: "Mon", winRate: 45 },
    { day: "Tue", winRate: 52 },
    { day: "Wed", winRate: 68 },
    { day: "Thu", winRate: 71 },
    { day: "Fri", winRate: 85 },
    { day: "Sat", winRate: 78 },
    { day: "Sun", winRate: 89 },
];

const CATEGORY_PERFORMANCE = [
    { category: "Crypto", winRate: 89, color: "#00FF94", bets: 45 },
    { category: "Sports", winRate: 67, color: "#8B5CF6", bets: 23 },
    { category: "Gaming", winRate: 45, color: "#FF006E", bets: 12 },
];

export default function PredictionAnalytics() {
    const maxWinRate = Math.max(...PERFORMANCE_DATA.map(d => d.winRate));

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {/* Win Rate Chart */}
            <div className="md:col-span-2 glass-panel rounded-2xl border border-white/10 p-6">
                <h3 className="font-orbitron font-bold text-xl text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-neon-green" />
                    Your Performance
                </h3>

                {/* Simple Bar Chart */}
                <div className="space-y-4">
                    {PERFORMANCE_DATA.map((data, index) => (
                        <motion.div
                            key={data.day}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                        >
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 font-semibold">{data.day}</span>
                                <span className="text-neon-green font-orbitron font-bold">{data.winRate}%</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${data.winRate}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full shadow-lg shadow-neon-green/30"
                                    style={{
                                        boxShadow: data.winRate === maxWinRate ? '0 0 20px rgba(0, 255, 148, 0.5)' : 'none'
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 p-4 glass-panel rounded-xl bg-neon-green/5 border border-neon-green/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">7-Day Average</p>
                            <p className="font-orbitron font-bold text-2xl text-neon-green">68.4%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400 mb-1">Trend</p>
                            <p className="font-orbitron font-bold text-lg text-neon-green flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                +12.3%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Performance */}
            <div className="glass-panel rounded-2xl border border-white/10 p-6">
                <h3 className="font-orbitron font-bold text-xl text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-neon-purple" />
                    Best Categories
                </h3>

                <div className="space-y-5">
                    {CATEGORY_PERFORMANCE.map((cat, index) => (
                        <motion.div
                            key={cat.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <div className="flex justify-between mb-2">
                                <div>
                                    <span className="text-white font-semibold">{cat.category}</span>
                                    <p className="text-xs text-gray-400">{cat.bets} bets</p>
                                </div>
                                <span style={{ color: cat.color }} className="font-orbitron font-bold text-lg">
                                    {cat.winRate}%
                                </span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${cat.winRate}%` }}
                                    transition={{ duration: 1, delay: index * 0.15 }}
                                    style={{ background: cat.color }}
                                    className="h-full rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl"
                >
                    <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-400 mb-1 font-semibold">💡 AI Insight</p>
                            <p className="text-sm text-white">
                                You're <span className="text-neon-green font-bold">34% better</span> at crypto predictions. Focus here for higher wins!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

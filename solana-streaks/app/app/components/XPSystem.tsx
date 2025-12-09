"use client";

import { motion } from 'framer-motion';
import { Star, Zap, Award, Crown, Flame } from 'lucide-react';

interface XPSystemProps {
    currentXP: number;
    level: number;
    totalBets: number;
}

export default function XPSystem({ currentXP, level, totalBets }: XPSystemProps) {
    const xpToNextLevel = level * 100;
    const progress = (currentXP / xpToNextLevel) * 100;

    const badges = [
        { name: 'First Bet', icon: Star, unlocked: totalBets >= 1, color: 'neon-cyan' },
        { name: 'Streak Master', icon: Flame, unlocked: level >= 5, color: 'neon-orange' },
        { name: 'High Roller', icon: Crown, unlocked: totalBets >= 50, color: 'neon-gold' },
        { name: 'Legendary', icon: Award, unlocked: level >= 10, color: 'neon-purple' },
    ];

    const perks = [
        { level: 5, perk: '+0.5x Streak Multiplier Bonus' },
        { level: 10, perk: 'Free Streak Insurance (1/week)' },
        { level: 15, perk: '+1.0x Streak Multiplier Bonus' },
        { level: 20, perk: 'Custom Profile Badge' },
    ];

    return (
        <div className="space-y-6">
            {/* Level & XP */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-3xl border border-neon-purple/30 p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-orbitron font-bold text-3xl text-white">Level {level}</h3>
                        <p className="text-sm text-gray-400">Bet-to-Earn XP System</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-orbitron font-bold text-neon-purple">{currentXP} XP</p>
                        <p className="text-xs text-gray-400">{xpToNextLevel - currentXP} to next level</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white drop-shadow-lg">
                            {progress.toFixed(0)}%
                        </span>
                    </div>
                </div>

                {/* XP Earning Info */}
                <div className="mt-4 p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-xl">
                    <p className="text-sm text-gray-300 mb-2">Earn XP by:</p>
                    <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between">
                            <span>Place bet</span>
                            <span className="text-neon-purple font-semibold">+10 XP</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Win bet</span>
                            <span className="text-neon-purple font-semibold">+25 XP</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Maintain streak</span>
                            <span className="text-neon-purple font-semibold">+50 XP</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Create market</span>
                            <span className="text-neon-purple font-semibold">+100 XP</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Badges */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel rounded-3xl border border-white/10 p-6"
            >
                <h3 className="font-orbitron font-bold text-xl text-white mb-4">Achievement Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {badges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={badge.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className={`p-4 rounded-xl border-2 text-center transition-all ${badge.unlocked
                                    ? `border-${badge.color}/50 bg-${badge.color}/10`
                                    : 'border-white/10 bg-white/5 opacity-50'
                                    }`}
                            >
                                <Icon className={`w-8 h-8 mx-auto mb-2 ${badge.unlocked ? `text-${badge.color}` : 'text-gray-600'
                                    }`} />
                                <p className={`text-xs font-semibold ${badge.unlocked ? 'text-white' : 'text-gray-600'
                                    }`}>
                                    {badge.name}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Level Perks */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel rounded-3xl border border-neon-green/30 p-6"
            >
                <h3 className="font-orbitron font-bold text-xl text-white mb-4">Level Perks</h3>
                <div className="space-y-3">
                    {perks.map((perk, index) => (
                        <div
                            key={perk.level}
                            className={`flex items-center justify-between p-3 rounded-xl border ${level >= perk.level
                                ? 'border-neon-green/30 bg-neon-green/10'
                                : 'border-white/10 bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-orbitron font-bold ${level >= perk.level
                                    ? 'bg-neon-green text-black'
                                    : 'bg-white/10 text-gray-600'
                                    }`}>
                                    {perk.level}
                                </div>
                                <span className={`text-sm ${level >= perk.level ? 'text-white' : 'text-gray-500'
                                    }`}>
                                    {perk.perk}
                                </span>
                            </div>
                            {level >= perk.level && (
                                <Zap className="w-5 h-5 text-neon-green" />
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

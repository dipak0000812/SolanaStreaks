"use client";

import { motion } from 'framer-motion';
import { DollarSign, Shield, TrendingUp, Users, Zap, Lock } from 'lucide-react';

export default function EconomicsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-orbitron font-black text-5xl md:text-6xl text-white mb-3">
                    Platform Economics
                </h1>
                <p className="text-xl text-gray-400">
                    Transparent fee structure and sustainable tokenomics
                </p>
            </div>

            {/* Fee Structure */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-3xl border border-neon-cyan/30 p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="w-8 h-8 text-neon-cyan" />
                    <h2 className="font-orbitron font-bold text-3xl text-white">Fee Structure</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="font-orbitron font-bold text-xl text-white mb-3">Trading Fees</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Platform Fee</span>
                                <span className="text-neon-cyan font-bold">2%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Creator Fee</span>
                                <span className="text-neon-cyan font-bold">2%</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                <span className="text-white font-semibold">Total Fee</span>
                                <span className="text-neon-green font-bold text-xl">4%</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                            Fees are deducted from winnings, not from bet placement
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="font-orbitron font-bold text-xl text-white mb-3">Revenue Distribution</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Protocol Treasury</span>
                                <span className="text-white font-bold">50%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Liquidity Pool</span>
                                <span className="text-white font-bold">30%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Insurance Fund</span>
                                <span className="text-white font-bold">20%</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                            Sustainable model ensures long-term platform viability
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Streak Multipliers */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel rounded-3xl border border-neon-orange/30 p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-8 h-8 text-neon-orange" />
                    <h2 className="font-orbitron font-bold text-3xl text-white">Streak Multipliers</h2>
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                    {[
                        { streak: '1-2', multiplier: '1.0x', color: 'gray' },
                        { streak: '3-4', multiplier: '1.5x', color: 'cyan' },
                        { streak: '5-9', multiplier: '2.0x', color: 'green' },
                        { streak: '10-14', multiplier: '3.0x', color: 'orange' },
                        { streak: '15+', multiplier: '3.5x', color: 'gold' },
                    ].map((tier, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-xl border-2 border-neon-${tier.color}/30 bg-neon-${tier.color}/5 text-center`}
                        >
                            <p className="text-sm text-gray-400 mb-1">Streak {tier.streak}</p>
                            <p className={`text-3xl font-orbitron font-bold text-neon-${tier.color}`}>
                                {tier.multiplier}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-xl">
                    <p className="text-sm text-gray-300">
                        <strong className="text-neon-orange">Example:</strong> With a 10-win streak and 3.0x multiplier,
                        a 1 SOL bet winning at 2:1 odds would pay out 6 SOL instead of 2 SOL
                    </p>
                </div>
            </motion.div>

            {/* Insurance Pricing */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel rounded-3xl border border-neon-purple/30 p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-neon-purple" />
                    <h2 className="font-orbitron font-bold text-3xl text-white">Streak Insurance</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="font-orbitron font-bold text-lg text-white mb-2">Cost</h3>
                        <p className="text-4xl font-orbitron font-bold text-neon-purple mb-2">0.1 SOL</p>
                        <p className="text-sm text-gray-400">Flat rate per 24-hour period</p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="font-orbitron font-bold text-lg text-white mb-2">Coverage</h3>
                        <p className="text-4xl font-orbitron font-bold text-neon-green mb-2">100%</p>
                        <p className="text-sm text-gray-400">Protects your entire streak</p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="font-orbitron font-bold text-lg text-white mb-2">Duration</h3>
                        <p className="text-4xl font-orbitron font-bold text-neon-cyan mb-2">24h</p>
                        <p className="text-sm text-gray-400">Renewable anytime</p>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="p-4 bg-white/5 rounded-xl">
                        <h4 className="font-semibold text-white mb-2">How It Works</h4>
                        <p className="text-sm text-gray-400">
                            If you lose a bet while insured, your streak is preserved. Insurance is consumed on first loss.
                        </p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl">
                        <h4 className="font-semibold text-white mb-2">Expected Value</h4>
                        <p className="text-sm text-gray-400">
                            For a 10+ streak (3.0x multiplier), insurance costs 0.1 SOL but protects potentially
                            hundreds of SOL in future multiplier value. ROI-positive for streaks 5+.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* XP System */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel rounded-3xl border border-white/10 p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-8 h-8 text-neon-gold" />
                    <h2 className="font-orbitron font-bold text-3xl text-white">XP & Leveling</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-orbitron font-bold text-xl text-white mb-4">XP Earning</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">Per Bet Placed</span>
                                <span className="text-white font-bold">10 XP</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">Per Win</span>
                                <span className="text-neon-green font-bold">50 XP</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">Streak Bonus (per win)</span>
                                <span className="text-neon-orange font-bold">+5 XP/streak</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-orbitron font-bold text-xl text-white mb-4">Level Formula</h3>
                        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-center font-mono text-neon-cyan mb-3">
                                Level = floor(√(XP / 100)) + 1
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Level 5:</span>
                                    <span className="text-white">2,500 XP</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Level 10:</span>
                                    <span className="text-white">10,000 XP</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Level 20:</span>
                                    <span className="text-white">40,000 XP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Platform Sustainability */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel rounded-3xl border border-neon-green/30 p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-8 h-8 text-neon-green" />
                    <h2 className="font-orbitron font-bold text-3xl text-white">Sustainability Model</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white/5 rounded-2xl">
                        <Users className="w-8 h-8 text-neon-cyan mb-3" />
                        <h3 className="font-orbitron font-bold text-lg text-white mb-2">User Growth</h3>
                        <p className="text-sm text-gray-400">
                            Streak mechanics and XP system drive daily active users and retention
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl">
                        <DollarSign className="w-8 h-8 text-neon-green mb-3" />
                        <h3 className="font-orbitron font-bold text-lg text-white mb-2">Revenue Streams</h3>
                        <p className="text-sm text-gray-400">
                            4% trading fees + insurance sales create sustainable revenue without token inflation
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-2xl">
                        <Shield className="w-8 h-8 text-neon-purple mb-3" />
                        <h3 className="font-orbitron font-bold text-lg text-white mb-2">Risk Management</h3>
                        <p className="text-sm text-gray-400">
                            Insurance fund and liquidity pool ensure platform can handle high-multiplier payouts
                        </p>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                    <p className="text-sm text-gray-300">
                        <strong className="text-neon-green">Platform Solvency:</strong> With 4% fees on all winning bets
                        and insurance revenue, the platform generates ~6-8% of total volume in revenue. Even with 3.5x max
                        multipliers, expected payout is 2.1x average, ensuring positive margins.
                    </p>
                </div>
            </motion.div>

            {/* On-Chain Transparency */}
            <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
                <p className="text-xs text-gray-300 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                    </span>
                    All fees and payouts are transparent and verifiable on Solana blockchain
                </p>
            </div>
        </div>
    );
}

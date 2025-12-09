"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Users, Flame, Trophy, DollarSign } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function TVLStats() {
    // ⚠️ DEMO MODE: Simulated stats for demonstration
    // In production, these would be calculated from on-chain data
    // TODO: Implement real TVL calculation from program.account.market.all()
    const stats = {
        totalMarketsCreated: 127,
        totalSOLWagered: 1847.3,
        totalSOLPaidOut: 1523.8,
        largestWin: 45.2,
        activeBettors: 342,
        totalTransactions: 2156,
    };

    const statCards = [
        {
            label: 'Total Volume',
            value: stats.totalSOLWagered,
            suffix: ' SOL',
            icon: DollarSign,
            color: 'neon-green',
            description: 'All-time wagered',
        },
        {
            label: 'Markets Created',
            value: stats.totalMarketsCreated,
            suffix: '',
            icon: TrendingUp,
            color: 'neon-cyan',
            description: 'Live + resolved',
        },
        {
            label: 'Active Bettors',
            value: stats.activeBettors,
            suffix: '',
            icon: Users,
            color: 'neon-purple',
            description: 'Last 7 days',
        },
        {
            label: 'Largest Win',
            value: stats.largestWin,
            suffix: ' SOL',
            icon: Trophy,
            color: 'neon-gold',
            description: 'Single payout',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel rounded-2xl border border-white/20 p-6 hover:border-white/30 transition-all"
                        >
                            <Icon className="w-8 h-8 text-neon-cyan mb-3" />
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-orbitron font-bold text-white">
                                    {stat.value.toFixed(stat.suffix === ' SOL' ? 1 : 0)}
                                </span>
                                <span className="text-lg font-orbitron font-bold text-neon-green">
                                    {stat.suffix}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Additional Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-panel rounded-2xl border border-white/10 p-6"
            >
                <h3 className="font-orbitron font-bold text-xl text-white mb-4">Platform Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-2xl font-orbitron font-bold text-neon-green">
                            {stats.totalSOLPaidOut.toFixed(1)} SOL
                        </p>
                        <p className="text-sm text-gray-400">Total Paid Out</p>
                    </div>
                    <div>
                        <p className="text-2xl font-orbitron font-bold text-neon-cyan">
                            {stats.totalTransactions}
                        </p>
                        <p className="text-sm text-gray-400">Total Transactions</p>
                    </div>
                    <div>
                        <p className="text-2xl font-orbitron font-bold text-neon-purple">
                            {(stats.totalSOLPaidOut / stats.totalSOLWagered * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-400">Payout Rate</p>
                    </div>
                </div>
            </motion.div>

            {/* Live Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-sm text-gray-400"
            >
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
                </span>
                <span>Live on Solana Devnet</span>
                <span className="text-xs text-neon-orange">• Demo Stats</span>
            </motion.div>
        </div>
    );
}

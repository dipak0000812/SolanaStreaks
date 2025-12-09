"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Flame, Trophy, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Activity {
    id: string;
    type: 'bet' | 'win' | 'streak' | 'market_created' | 'insurance';
    user: string;
    amount?: number;
    market?: string;
    message: string;
    time: string;
    icon: 'up' | 'down' | 'flame' | 'trophy' | 'dollar';
}

export default function LiveActivityFeed() {
    const [activities, setActivities] = useState<Activity[]>([
        {
            id: '1',
            type: 'win',
            user: '7xKX...9mPq',
            amount: 2.3,
            market: 'SOL $300',
            message: 'won 2.3 SOL on SOL $300',
            time: '12s ago',
            icon: 'up',
        },
        {
            id: '2',
            type: 'streak',
            user: '3nQw...4kLp',
            message: 'started 10-day streak • 3x multiplier unlocked',
            time: '1m ago',
            icon: 'flame',
        },
        {
            id: '3',
            type: 'bet',
            user: '9vRt...2hNm',
            amount: 0.5,
            market: 'BTC $100K',
            message: 'placed 0.5 SOL bet on BTC $100K',
            time: '3m ago',
            icon: 'dollar',
        },
    ]);

    // Simulate new activities
    useEffect(() => {
        const interval = setInterval(() => {
            const newActivity: Activity = {
                id: Date.now().toString(),
                type: ['bet', 'win', 'streak'][Math.floor(Math.random() * 3)] as any,
                user: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
                amount: Math.random() * 5,
                market: ['SOL $300', 'BTC $100K', 'ETH $5000'][Math.floor(Math.random() * 3)],
                message: 'placed bet',
                time: 'Just now',
                icon: 'dollar',
            };

            setActivities(prev => [newActivity, ...prev].slice(0, 10));
        }, 15000); // New activity every 15 seconds

        return () => clearInterval(interval);
    }, []);

    const getIcon = (icon: string) => {
        switch (icon) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-neon-green" />;
            case 'down':
                return <TrendingDown className="w-4 h-4 text-neon-pink" />;
            case 'flame':
                return <Flame className="w-4 h-4 text-neon-orange" />;
            case 'trophy':
                return <Trophy className="w-4 h-4 text-neon-gold" />;
            default:
                return <DollarSign className="w-4 h-4 text-neon-cyan" />;
        }
    };

    return (
        <div className="glass-panel rounded-3xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-orbitron font-bold text-2xl text-white">Live Activity</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                    </span>
                    <span className="text-xs text-gray-400">Live</span>
                </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-start gap-3 p-3 glass-panel rounded-xl border border-white/5 hover:border-neon-green/30 transition-all"
                        >
                            <div className="mt-1">
                                {getIcon(activity.icon)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-white">
                                    <span className="font-mono text-neon-cyan">{activity.user}</span>
                                    {' '}
                                    <span className="text-gray-300">{activity.message}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

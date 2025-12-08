"use client";

import { motion } from 'framer-motion';

export default function RecentlyJoinedBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-neon-green/10 via-transparent to-neon-purple/10 border-b border-white/10 py-3"
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                    </span>
                    <span className="text-gray-300">
                        <span className="font-bold text-neon-green">Beta Testing Live</span> • 15 Active Markets
                    </span>
                    <span className="text-gray-600 hidden sm:inline">•</span>
                    <span className="text-gray-300">
                        <span className="font-bold text-neon-pink">Hackathon Demo</span> • Try it now!
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

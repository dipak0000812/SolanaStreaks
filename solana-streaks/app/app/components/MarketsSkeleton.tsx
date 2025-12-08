"use client";

import { motion } from 'framer-motion';

export default function MarketsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="animate-pulse glass-panel rounded-2xl border border-white/10 p-6 h-64"
                >
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-white/10 rounded w-1/2 mb-6" />
                    <div className="space-y-3">
                        <div className="h-2 bg-white/10 rounded" />
                        <div className="h-2 bg-white/10 rounded w-5/6" />
                        <div className="h-2 bg-white/10 rounded w-4/6" />
                    </div>
                    <div className="mt-6 flex gap-2">
                        <div className="h-10 bg-white/10 rounded flex-1" />
                        <div className="h-10 bg-white/10 rounded flex-1" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

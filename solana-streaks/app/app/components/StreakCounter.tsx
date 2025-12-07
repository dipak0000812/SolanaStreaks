"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function StreakCounter({ streak = 0 }: { streak?: number }) {
    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black/50 ring-1 ring-white/10 rounded-lg p-4 flex items-center space-x-3 backdrop-blur-md">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
                </motion.div>

                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Streak</span>
                    <div className="flex items-baseline space-x-1">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={streak}
                            className="text-3xl font-bold font-mono text-white"
                        >
                            {streak}
                        </motion.span>
                        <span className="text-sm text-gray-400">days</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

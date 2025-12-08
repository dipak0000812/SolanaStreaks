"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    suffix?: string;
    decimals?: number;
}

export default function AnimatedCounter({
    from = 0,
    to,
    duration = 2000,
    suffix = '',
    decimals = 0
}: AnimatedCounterProps) {
    const [count, setCount] = useState(from);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = from + (to - from) * easeOutQuart;

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [from, to, duration]);

    const formattedCount = decimals > 0
        ? count.toFixed(decimals)
        : Math.floor(count).toLocaleString();

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tabular-nums"
        >
            {formattedCount}{suffix}
        </motion.span>
    );
}

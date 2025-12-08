"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { Share2, Check } from "lucide-react";

interface SharePredictionProps {
    market?: {
        question: string;
    };
    prediction?: {
        outcome: string;
        amount: number;
    };
    userStreak?: number;
    multiplier?: number;
    type?: 'bet' | 'win' | 'streak';
}

export default function SharePrediction({
    market,
    prediction,
    userStreak = 12,
    multiplier = 2.0,
    type = 'bet'
}: SharePredictionProps) {
    const [copied, setCopied] = useState(false);

    const getShareText = () => {
        if (type === 'win' && market && prediction) {
            return `Just won ${prediction.amount * multiplier} SOL on "${market.question}" 🎉\n\n` +
                `My streak: ${userStreak} days | Multiplier: ${multiplier}x\n\n` +
                `Can you beat my prediction skills? 🔥`;
        } else if (type === 'streak') {
            return `Just hit a ${userStreak}-day prediction streak on SolanaStreaks! 🔥\n\n` +
                `Current multiplier: ${multiplier}x\n\n` +
                `Think you can beat me? 👇`;
        } else if (market && prediction) {
            return `Just bet ${prediction.outcome} on "${market.question}" 🎯\n\n` +
                `My streak: ${userStreak} days | Multiplier: ${multiplier}x\n\n` +
                `Join me on SolanaStreaks 👇`;
        }
        return `Making predictions on SolanaStreaks! Join me 🚀`;
    };

    const shareToTwitter = () => {
        if (typeof window === 'undefined') return;

        try {
            const text = getShareText();
            const url = window.location.origin;
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        } catch (error) {
            console.error('Twitter share failed:', error);
            alert('Failed to open Twitter. Please try again.');
        }
    };

    const shareToTelegram = () => {
        if (typeof window === 'undefined') return;

        try {
            const text = getShareText();
            const url = window.location.origin;
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            window.open(telegramUrl, '_blank');
        } catch (error) {
            console.error('Telegram share failed:', error);
            alert('Failed to open Telegram. Please try again.');
        }
    };

    const copyLink = async () => {
        if (typeof window === 'undefined') return;

        try {
            const text = getShareText() + '\n\n' + window.location.origin;
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Copy failed:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = getShareText() + '\n\n' + window.location.origin;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                alert('Failed to copy. Please try manually.');
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="flex flex-wrap gap-3">
            {/* Twitter Share */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToTwitter}
                className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-lg transition-all shadow-lg hover:shadow-[#1DA1F2]/50"
            >
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
                <span className="font-semibold text-white">Share on X</span>
            </motion.button>

            {/* Telegram Share */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareToTelegram}
                className="flex items-center gap-2 px-4 py-2 bg-[#0088cc] hover:bg-[#006699] rounded-lg transition-all shadow-lg hover:shadow-[#0088cc]/50"
            >
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
                <span className="font-semibold text-white">Telegram</span>
            </motion.button>

            {/* Copy Link */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 glass-panel border border-white/20 hover:border-neon-green/50 rounded-lg transition-all"
            >
                {copied ? (
                    <>
                        <Check className="w-5 h-5 text-neon-green" />
                        <span className="font-semibold text-neon-green">Copied!</span>
                    </>
                ) : (
                    <>
                        <Share2 className="w-5 h-5 text-neon-green" />
                        <span className="font-semibold text-white">Copy Link</span>
                    </>
                )}
            </motion.button>
        </div>
    );
}

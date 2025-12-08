"use client";

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-3xl">🔥</span>
                            <div>
                                <h3 className="font-orbitron font-black text-xl bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                                    SOLANA STREAKS
                                </h3>
                                <p className="text-xs text-gray-400">Predict. Streak. Earn 3x.</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            The first prediction market with streak multipliers on Solana.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-orbitron font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/markets" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                                    Markets
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/leaderboard" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Verification */}
                    <div>
                        <h4 className="font-orbitron font-bold text-white mb-4">Verify On-Chain</h4>
                        <div className="space-y-3">
                            <a
                                href="https://github.com/dipak0000812/solana-streaks-2.0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors text-sm group"
                            >
                                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>View Source Code</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                                href="https://solscan.io/account/B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ?cluster=devnet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel border border-neon-green/30 hover:border-neon-green/50 text-neon-green hover:bg-neon-green/10 transition-all text-sm font-orbitron font-semibold group"
                            >
                                <span>View on Solscan</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <p className="text-xs text-gray-500 font-mono">
                                Program: B5Rz9U...d2UsbQ
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2024 SolanaStreaks. Built on Solana Devnet.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="px-2 py-1 rounded bg-neon-green/10 text-neon-green border border-neon-green/30">
                            LIVE ON DEVNET
                        </span>
                        <span>Hackathon Submission</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

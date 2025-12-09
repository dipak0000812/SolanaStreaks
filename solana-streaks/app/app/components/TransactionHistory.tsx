"use client";

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { History, ExternalLink, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { useProgram } from '../hooks/useProgram';

interface BetHistory {
    betPDA: PublicKey;
    marketPDA: PublicKey;
    marketQuestion: string;
    prediction: string;
    amount: number;
    timestamp: number;
    status: 'active' | 'won' | 'lost' | 'claimed';
}

export default function TransactionHistory() {
    const { publicKey } = useWallet();
    const { program } = useProgram();

    const [history, setHistory] = useState<BetHistory[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (publicKey && program) {
            fetchHistory();
        }
    }, [publicKey, program]);

    const fetchHistory = async () => {
        if (!publicKey || !program) return;

        setLoading(true);
        try {
            // @ts-ignore - Anchor program types
            const allBets = await program.account.bet.all([
                {
                    memcmp: {
                        offset: 8 + 32, // After discriminator + market pubkey
                        bytes: publicKey.toBase58(),
                    }
                }
            ]);

            const historyData: BetHistory[] = [];

            for (const bet of allBets) {
                try {
                    // @ts-ignore
                    const market = await program.account.market.fetch(bet.account.market);

                    let status: 'active' | 'won' | 'lost' | 'claimed' = 'active';

                    if (market.resolved) {
                        if (bet.account.claimed) {
                            status = 'claimed';
                        } else if (market.winningOutcome === bet.account.prediction) {
                            status = 'won';
                        } else {
                            status = 'lost';
                        }
                    }

                    historyData.push({
                        betPDA: bet.publicKey,
                        marketPDA: bet.account.market,
                        marketQuestion: market.question,
                        prediction: market.outcomes[bet.account.prediction],
                        amount: Number(bet.account.amount),
                        timestamp: Number(bet.account.timestamp),
                        status,
                    });
                } catch (error) {
                    console.error('Error fetching market for bet:', error);
                }
            }

            // Sort by timestamp descending
            historyData.sort((a, b) => b.timestamp - a.timestamp);
            setHistory(historyData);
        } catch (error) {
            console.error('Failed to fetch transaction history:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!publicKey) {
        return (
            <div className="glass-panel rounded-3xl border border-white/10 p-8 text-center">
                <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                    Connect Your Wallet
                </h3>
                <p className="text-gray-400">
                    Connect to view your transaction history
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="glass-panel rounded-3xl border border-white/10 p-8">
                <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-6 h-6 text-neon-cyan animate-spin" />
                    <p className="text-white">Loading transaction history...</p>
                </div>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="glass-panel rounded-3xl border border-white/10 p-8 text-center">
                <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                    No Transaction History
                </h3>
                <p className="text-gray-400">
                    Your bets will appear here once you start trading
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron font-bold text-2xl text-white">
                    Transaction History
                </h3>
                <p className="text-sm text-gray-400">
                    {history.length} transaction{history.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="space-y-3">
                {history.map((item, index) => (
                    <motion.div
                        key={item.betPDA.toBase58()}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-panel rounded-2xl border border-white/10 p-4 hover:border-white/20 transition-all"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    {item.status === 'won' || item.status === 'claimed' ? (
                                        <TrendingUp className="w-4 h-4 text-neon-green" />
                                    ) : item.status === 'lost' ? (
                                        <TrendingDown className="w-4 h-4 text-neon-pink" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-neon-cyan animate-pulse" />
                                    )}
                                    <span className={`text-xs font-semibold uppercase ${item.status === 'won' || item.status === 'claimed' ? 'text-neon-green' :
                                            item.status === 'lost' ? 'text-neon-pink' : 'text-neon-cyan'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-white mb-1">
                                    {item.marketQuestion}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span>Predicted: <span className="text-white">{item.prediction}</span></span>
                                    <span>•</span>
                                    <span>Amount: <span className="text-white">{(item.amount / 1e9).toFixed(3)} SOL</span></span>
                                    <span>•</span>
                                    <span>{new Date(item.timestamp * 1000).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <a
                                href={`https://solscan.io/account/${item.betPDA.toBase58()}?cluster=devnet`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-neon-cyan" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* On-Chain Indicator */}
            <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl mt-6">
                <p className="text-xs text-gray-300 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                    </span>
                    All transactions verified on Solana blockchain - Click links to view on Solscan
                </p>
            </div>
        </div>
    );
}

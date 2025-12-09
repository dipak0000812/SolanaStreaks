"use client";

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useProgram } from '../hooks/useProgram';
import { useUserProfile } from '../hooks/useUserProfile';

interface PendingWinning {
    betPDA: PublicKey;
    marketPDA: PublicKey;
    amount: number;
    marketQuestion: string;
    prediction: string;
    claimed: boolean;
}

export default function ClaimWinnings() {
    const { publicKey } = useWallet();
    const { program, getPDAs } = useProgram();
    const { refetch: refetchProfile } = useUserProfile();

    const [pendingWinnings, setPendingWinnings] = useState<PendingWinning[]>([]);
    const [loading, setLoading] = useState(false);
    const [claiming, setClaiming] = useState<string | null>(null);

    useEffect(() => {
        if (publicKey && program) {
            fetchPendingWinnings();
        }
    }, [publicKey, program]);

    const fetchPendingWinnings = async () => {
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

            const winnings: PendingWinning[] = [];

            for (const bet of allBets) {
                try {
                    // @ts-ignore
                    const market = await program.account.market.fetch(bet.account.market);

                    // Check if market is resolved and user won
                    if (market.resolved &&
                        market.winningOutcome !== null &&
                        bet.account.prediction === market.winningOutcome &&
                        !bet.account.claimed) {

                        winnings.push({
                            betPDA: bet.publicKey,
                            marketPDA: bet.account.market,
                            amount: Number(bet.account.amount),
                            marketQuestion: market.question,
                            prediction: market.outcomes[bet.account.prediction],
                            claimed: bet.account.claimed,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching market for bet:', error);
                }
            }

            setPendingWinnings(winnings);
        } catch (error) {
            console.error('Failed to fetch pending winnings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (winning: PendingWinning) => {
        if (!publicKey || !program) return;

        setClaiming(winning.betPDA.toBase58());
        const toastId = toast.loading('Claiming your winnings...');

        try {
            const [userProfilePDA] = getPDAs.getUserProfilePDA(publicKey);

            const tx = await program.methods
                .claimWinnings()
                .accounts({
                    bet: winning.betPDA,
                    market: winning.marketPDA,
                    userProfile: userProfilePDA,
                    user: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            toast.success('Winnings claimed successfully!', {
                id: toastId,
                description: `You won ${(winning.amount / 1e9).toFixed(3)} SOL`,
                action: {
                    label: 'View',
                    onClick: () => window.open(
                        `https://solscan.io/tx/${tx}?cluster=devnet`,
                        '_blank'
                    ),
                },
                duration: 10000,
            });

            // Refresh data
            await fetchPendingWinnings();
            await refetchProfile();

        } catch (error: any) {
            console.error('Claim error:', error);

            let errorMessage = 'Failed to claim winnings';
            if (error.message?.includes('already claimed')) {
                errorMessage = 'Winnings already claimed';
            } else if (error.message?.includes('not resolved')) {
                errorMessage = 'Market not yet resolved';
            }

            toast.error(errorMessage, {
                id: toastId,
                description: error.message || 'Please try again',
            });
        } finally {
            setClaiming(null);
        }
    };

    if (!publicKey) {
        return (
            <div className="glass-panel rounded-3xl border border-neon-purple/30 p-8 text-center">
                <Trophy className="w-16 h-16 text-neon-purple mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                    Connect Your Wallet
                </h3>
                <p className="text-gray-400">
                    Connect to view and claim your winnings
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="glass-panel rounded-3xl border border-white/10 p-8">
                <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-6 h-6 text-neon-cyan animate-spin" />
                    <p className="text-white">Loading your winnings...</p>
                </div>
            </div>
        );
    }

    if (pendingWinnings.length === 0) {
        return (
            <div className="glass-panel rounded-3xl border border-white/10 p-8 text-center">
                <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                    No Pending Winnings
                </h3>
                <p className="text-gray-400">
                    Place bets on markets to start winning!
                </p>
            </div>
        );
    }

    const totalWinnings = pendingWinnings.reduce((sum, w) => sum + w.amount, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="glass-panel rounded-3xl border border-neon-green/30 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-orbitron font-bold text-2xl text-white mb-1">
                            Pending Winnings
                        </h3>
                        <p className="text-gray-400">
                            {pendingWinnings.length} winning bet{pendingWinnings.length !== 1 ? 's' : ''} ready to claim
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Total</p>
                        <p className="text-4xl font-orbitron font-bold text-neon-green">
                            {(totalWinnings / 1e9).toFixed(3)} SOL
                        </p>
                    </div>
                </div>
            </div>

            {/* Winnings List */}
            <div className="space-y-4">
                {pendingWinnings.map((winning, index) => (
                    <motion.div
                        key={winning.betPDA.toBase58()}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel rounded-2xl border border-white/10 p-6"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="w-5 h-5 text-neon-green" />
                                    <span className="text-sm text-neon-green font-semibold">
                                        YOU WON!
                                    </span>
                                </div>
                                <h4 className="font-semibold text-white mb-2">
                                    {winning.marketQuestion}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span>Your prediction: <span className="text-neon-green">{winning.prediction}</span></span>
                                    <span>•</span>
                                    <span>Winnings: <span className="text-white font-semibold">{(winning.amount / 1e9).toFixed(3)} SOL</span></span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleClaim(winning)}
                                disabled={claiming !== null}
                                className="px-6 py-3 bg-success-gradient text-black font-orbitron font-bold rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                            >
                                {claiming === winning.betPDA.toBase58() ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Claiming...
                                    </>
                                ) : (
                                    <>
                                        <Trophy className="w-4 h-4" />
                                        CLAIM
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* On-Chain Indicator */}
            <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                <p className="text-xs text-gray-300 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                    </span>
                    All winnings verified on Solana blockchain - Claim transactions visible on Solscan
                </p>
            </div>
        </div>
    );
}

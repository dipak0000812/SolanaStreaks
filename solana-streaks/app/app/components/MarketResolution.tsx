"use client";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ExternalLink, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useProgram } from '../hooks/useProgram';

interface Market {
    publicKey: PublicKey;
    authority: PublicKey;
    question: string;
    outcomes: string[];
    resolved: boolean;
    winningOutcome: number | null;
    resolutionTime: number;
}

interface MarketResolutionProps {
    market: Market;
    onResolved?: () => void;
}

export default function MarketResolution({ market, onResolved }: MarketResolutionProps) {
    const { publicKey } = useWallet();
    const { program } = useProgram();

    const [resolving, setResolving] = useState(false);
    const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null);

    const isCreator = publicKey && market.authority.equals(publicKey);
    const canResolve = isCreator && !market.resolved && Date.now() / 1000 >= market.resolutionTime;

    const handleResolve = async () => {
        if (!publicKey || !program || selectedOutcome === null) return;

        setResolving(true);
        const toastId = toast.loading('Resolving market on-chain...');

        try {
            const tx = await program.methods
                .resolveMarket(selectedOutcome)
                .accounts({
                    market: market.publicKey,
                    authority: publicKey,
                })
                .rpc();

            toast.success('Market resolved successfully!', {
                id: toastId,
                description: `Winning outcome: ${market.outcomes[selectedOutcome]}`,
                action: {
                    label: 'View',
                    onClick: () => window.open(
                        `https://solscan.io/tx/${tx}?cluster=devnet`,
                        '_blank'
                    ),
                },
                duration: 10000,
            });

            if (onResolved) {
                onResolved();
            }

        } catch (error: any) {
            console.error('Resolution error:', error);

            let errorMessage = 'Failed to resolve market';
            if (error.message?.includes('already resolved')) {
                errorMessage = 'Market already resolved';
            } else if (error.message?.includes('unauthorized')) {
                errorMessage = 'Only market creator can resolve';
            } else if (error.message?.includes('too early')) {
                errorMessage = 'Resolution time not reached yet';
            }

            toast.error(errorMessage, {
                id: toastId,
                description: error.message || 'Please try again',
            });
        } finally {
            setResolving(false);
        }
    };

    if (market.resolved) {
        return (
            <div className="glass-panel rounded-2xl border border-neon-green/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-neon-green" />
                    <h3 className="font-orbitron font-bold text-xl text-white">
                        Market Resolved
                    </h3>
                </div>
                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Winning Outcome</p>
                        <p className="text-2xl font-orbitron font-bold text-neon-green">
                            {market.winningOutcome !== null ? market.outcomes[market.winningOutcome] : 'N/A'}
                        </p>
                    </div>
                    <div className="p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                        <p className="text-xs text-gray-300 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                            </span>
                            Resolution verified on Solana blockchain
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!canResolve) {
        const timeUntilResolution = market.resolutionTime - Date.now() / 1000;
        const hoursRemaining = Math.max(0, Math.floor(timeUntilResolution / 3600));
        const minutesRemaining = Math.max(0, Math.floor((timeUntilResolution % 3600) / 60));

        return (
            <div className="glass-panel rounded-2xl border border-neon-purple/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-neon-purple" />
                    <h3 className="font-orbitron font-bold text-xl text-white">
                        Awaiting Resolution
                    </h3>
                </div>
                <div className="space-y-3">
                    {!isCreator && (
                        <p className="text-gray-400">
                            Only the market creator can resolve this market.
                        </p>
                    )}
                    {isCreator && timeUntilResolution > 0 && (
                        <div>
                            <p className="text-gray-400 mb-2">Time until resolution:</p>
                            <p className="text-2xl font-orbitron font-bold text-neon-purple">
                                {hoursRemaining}h {minutesRemaining}m
                            </p>
                        </div>
                    )}
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-xs text-gray-400">
                            Resolution time: {new Date(market.resolutionTime * 1000).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel rounded-2xl border border-neon-cyan/30 p-6">
            <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-neon-cyan" />
                <h3 className="font-orbitron font-bold text-xl text-white">
                    Resolve Market
                </h3>
            </div>

            <div className="space-y-6">
                <div>
                    <p className="text-sm text-gray-400 mb-3">Select Winning Outcome</p>
                    <div className="grid grid-cols-2 gap-3">
                        {market.outcomes.map((outcome, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedOutcome(index)}
                                disabled={resolving}
                                className={`p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${selectedOutcome === index
                                        ? 'border-neon-green bg-neon-green/10'
                                        : 'border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-orbitron font-bold text-white">
                                        {outcome}
                                    </span>
                                    {selectedOutcome === index && (
                                        <CheckCircle2 className="w-5 h-5 text-neon-green" />
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: resolving ? 1 : 1.02 }}
                    whileTap={{ scale: resolving ? 1 : 0.98 }}
                    onClick={handleResolve}
                    disabled={resolving || selectedOutcome === null}
                    className="w-full bg-success-gradient text-black font-orbitron font-bold text-lg py-4 rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {resolving ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Resolving on Solana...
                        </>
                    ) : (
                        'RESOLVE MARKET ON-CHAIN'
                    )}
                </motion.button>

                <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
                    <p className="text-xs text-gray-300 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                        </span>
                        Resolution will be recorded permanently on Solana blockchain
                    </p>
                </div>
            </div>
        </div>
    );
}

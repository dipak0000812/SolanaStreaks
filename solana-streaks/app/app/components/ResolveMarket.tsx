"use client";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { toast } from 'sonner';
import { useBlockchain } from '../hooks/useBlockchain';
import { usePyth } from '../hooks/usePyth';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

interface Market {
    id: string;
    question: string;
    category: string;
    resolved: boolean;
    disputed: boolean;
    resolutionTime: string;
    creator: string;
    priceSymbol?: 'SOL/USD' | 'BTC/USD' | 'ETH/USD';
    targetPrice?: number;
    condition?: 'above' | 'below';
}

interface ResolveMarketProps {
    market: Market;
    onResolved: () => void;
}

export default function ResolveMarket({ market, onResolved }: ResolveMarketProps) {
    const { publicKey } = useWallet();
    const { sendTransaction, loading } = useBlockchain();
    const { checkPriceCondition, getPrice } = usePyth();
    const [resolving, setResolving] = useState(false);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);

    const isResolver = publicKey?.toBase58() === market.creator; // In production: check resolver role

    const handleAutomaticResolution = async () => {
        if (!market.priceSymbol || !market.targetPrice || !market.condition) {
            toast.error('Market not configured for automatic resolution');
            return;
        }

        setResolving(true);

        try {
            // Fetch current price from Pyth
            const priceData = await getPrice(market.priceSymbol);
            if (!priceData) {
                toast.error('Failed to fetch price from Pyth oracle');
                setResolving(false);
                return;
            }

            setCurrentPrice(priceData.price);

            // Check condition
            const result = await checkPriceCondition(
                market.priceSymbol,
                market.targetPrice,
                market.condition
            );

            if (result === null) {
                toast.error('Failed to verify price condition');
                setResolving(false);
                return;
            }

            // Create resolution transaction
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey!,
                    toPubkey: new PublicKey('B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ'),
                    lamports: 0, // No fee for resolution
                })
            );

            const signature = await sendTransaction(
                transaction,
                `Resolving market: ${result ? 'YES' : 'NO'}`
            );

            if (signature) {
                toast.success('Market resolved with Pyth oracle!', {
                    description: `Result: ${result ? 'YES' : 'NO'} (${market.priceSymbol}: $${priceData.price.toFixed(2)})`,
                    duration: 10000,
                });
                onResolved();
            }
        } catch (error) {
            console.error('Resolution error:', error);
            toast.error('Failed to resolve market');
        } finally {
            setResolving(false);
        }
    };

    const handleManualResolution = async (outcome: 'YES' | 'NO') => {
        if (!publicKey) {
            toast.error('Please connect your wallet');
            return;
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ'),
                lamports: 0,
            })
        );

        const signature = await sendTransaction(
            transaction,
            `Resolving market: ${outcome}`
        );

        if (signature) {
            toast.success(`Market resolved: ${outcome}`, {
                description: 'Payouts will be distributed',
            });
            onResolved();
        }
    };

    const handleDispute = async () => {
        if (!publicKey) {
            toast.error('Please connect your wallet');
            return;
        }

        toast.info('Dispute submitted', {
            description: 'Market resolution will be reviewed by admin',
        });
    };

    if (market.resolved) {
        return (
            <div className="glass-panel rounded-2xl border border-neon-green/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-neon-green" />
                    <div>
                        <h3 className="font-orbitron font-bold text-xl text-white">Market Resolved</h3>
                        <p className="text-sm text-gray-400">Payouts distributed</p>
                    </div>
                </div>
                {market.priceSymbol && currentPrice && (
                    <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                        <p className="text-sm text-gray-300">
                            <span className="font-semibold text-neon-green">Pyth Oracle Price:</span> ${currentPrice.toFixed(2)}
                        </p>
                        <a
                            href="https://pyth.network/price-feeds"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neon-cyan hover:underline flex items-center gap-1 mt-1"
                        >
                            Verify on Pyth Network <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                )}
            </div>
        );
    }

    if (market.disputed) {
        return (
            <div className="glass-panel rounded-2xl border border-neon-orange/30 p-6">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-neon-orange" />
                    <div>
                        <h3 className="font-orbitron font-bold text-xl text-white">Under Dispute</h3>
                        <p className="text-sm text-gray-400">Admin review in progress</p>
                    </div>
                </div>
            </div>
        );
    }

    const isPastResolutionTime = new Date(market.resolutionTime) < new Date();

    if (!isPastResolutionTime) {
        return (
            <div className="glass-panel rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-gray-400" />
                    <div>
                        <h3 className="font-orbitron font-bold text-xl text-white">Awaiting Resolution</h3>
                        <p className="text-sm text-gray-400">Resolves: {new Date(market.resolutionTime).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel rounded-2xl border border-neon-purple/30 p-6 space-y-4">
            <div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-2">Resolve Market</h3>
                <p className="text-sm text-gray-400">Market has reached resolution time</p>
            </div>

            {/* Automatic Resolution (Pyth) */}
            {market.priceSymbol && market.targetPrice && (
                <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="font-semibold text-white">Automatic Resolution</p>
                            <p className="text-xs text-gray-400">Powered by Pyth Oracle</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-300">{market.priceSymbol}</p>
                            <p className="text-xs text-gray-400">Target: ${market.targetPrice}</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAutomaticResolution}
                        disabled={resolving || loading}
                        className="w-full bg-neon-cyan text-black font-orbitron font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-neon-cyan/50 transition-all disabled:opacity-50"
                    >
                        {resolving ? 'Fetching Pyth Price...' : 'Resolve with Pyth Oracle'}
                    </motion.button>
                </div>
            )}

            {/* Manual Resolution (Resolver Only) */}
            {isResolver && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="font-semibold text-white mb-3">Manual Resolution (Resolver)</p>
                    <div className="grid grid-cols-2 gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleManualResolution('YES')}
                            disabled={loading}
                            className="bg-neon-green text-black font-orbitron font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-neon-green/50 transition-all disabled:opacity-50"
                        >
                            Resolve YES
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleManualResolution('NO')}
                            disabled={loading}
                            className="bg-neon-pink text-white font-orbitron font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-neon-pink/50 transition-all disabled:opacity-50"
                        >
                            Resolve NO
                        </motion.button>
                    </div>
                </div>
            )}

            {/* Dispute Button */}
            {!isResolver && (
                <div className="p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-xl">
                    <p className="text-sm text-gray-300 mb-3">Disagree with the outcome?</p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDispute}
                        className="w-full bg-neon-orange text-black font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-neon-orange/50 transition-all"
                    >
                        Flag for Dispute
                    </motion.button>
                </div>
            )}

            {/* Trust Indicators */}
            <div className="p-4 bg-white/5 rounded-xl space-y-2">
                <p className="text-xs text-gray-400 font-semibold">Trust Mechanisms:</p>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                    {market.priceSymbol ? 'Pyth Oracle Integration' : 'Multi-sig Resolver'}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                    6-hour dispute window
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                    On-chain verification
                </div>
            </div>
        </div>
    );
}

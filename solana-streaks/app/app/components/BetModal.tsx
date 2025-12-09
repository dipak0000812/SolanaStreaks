"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Flame, Shield, ExternalLink, Loader2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';
import { useBlockchain } from '../hooks/useBlockchain';
import { useProgram, BN } from '../hooks/useProgram';
import { useUserProfile } from '../hooks/useUserProfile';

interface BetModalProps {
    isOpen: boolean;
    onClose: () => void;
    market: {
        id: string;
        question: string;
        outcomes: { name: string; odds: number }[];
        category: string;
    };
}

export default function BetModal({ isOpen, onClose, market }: BetModalProps) {
    const { publicKey } = useWallet();
    const { getBalance } = useBlockchain();
    const { program, getPDAs } = useProgram();
    const { profile, multiplier, refetch: refetchProfile } = useUserProfile();

    const [selectedOutcome, setSelectedOutcome] = useState<string>(market.outcomes[0].name);
    const [betAmount, setBetAmount] = useState('');
    const [balance, setBalance] = useState(0);
    const [placing, setPlacing] = useState(false);

    useEffect(() => {
        if (publicKey) {
            getBalance().then(setBalance);
        }
    }, [publicKey, getBalance]);

    const getOdds = (outcomeName: string) => {
        return market.outcomes.find(o => o.name === outcomeName)?.odds || 50;
    };

    const calculatePotentialWin = () => {
        const amount = parseFloat(betAmount) || 0;
        const odds = getOdds(selectedOutcome);
        return (amount * (100 / odds) * multiplier).toFixed(2);
    };

    const handlePlaceBet = async () => {
        // Check wallet connection
        if (!publicKey) {
            toast.error('Wallet not connected', {
                description: 'Please connect your wallet using the button in the top right',
            });
            return;
        }

        // Check program initialization
        if (!program) {
            toast.error('Program not initialized', {
                description: 'Please refresh the page and try again',
            });
            return;
        }

        // Validate bet amount
        const amount = parseFloat(betAmount);
        if (!amount || amount <= 0) {
            toast.error('Invalid bet amount', {
                description: 'Please enter a valid amount greater than 0',
            });
            return;
        }

        // Check if balance is loaded
        if (balance === null || balance === undefined) {
            toast.error('Loading balance...', {
                description: 'Please wait a moment and try again',
            });
            return;
        }

        // Check for zero balance
        if (balance === 0) {
            toast.error('Insufficient balance - You have 0 SOL', {
                description: 'Click the orange "Get 2 SOL" button in the navbar to get test SOL',
                duration: 6000,
            });
            return;
        }

        // Check if enough balance
        if (amount > balance) {
            toast.error(`Insufficient balance`, {
                description: `You have ${balance.toFixed(4)} SOL but need ${amount.toFixed(4)} SOL`,
                duration: 5000,
            });
            return;
        }

        setPlacing(true);
        const toastId = toast.loading('Placing bet on-chain...');

        try {
            // Derive PDAs
            const [userProfilePDA] = getPDAs.getUserProfilePDA(publicKey);
            const [marketPDA] = getPDAs.getMarketPDA(publicKey, market.id);
            const [betPDA] = getPDAs.getBetPDA(marketPDA, publicKey);

            // Get outcome index
            const outcomeIndex = market.outcomes.findIndex(o => o.name === selectedOutcome);

            // Call smart contract
            const tx = await program.methods
                .placeBet(
                    outcomeIndex,
                    new BN(amount * LAMPORTS_PER_SOL)
                )
                .accounts({
                    bet: betPDA,
                    market: marketPDA,
                    userProfile: userProfilePDA,
                    user: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            toast.success('Bet placed successfully!', {
                id: toastId,
                description: `${amount} SOL on ${selectedOutcome}`,
                action: {
                    label: 'View',
                    onClick: () => window.open(
                        `https://solscan.io/tx/${tx}?cluster=devnet`,
                        '_blank'
                    ),
                },
                duration: 10000,
            });

            // Update balance and profile
            const newBalance = await getBalance();
            setBalance(newBalance);
            await refetchProfile();

            // Close modal after success
            setTimeout(() => {
                onClose();
                setBetAmount('');
            }, 2000);

        } catch (error: any) {
            console.error('Bet placement error:', error);

            let errorMessage = 'Failed to place bet';
            if (error.message?.includes('insufficient')) {
                errorMessage = 'Insufficient SOL balance';
            } else if (error.message?.includes('rejected')) {
                errorMessage = 'Transaction rejected';
            } else if (error.message?.includes('Account does not exist')) {
                errorMessage = 'Market not found on-chain';
            }

            toast.error(errorMessage, {
                id: toastId,
                description: error.message || 'Please try again',
            });
        } finally {
            setPlacing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass-panel rounded-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 glass-panel border-b border-white/10 p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="font-orbitron font-bold text-2xl text-white mb-1">
                                        Place Your Bet
                                    </h2>
                                    <p className="text-sm text-gray-400">{market.category}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    disabled={placing}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Wallet Balance */}
                                <div className="flex items-center justify-between glass-panel rounded-xl p-4 border border-neon-cyan/30">
                                    <span className="text-white font-semibold">Your Balance</span>
                                    <p className="text-2xl font-orbitron font-bold text-neon-cyan">
                                        {balance.toFixed(3)} SOL
                                    </p>
                                </div>

                                {/* Market Question */}
                                <div className="glass-panel rounded-xl p-4 border border-white/10">
                                    <p className="text-lg text-white font-medium">{market.question}</p>
                                </div>

                                {/* Current Streak Info */}
                                {profile && (
                                    <div className="flex items-center justify-between glass-panel rounded-xl p-4 border border-neon-orange/30">
                                        <div className="flex items-center gap-2">
                                            <Flame className="w-5 h-5 text-neon-orange" />
                                            <span className="text-white font-semibold">Current Streak</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-orbitron font-bold text-neon-orange">
                                                {profile.currentStreak} days
                                            </p>
                                            <p className="text-sm text-gray-400">{multiplier}x multiplier</p>
                                        </div>
                                    </div>
                                )}

                                {/* Outcome Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-400 mb-3">
                                        Select Outcome
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {market.outcomes.map((outcome) => (
                                            <motion.button
                                                key={outcome.name}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedOutcome(outcome.name)}
                                                disabled={placing}
                                                className={`p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${selectedOutcome === outcome.name
                                                    ? 'border-neon-green bg-neon-green/10'
                                                    : 'border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-orbitron font-bold text-white">
                                                        {outcome.name}
                                                    </span>
                                                    {outcome.name === 'YES' ? (
                                                        <TrendingUp className="w-5 h-5 text-neon-green" />
                                                    ) : (
                                                        <TrendingDown className="w-5 h-5 text-neon-pink" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-400">{outcome.odds}% odds</p>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Bet Amount */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-400 mb-3">
                                        Bet Amount (SOL)
                                    </label>
                                    <input
                                        type="number"
                                        value={betAmount}
                                        onChange={(e) => setBetAmount(e.target.value)}
                                        placeholder="0.1"
                                        step="0.1"
                                        min="0"
                                        disabled={placing}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-orbitron text-lg focus:outline-none focus:border-neon-green/50 transition-colors disabled:opacity-50"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        {[0.1, 0.5, 1, 5].map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => setBetAmount(amount.toString())}
                                                disabled={placing}
                                                className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 transition-colors disabled:opacity-50"
                                            >
                                                {amount} SOL
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Potential Winnings */}
                                <div className="glass-panel rounded-xl p-4 border border-neon-green/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Potential Winnings</span>
                                        <div className="text-right">
                                            <p className="text-3xl font-orbitron font-bold text-neon-green">
                                                {calculatePotentialWin()} SOL
                                            </p>
                                            <p className="text-xs text-gray-400">with {multiplier}x multiplier</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Bet Button */}
                                <motion.button
                                    whileHover={{ scale: placing ? 1 : 1.02 }}
                                    whileTap={{ scale: placing ? 1 : 0.98 }}
                                    onClick={handlePlaceBet}
                                    disabled={placing || !publicKey}
                                    className="w-full bg-success-gradient text-black font-orbitron font-bold text-lg py-4 rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {placing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'PLACE BET ON-CHAIN'
                                    )}
                                </motion.button>

                                {!publicKey && (
                                    <p className="text-center text-sm text-gray-400">
                                        Connect your wallet to place bets
                                    </p>
                                )}

                                {/* On-Chain Indicator */}
                                <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
                                    <p className="text-xs text-gray-300 flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                                        </span>
                                        Real blockchain transaction - Verified on Solscan
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

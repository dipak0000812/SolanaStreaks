"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Flame, Shield, ExternalLink } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';
import { useBlockchain } from '../hooks/useBlockchain';

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
    const { sendTransaction, getBalance, requestAirdrop, loading } = useBlockchain();
    const [selectedOutcome, setSelectedOutcome] = useState<string>(market.outcomes[0].name);
    const [betAmount, setBetAmount] = useState('');
    const [useInsurance, setUseInsurance] = useState(false);
    const [balance, setBalance] = useState(0);

    const currentStreak = 7; // Will be fetched from blockchain
    const currentMultiplier = 2.0; // Calculated based on streak

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
        return (amount * (100 / odds) * currentMultiplier).toFixed(2);
    };

    const handlePlaceBet = async () => {
        if (!publicKey) {
            toast.error('Please connect your wallet first!');
            return;
        }

        const amount = parseFloat(betAmount);
        if (!amount || amount <= 0) {
            toast.error('Please enter a valid bet amount!');
            return;
        }

        if (amount > balance) {
            toast.error('Insufficient balance', {
                description: 'Get devnet SOL from faucet',
                action: {
                    label: 'Get SOL',
                    onClick: () => requestAirdrop(2),
                },
            });
            return;
        }

        // Create transaction
        // For demo: Send SOL to program (in production, this would call smart contract)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ'), // Program ID
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        const signature = await sendTransaction(
            transaction,
            `Placing ${amount} SOL bet on ${selectedOutcome}`
        );

        if (signature) {
            // Update balance
            const newBalance = await getBalance();
            setBalance(newBalance);

            // Close modal
            setTimeout(() => {
                onClose();
                setBetAmount('');
            }, 2000);
        }
    };

    const handleGetDevnetSOL = async () => {
        const success = await requestAirdrop(2);
        if (success) {
            const newBalance = await getBalance();
            setBalance(newBalance);
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
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Wallet Balance */}
                                <div className="flex items-center justify-between glass-panel rounded-xl p-4 border border-neon-cyan/30">
                                    <span className="text-white font-semibold">Your Balance</span>
                                    <div className="text-right">
                                        <p className="text-2xl font-orbitron font-bold text-neon-cyan">
                                            {balance.toFixed(2)} SOL
                                        </p>
                                        {balance < 0.1 && (
                                            <button
                                                onClick={handleGetDevnetSOL}
                                                className="text-xs text-neon-green hover:underline mt-1"
                                            >
                                                Get Devnet SOL
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Market Question */}
                                <div className="glass-panel rounded-xl p-4 border border-white/10">
                                    <p className="text-lg text-white font-medium">{market.question}</p>
                                </div>

                                {/* Current Streak Info */}
                                <div className="flex items-center justify-between glass-panel rounded-xl p-4 border border-neon-orange/30">
                                    <div className="flex items-center gap-2">
                                        <Flame className="w-5 h-5 text-neon-orange" />
                                        <span className="text-white font-semibold">Current Streak</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-orbitron font-bold text-neon-orange">{currentStreak} days</p>
                                        <p className="text-sm text-gray-400">{currentMultiplier}x multiplier</p>
                                    </div>
                                </div>

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
                                                className={`p-4 rounded-xl border-2 transition-all ${selectedOutcome === outcome.name
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
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-orbitron text-lg focus:outline-none focus:border-neon-green/50 transition-colors"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        {[0.1, 0.5, 1, 5].map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => setBetAmount(amount.toString())}
                                                className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 transition-colors"
                                            >
                                                {amount} SOL
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Streak Insurance */}
                                <div className="glass-panel rounded-xl p-4 border border-neon-purple/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-neon-purple" />
                                            <span className="font-semibold text-white">Streak Insurance</span>
                                        </div>
                                        <button
                                            onClick={() => setUseInsurance(!useInsurance)}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${useInsurance ? 'bg-neon-green' : 'bg-white/20'
                                                }`}
                                        >
                                            <motion.div
                                                animate={{ x: useInsurance ? 24 : 2 }}
                                                className="absolute top-1 w-4 h-4 bg-white rounded-full"
                                            />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Protect your streak for 0.1 SOL. If you lose, your streak continues!
                                    </p>
                                </div>

                                {/* Potential Winnings */}
                                <div className="glass-panel rounded-xl p-4 border border-neon-green/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Potential Winnings</span>
                                        <div className="text-right">
                                            <p className="text-3xl font-orbitron font-bold text-neon-green">
                                                {calculatePotentialWin()} SOL
                                            </p>
                                            <p className="text-xs text-gray-400">with {currentMultiplier}x multiplier</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Bet Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePlaceBet}
                                    disabled={loading || !publicKey}
                                    className="w-full bg-success-gradient text-black font-orbitron font-bold text-lg py-4 rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'PLACE BET'}
                                </motion.button>

                                {!publicKey && (
                                    <p className="text-center text-sm text-gray-400">
                                        Connect your wallet to place bets
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

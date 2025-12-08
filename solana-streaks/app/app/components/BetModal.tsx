"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Flame, Shield } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

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
    const [selectedOutcome, setSelectedOutcome] = useState<string>(market.outcomes[0].name);
    const [betAmount, setBetAmount] = useState('');
    const [useInsurance, setUseInsurance] = useState(false);

    const currentStreak = 7; // Mock data
    const currentMultiplier = 2.0; // Mock data

    const getOdds = (outcomeName: string) => {
        return market.outcomes.find(o => o.name === outcomeName)?.odds || 50;
    };

    const calculatePotentialWin = () => {
        const amount = parseFloat(betAmount) || 0;
        const odds = getOdds(selectedOutcome);
        return (amount * (100 / odds) * currentMultiplier).toFixed(2);
    };

    const handlePlaceBet = () => {
        if (!publicKey) {
            alert('Please connect your wallet first!');
            return;
        }

        if (!betAmount || parseFloat(betAmount) <= 0) {
            alert('Please enter a valid bet amount!');
            return;
        }

        // Mock bet placement - in production, this would call smart contract
        console.log('Placing bet:', {
            market: market.id,
            outcome: selectedOutcome,
            amount: betAmount,
            insurance: useInsurance
        });

        alert(`Bet placed successfully! ${betAmount} SOL on ${selectedOutcome}`);
        onClose();
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
                                    <div className="grid grid-cols-2 gap-4">
                                        {market.outcomes.map((outcome) => (
                                            <button
                                                key={outcome.name}
                                                onClick={() => setSelectedOutcome(outcome.name)}
                                                className={`p-4 rounded-xl border-2 transition-all ${selectedOutcome === outcome.name
                                                    ? 'border-neon-green bg-neon-green/10'
                                                    : 'border-white/20 hover:border-white/40'
                                                    }`}
                                            >
                                                {outcome.name === 'Yes' ? (
                                                    <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${selectedOutcome === outcome.name ? 'text-neon-green' : 'text-gray-400'}`} />
                                                ) : (
                                                    <TrendingDown className={`w-6 h-6 mx-auto mb-2 ${selectedOutcome === outcome.name ? 'text-neon-pink' : 'text-gray-400'}`} />
                                                )}
                                                <p className="font-orbitron font-bold text-white mb-1">{outcome.name}</p>
                                                <p className="text-sm text-gray-400">{outcome.odds}% odds</p>
                                            </button>
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
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 rounded-xl glass-panel border border-white/20 text-white font-orbitron text-lg focus:border-neon-green focus:outline-none"
                                        step="0.01"
                                        min="0"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        {[0.1, 0.5, 1, 5].map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => setBetAmount(amount.toString())}
                                                className="px-3 py-1 rounded-lg glass-panel border border-white/20 text-sm text-gray-400 hover:text-white hover:border-white/40 transition-all"
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
                                            className={`relative w-12 h-6 rounded-full transition-colors ${useInsurance ? 'bg-neon-purple' : 'bg-gray-600'
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
                                <div className="glass-panel rounded-xl p-4 border border-neon-green/30 bg-neon-green/5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Potential Winnings</span>
                                        <div className="text-right">
                                            <p className="text-2xl font-orbitron font-bold neon-text-green">
                                                {calculatePotentialWin()} SOL
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                with {currentMultiplier}x multiplier
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Bet Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePlaceBet}
                                    disabled={!publicKey}
                                    className="w-full py-4 rounded-xl bg-success-gradient font-orbitron font-bold text-lg text-black shadow-lg shadow-neon-green/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {publicKey ? 'PLACE BET' : 'CONNECT WALLET'}
                                </motion.button>

                                {!publicKey && (
                                    <p className="text-center text-sm text-gray-400">
                                        Please connect your wallet to place bets
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

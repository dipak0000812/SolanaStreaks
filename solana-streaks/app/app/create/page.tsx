"use client";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';
import { useBlockchain } from '../hooks/useBlockchain';
import { motion } from 'framer-motion';
import { Calendar, Plus, TrendingUp } from 'lucide-react';

export default function CreateMarketPage() {
  const { publicKey } = useWallet();
  const { sendTransaction, loading } = useBlockchain();
  const [question, setQuestion] = useState('');
  const [outcomes, setOutcomes] = useState(['YES', 'NO']);
  const [resolutionDate, setResolutionDate] = useState('');
  const [category, setCategory] = useState('Crypto');

  const handleCreateMarket = async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first!');
      return;
    }

    if (!question.trim()) {
      toast.error('Please enter a market question');
      return;
    }

    if (!resolutionDate) {
      toast.error('Please select a resolution date');
      return;
    }

    // Create transaction (demo: small fee to program)
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ'),
        lamports: 0.01 * LAMPORTS_PER_SOL, // 0.01 SOL creation fee
      })
    );

    const signature = await sendTransaction(
      transaction,
      'Creating prediction market'
    );

    if (signature) {
      toast.success('Market created successfully!', {
        description: 'Your market is now live',
        duration: 5000,
      });

      // Reset form
      setQuestion('');
      setOutcomes(['YES', 'NO']);
      setResolutionDate('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-orbitron font-black text-5xl md:text-6xl text-white mb-3">
          Create Market
        </h1>
        <p className="text-xl text-gray-400">
          Launch your own prediction market on Solana
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-8 space-y-6"
      >
        {/* Market Question */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-3">
            Market Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Will Bitcoin reach $100,000 by end of 2024?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-3">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
          >
            <option value="Crypto">Crypto</option>
            <option value="Sports">Sports</option>
            <option value="Gaming">Gaming</option>
            <option value="Community">Community</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Resolution Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-3">
            Resolution Date
          </label>
          <input
            type="date"
            value={resolutionDate}
            onChange={(e) => setResolutionDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
          />
        </div>

        {/* Outcomes */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-3">
            Outcomes
          </label>
          <div className="grid grid-cols-2 gap-3">
            {outcomes.map((outcome, index) => (
              <input
                key={index}
                type="text"
                value={outcome}
                onChange={(e) => {
                  const newOutcomes = [...outcomes];
                  newOutcomes[index] = e.target.value;
                  setOutcomes(newOutcomes);
                }}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Create Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateMarket}
          disabled={loading || !publicKey}
          className="w-full bg-success-gradient text-black font-orbitron font-bold text-lg py-4 rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            'Creating...'
          ) : (
            <>
              <Plus className="w-5 h-5" />
              CREATE MARKET
            </>
          )}
        </motion.button>

        {!publicKey && (
          <p className="text-center text-sm text-gray-400">
            Connect your wallet to create markets
          </p>
        )}

        {/* Info */}
        <div className="glass-panel rounded-xl p-4 border border-neon-cyan/30">
          <p className="text-sm text-gray-400">
            <span className="text-neon-cyan font-semibold">Creation Fee:</span> 0.01 SOL
            <br />
            <span className="text-neon-cyan font-semibold">Creator Earnings:</span> 2% of all bets
          </p>
        </div>
      </motion.div>
    </div>
  );
}

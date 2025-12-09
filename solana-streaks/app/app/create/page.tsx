"use client";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Keypair } from '@solana/web3.js';
import { toast } from 'sonner';
import { useProgram, BN } from '../hooks/useProgram';
import { motion } from 'framer-motion';
import { Calendar, Plus, TrendingUp, Loader2 } from 'lucide-react';

export default function CreateMarketPage() {
  const { publicKey } = useWallet();
  const { program, getPDAs } = useProgram();

  const [question, setQuestion] = useState('');
  const [outcomes, setOutcomes] = useState(['YES', 'NO']);
  const [resolutionDate, setResolutionDate] = useState('');
  const [category, setCategory] = useState('Crypto');
  const [creating, setCreating] = useState(false);

  const handleCreateMarket = async () => {
    if (!publicKey || !program) {
      toast.error('Please connect your wallet first!');
      return;
    }

    // Check balance
    const balance = await program.provider.connection.getBalance(publicKey);
    const balanceInSOL = balance / 1000000000;

    if (balanceInSOL === 0) {
      toast.error('Insufficient balance - You have 0 SOL', {
        description: 'Get test SOL from the airdrop button in the navbar',
        duration: 5000,
      });
      return;
    }

    if (balanceInSOL < 0.01) {
      toast.error(`Low balance - You have ${balanceInSOL.toFixed(4)} SOL`, {
        description: 'You may not have enough SOL for transaction fees',
        duration: 5000,
      });
    }

    if (!question.trim()) {
      toast.error('Please enter a market question');
      return;
    }

    if (!resolutionDate) {
      toast.error('Please select a resolution date');
      return;
    }

    const resolutionTime = new Date(resolutionDate).getTime() / 1000;
    if (resolutionTime <= Date.now() / 1000) {
      toast.error('Resolution date must be in the future');
      return;
    }

    setCreating(true);
    const toastId = toast.loading('Creating market on-chain...');

    try {
      // Generate unique market ID
      const marketId = `market-${Date.now()}`;
      const [marketPDA] = getPDAs.getMarketPDA(publicKey, marketId);

      // Call smart contract
      const tx = await program.methods
        .initializeMarket(
          question,
          outcomes,
          new BN(resolutionTime),
          null // No oracle for now
        )
        .accounts({
          market: marketPDA,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast.success('Market created successfully!', {
        id: toastId,
        description: 'Your market is now live on Solana',
        action: {
          label: 'View',
          onClick: () => window.open(
            `https://solscan.io/tx/${tx}?cluster=devnet`,
            '_blank'
          ),
        },
        duration: 10000,
      });

      // Reset form
      setQuestion('');
      setOutcomes(['YES', 'NO']);
      setResolutionDate('');

    } catch (error: any) {
      console.error('Market creation error:', error);

      let errorMessage = 'Failed to create market';
      if (error.message?.includes('insufficient')) {
        errorMessage = 'Insufficient SOL balance';
      } else if (error.message?.includes('rejected')) {
        errorMessage = 'Transaction rejected';
      }

      toast.error(errorMessage, {
        id: toastId,
        description: error.message || 'Please try again',
      });
    } finally {
      setCreating(false);
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
            Market Question *
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Will Bitcoin reach $100,000 by end of 2024?"
            disabled={creating}
            maxLength={200}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors disabled:opacity-50"
          />
          <p className="text-xs text-gray-500 mt-1">{question.length}/200 characters</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-3">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={creating}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors disabled:opacity-50"
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
            Resolution Date *
          </label>
          <input
            type="datetime-local"
            value={resolutionDate}
            onChange={(e) => setResolutionDate(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            disabled={creating}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors disabled:opacity-50"
          />
          <p className="text-xs text-gray-500 mt-1">When should this market be resolved?</p>
        </div>

        {/* Outcomes */}
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-3">
            Outcomes *
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
                disabled={creating}
                maxLength={20}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors disabled:opacity-50"
              />
            ))}
          </div>
        </div>

        {/* Create Button */}
        <motion.button
          whileHover={{ scale: creating ? 1 : 1.02 }}
          whileTap={{ scale: creating ? 1 : 0.98 }}
          onClick={handleCreateMarket}
          disabled={creating || !publicKey}
          className="w-full bg-success-gradient text-black font-orbitron font-bold text-lg py-4 rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {creating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating on Solana...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              CREATE MARKET ON-CHAIN
            </>
          )}
        </motion.button>

        {!publicKey && (
          <p className="text-center text-sm text-gray-400">
            Connect your wallet to create markets
          </p>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-xl p-4 border border-neon-cyan/30">
            <p className="text-sm text-gray-400">
              <span className="text-neon-cyan font-semibold">Creation Fee:</span> ~0.01 SOL
              <br />
              <span className="text-xs">Covers rent for market account</span>
            </p>
          </div>
          <div className="glass-panel rounded-xl p-4 border border-neon-green/30">
            <p className="text-sm text-gray-400">
              <span className="text-neon-green font-semibold">Creator Earnings:</span> 2% of all bets
              <br />
              <span className="text-xs">Automatic distribution on resolution</span>
            </p>
          </div>
        </div>

        {/* On-Chain Indicator */}
        <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-xl">
          <p className="text-xs text-gray-300 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
            </span>
            Market will be stored permanently on Solana blockchain
          </p>
        </div>
      </motion.div>
    </div>
  );
}

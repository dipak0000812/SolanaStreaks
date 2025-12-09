"use client";

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';
import { useBlockchain } from '../hooks/useBlockchain';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Shield, Trophy, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const { sendTransaction, getBalance, loading } = useBlockchain();
  const [balance, setBalance] = useState(0);
  const [hasInsurance, setHasInsurance] = useState(false);

  useEffect(() => {
    if (publicKey) {
      getBalance().then(setBalance);
    }
  }, [publicKey, getBalance]);

  const handlePurchaseInsurance = async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first!');
      return;
    }

    if (balance < 0.1) {
      toast.error('Insufficient balance', {
        description: 'You need at least 0.1 SOL',
      });
      return;
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ'),
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendTransaction(
      transaction,
      'Purchasing streak insurance'
    );

    if (signature) {
      setHasInsurance(true);
      const newBalance = await getBalance();
      setBalance(newBalance);

      toast.success('Insurance activated!', {
        description: 'Your streak is now protected for 24 hours',
      });
    }
  };

  // Mock data (will be fetched from blockchain)
  const stats = {
    currentStreak: 7,
    longestStreak: 15,
    totalBets: 23,
    totalWinnings: 4.56,
    winRate: 73.9,
    rank: 47,
  };

  const recentBets = [
    { id: 1, market: 'SOL $300', prediction: 'YES', amount: 0.5, status: 'won', payout: 0.75, time: '2h ago' },
    { id: 2, market: 'BTC $100K', prediction: 'NO', amount: 0.3, status: 'won', payout: 0.45, time: '5h ago' },
    { id: 3, market: 'ETH $5000', prediction: 'YES', amount: 0.4, status: 'active', payout: 0, time: '1d ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-orbitron font-black text-5xl md:text-6xl text-white mb-3">
          Dashboard
        </h1>
        <p className="text-xl text-gray-400">
          Track your performance and manage your streaks
        </p>
      </div>

      {/* Wallet Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-neon-cyan/30 p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400 font-semibold">Wallet Balance</span>
          <div className="text-right">
            <p className="text-4xl font-orbitron font-bold text-neon-cyan">
              {balance.toFixed(3)} SOL
            </p>
            {publicKey && (
              <a
                href={`https://solscan.io/account/${publicKey.toBase58()}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-neon-cyan flex items-center gap-1 justify-end mt-1"
              >
                View on Solscan <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl border border-neon-orange/30 p-6"
        >
          <Flame className="w-8 h-8 text-neon-orange mb-3" />
          <p className="text-3xl font-orbitron font-bold text-white">{stats.currentStreak}</p>
          <p className="text-sm text-gray-400">Current Streak</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl border border-neon-green/30 p-6"
        >
          <TrendingUp className="w-8 h-8 text-neon-green mb-3" />
          <p className="text-3xl font-orbitron font-bold text-white">{stats.winRate}%</p>
          <p className="text-sm text-gray-400">Win Rate</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl border border-neon-cyan/30 p-6"
        >
          <Trophy className="w-8 h-8 text-neon-cyan mb-3" />
          <p className="text-3xl font-orbitron font-bold text-white">#{stats.rank}</p>
          <p className="text-sm text-gray-400">Global Rank</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-2xl border border-neon-gold/30 p-6"
        >
          <p className="text-3xl font-orbitron font-bold text-neon-gold">{stats.totalWinnings}</p>
          <p className="text-sm text-gray-400">Total Winnings (SOL)</p>
        </motion.div>
      </div>

      {/* Streak Insurance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel rounded-3xl border border-neon-purple/30 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-neon-purple" />
            <div>
              <h3 className="font-orbitron font-bold text-xl text-white">Streak Insurance</h3>
              <p className="text-sm text-gray-400">Protect your streak for 0.1 SOL</p>
            </div>
          </div>
          {hasInsurance ? (
            <div className="px-4 py-2 bg-neon-green/20 border border-neon-green/30 rounded-lg">
              <p className="text-neon-green font-semibold">Active</p>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePurchaseInsurance}
              disabled={loading}
              className="px-6 py-3 bg-neon-purple text-white font-orbitron font-bold rounded-xl hover:shadow-lg hover:shadow-neon-purple/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Purchase'}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Recent Bets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel rounded-3xl border border-white/10 p-6"
      >
        <h3 className="font-orbitron font-bold text-2xl text-white mb-6">Recent Bets</h3>
        <div className="space-y-3">
          {recentBets.map((bet) => (
            <div
              key={bet.id}
              className="flex items-center justify-between p-4 glass-panel rounded-xl border border-white/5"
            >
              <div>
                <p className="font-semibold text-white">{bet.market}</p>
                <p className="text-sm text-gray-400">{bet.time}</p>
              </div>
              <div className="text-right">
                <p className={`font-orbitron font-bold ${bet.status === 'won' ? 'text-neon-green' :
                    bet.status === 'lost' ? 'text-neon-pink' : 'text-gray-400'
                  }`}>
                  {bet.status === 'won' ? `+${bet.payout} SOL` :
                    bet.status === 'lost' ? `-${bet.amount} SOL` : 'Pending'}
                </p>
                <p className="text-xs text-gray-400">{bet.prediction}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

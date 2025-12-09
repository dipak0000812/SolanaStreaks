"use client";

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Shield, Trophy, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useBlockchain } from '../hooks/useBlockchain';
import { useUserProfile } from '../hooks/useUserProfile';
import ClaimWinnings from '../components/ClaimWinnings';

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const { getBalance, requestAirdrop } = useBlockchain();
  const { profile, loading: profileLoading, refetch: refetchProfile, level, multiplier } = useUserProfile();

  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (publicKey) {
      loadData();
    }
  }, [publicKey]);

  const loadData = async () => {
    if (!publicKey) return;
    const bal = await getBalance();
    setBalance(bal);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([loadData(), refetchProfile()]);
      toast.success('Data refreshed from blockchain');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const stats = {
    currentStreak: profile?.currentStreak || 0,
    longestStreak: profile?.longestStreak || 0,
    totalBets: profile?.totalBets || 0,
    totalWins: profile?.totalWins || 0,
    winRate: profile && profile.totalBets > 0
      ? ((profile.totalWins / profile.totalBets) * 100).toFixed(1)
      : '0.0',
    level: level,
    totalXp: profile?.totalXp || 0,
  };

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-3xl border border-neon-purple/30 p-8 text-center max-w-md"
        >
          <Shield className="w-16 h-16 text-neon-purple mx-auto mb-4" />
          <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-gray-400">
            Connect your Solana wallet to view your dashboard
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-orbitron font-black text-5xl md:text-6xl text-white mb-3">
            Dashboard
          </h1>
          <p className="text-xl text-gray-400">Real-time data from Solana blockchain</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-3 glass-panel rounded-xl border border-white/10 hover:border-neon-cyan/50 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 text-neon-cyan ${refreshing ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {/* Balance */}
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
            <a
              href={`https://solscan.io/account/${publicKey.toBase58()}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-neon-cyan flex items-center gap-1 justify-end mt-1"
            >
              View on Solscan <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Flame} value={stats.currentStreak} label="Current Streak" loading={profileLoading} />
        <StatCard icon={TrendingUp} value={`${stats.winRate}%`} label="Win Rate" loading={profileLoading} />
        <StatCard icon={Trophy} value={stats.longestStreak} label="Longest Streak" loading={profileLoading} />
        <StatCard icon={Shield} value={`Level ${stats.level}`} label={`${stats.totalXp} XP`} loading={profileLoading} />
      </div>

      {/* Claim Winnings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-orbitron font-bold text-2xl text-white mb-4">Your Winnings</h3>
        <ClaimWinnings />
      </motion.div>

      {/* Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel rounded-3xl border border-white/10 p-6"
      >
        <h3 className="font-orbitron font-bold text-2xl text-white mb-6">Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Total Bets</p>
            <p className="text-3xl font-orbitron font-bold text-white">{stats.totalBets}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Total Wins</p>
            <p className="text-3xl font-orbitron font-bold text-neon-green">{stats.totalWins}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Current Multiplier</p>
            <p className="text-3xl font-orbitron font-bold text-neon-orange">{multiplier}x</p>
          </div>
        </div>
      </motion.div>

      {/* On-Chain Indicator */}
      <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
        <p className="text-xs text-gray-300 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
          </span>
          All data fetched from Solana blockchain - Click refresh to update
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, loading }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl border border-white/20 p-6"
    >
      <Icon className="w-8 h-8 text-neon-cyan mb-3" />
      {loading ? (
        <div className="h-10 w-24 bg-white/5 animate-pulse rounded mb-2" />
      ) : (
        <p className="text-3xl font-orbitron font-bold text-white">{value}</p>
      )}
      <p className="text-sm text-gray-400">{label}</p>
    </motion.div>
  );
}

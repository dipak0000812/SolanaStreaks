"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Flame, Award, Crown } from "lucide-react";

const LEADERBOARD_DATA = [
  { rank: 1, address: "7xKX...9mPq", streak: 24, winnings: 156.8, winRate: 89, avatar: "👑" },
  { rank: 2, address: "3nQw...4kLp", streak: 21, winnings: 142.3, winRate: 85, avatar: "🥈" },
  { rank: 3, address: "9vRt...2hNm", streak: 19, winnings: 128.5, winRate: 82, avatar: "🥉" },
  { rank: 4, address: "5mKp...7wQx", streak: 17, winnings: 98.2, winRate: 78, avatar: "🔥" },
  { rank: 5, address: "2hLn...3pRt", streak: 15, winnings: 87.6, winRate: 76, avatar: "⚡" },
  { rank: 6, address: "8qWm...5nKj", streak: 14, winnings: 76.4, winRate: 74, avatar: "💎" },
  { rank: 7, address: "4tYp...9mLk", streak: 13, winnings: 68.9, winRate: 72, avatar: "🎯" },
  { rank: 8, address: "6nRq...2hPm", streak: 12, winnings: 62.1, winRate: 70, avatar: "🚀" },
  { rank: 9, address: "1wKm...8vNp", streak: 11, winnings: 54.7, winRate: 68, avatar: "⭐" },
  { rank: 10, address: "9pLt...4mQr", streak: 10, winnings: 48.3, winRate: 66, avatar: "💫" },
];

export default function LeaderboardPage() {
  const topThree = LEADERBOARD_DATA.slice(0, 3);
  const restOfLeaders = LEADERBOARD_DATA.slice(3);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-neon-gold/30 mb-6"
        >
          <Crown className="w-5 h-5 text-neon-gold" />
          <span className="font-orbitron font-semibold text-neon-gold uppercase tracking-wider text-sm">
            Hall of Fame
          </span>
        </motion.div>

        <h1 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-4">
          Leaderboard
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          The elite traders who <span className="neon-text-green">dominate the markets</span> and build legendary streaks.
        </p>
      </div>

      {/* Podium - Top 3 */}
      <div className="relative max-w-5xl mx-auto">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-gold/20 via-neon-green/20 to-neon-purple/20 blur-3xl -z-10" />

        <div className="grid grid-cols-3 gap-4 items-end">
          {/* 2nd Place */}
          <PodiumCard player={topThree[1]} position={2} />

          {/* 1st Place */}
          <PodiumCard player={topThree[0]} position={1} />

          {/* 3rd Place */}
          <PodiumCard player={topThree[2]} position={3} />
        </div>
      </div>

      {/* Rest of Leaderboard */}
      <div className="max-w-5xl mx-auto">
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/10 bg-white/5">
            <div className="font-orbitron font-semibold text-sm text-gray-400 uppercase tracking-wider">
              Rank
            </div>
            <div className="font-orbitron font-semibold text-sm text-gray-400 uppercase tracking-wider">
              Trader
            </div>
            <div className="font-orbitron font-semibold text-sm text-gray-400 uppercase tracking-wider text-right">
              Streak
            </div>
            <div className="font-orbitron font-semibold text-sm text-gray-400 uppercase tracking-wider text-right">
              Winnings
            </div>
            <div className="font-orbitron font-semibold text-sm text-gray-400 uppercase tracking-wider text-right">
              Win Rate
            </div>
          </div>

          {/* Table Rows */}
          {restOfLeaders.map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="grid grid-cols-5 gap-4 p-6 border-b border-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-bold text-xl text-gray-400">
                  #{player.rank}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">{player.avatar}</span>
                <span className="font-mono text-white">{player.address}</span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Flame className="w-4 h-4 text-neon-orange" />
                <span className="font-orbitron font-bold text-lg text-white">
                  {player.streak}
                </span>
              </div>

              <div className="flex items-center justify-end">
                <span className="font-orbitron font-bold text-lg neon-text-green">
                  {player.winnings} SOL
                </span>
              </div>

              <div className="flex items-center justify-end">
                <span className="font-orbitron font-bold text-lg text-white">
                  {player.winRate}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Your Rank CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center glass-panel rounded-2xl p-12 border-2 border-neon-green/30"
      >
        <Trophy className="w-16 h-16 text-neon-green mx-auto mb-4" />
        <h3 className="font-orbitron font-bold text-3xl text-white mb-3">
          Your Rank: <span className="neon-text-green">#42</span>
        </h3>
        <p className="text-gray-400 mb-6">
          Build your streak to climb the leaderboard and earn legendary status.
        </p>
        <Link href="/markets">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl bg-success-gradient font-orbitron font-bold text-lg text-black shadow-lg shadow-neon-green/50"
          >
            START TRADING
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

function PodiumCard({ player, position }: { player: typeof LEADERBOARD_DATA[0]; position: number }) {
  const heights = {
    1: "h-80",
    2: "h-64",
    3: "h-56"
  };

  const colors = {
    1: "from-neon-gold to-neon-orange",
    2: "from-gray-300 to-gray-400",
    3: "from-neon-orange to-neon-pink"
  };

  const glows = {
    1: "shadow-neon-gold",
    2: "shadow-white/30",
    3: "shadow-neon-orange"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.2 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className={`relative ${heights[position as keyof typeof heights]}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[position as keyof typeof colors]} opacity-20 blur-2xl -z-10`} />

      <div className={`h-full glass-panel rounded-2xl border-2 ${position === 1 ? 'border-neon-gold' : 'border-white/20'} p-6 flex flex-col items-center justify-between ${glows[position as keyof typeof glows]}`}>
        {/* Crown/Medal */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-6xl mb-4"
        >
          {player.avatar}
        </motion.div>

        {/* Rank */}
        <div className={`text-7xl font-orbitron font-black bg-gradient-to-br ${colors[position as keyof typeof colors]} bg-clip-text text-transparent`}>
          #{position}
        </div>

        {/* Address */}
        <div className="text-center space-y-2">
          <p className="font-mono text-white font-bold">{player.address}</p>
        </div>

        {/* Stats */}
        <div className="w-full space-y-3 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Streak</span>
            <span className="font-orbitron font-bold text-white flex items-center gap-1">
              <Flame className="w-4 h-4 text-neon-orange" />
              {player.streak}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Winnings</span>
            <span className="font-orbitron font-bold neon-text-green">
              {player.winnings} SOL
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Win Rate</span>
            <span className="font-orbitron font-bold text-white">
              {player.winRate}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

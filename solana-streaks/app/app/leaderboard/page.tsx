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

function PodiumCard({ player, position }: { player: any; position: number }) {
  const heights = { 1: "h-64 md:h-80", 2: "h-48 md:h-64", 3: "h-40 md:h-56" };
  const colors = {
    1: "from-neon-gold/30 to-neon-gold/10 border-neon-gold/50",
    2: "from-gray-400/30 to-gray-400/10 border-gray-400/50",
    3: "from-neon-orange/30 to-neon-orange/10 border-neon-orange/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.2 }}
      className={`relative ${heights[position as keyof typeof heights]}`}
    >
      <div
        className={`h-full glass-panel rounded-2xl border-2 bg-gradient-to-b ${colors[position as keyof typeof colors]
          } p-3 md:p-6 flex flex-col items-center justify-between`}
      >
        {/* Crown for 1st place */}
        {position === 1 && (
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-8 md:-top-12 text-4xl md:text-6xl"
          >
            👑
          </motion.div>
        )}

        {/* Rank Badge */}
        <div className="text-center">
          <div className="text-4xl md:text-6xl mb-2">{player.avatar}</div>
          <div
            className={`text-4xl md:text-6xl font-orbitron font-black ${position === 1 ? "text-neon-gold" : position === 2 ? "text-gray-300" : "text-neon-orange"
              }`}
          >
            #{position}
          </div>
        </div>

        {/* Player Info */}
        <div className="text-center space-y-1 md:space-y-2 w-full">
          <div className="font-mono text-xs md:text-sm text-gray-300 truncate px-2">{player.address}</div>
          <div className="flex items-center justify-center gap-1">
            <Flame className="w-3 h-3 md:w-4 md:h-4 text-neon-orange" />
            <span className="font-orbitron font-bold text-sm md:text-lg text-white">{player.streak}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full space-y-1">
          <div className="text-center">
            <div className="text-xs md:text-sm text-gray-400">Winnings</div>
            <div className="font-orbitron font-bold text-sm md:text-xl text-neon-green">
              {player.winnings.toFixed(1)} SOL
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs md:text-sm text-gray-400">Win Rate</div>
            <div className="font-orbitron font-bold text-sm md:text-lg text-white">{player.winRate}%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const topThree = LEADERBOARD_DATA.slice(0, 3);
  const restOfLeaders = LEADERBOARD_DATA.slice(3);

  return (
    <div className="space-y-8 md:space-y-12 pb-24 md:pb-8">
      {/* Header */}
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-panel border border-neon-gold/30 mb-4 md:mb-6"
        >
          <Crown className="w-4 h-4 md:w-5 md:h-5 text-neon-gold" />
          <span className="font-orbitron font-semibold text-neon-gold uppercase tracking-wider text-xs md:text-sm">
            Hall of Fame
          </span>
        </motion.div>

        <h1 className="font-orbitron font-black text-4xl md:text-5xl lg:text-7xl text-white mb-3 md:mb-4">
          Leaderboard
        </h1>
        <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
          The elite traders who <span className="neon-text-green">dominate the markets</span> and build legendary streaks.
        </p>
      </div>

      {/* Podium - Top 3 */}
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-gold/20 via-neon-green/20 to-neon-purple/20 blur-3xl -z-10" />

        <div className="grid grid-cols-3 gap-2 md:gap-4 items-end">
          {/* 2nd Place */}
          <PodiumCard player={topThree[1]} position={2} />

          {/* 1st Place */}
          <PodiumCard player={topThree[0]} position={1} />

          {/* 3rd Place */}
          <PodiumCard player={topThree[2]} position={3} />
        </div>
      </div>

      {/* Rest of Leaderboard */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-5 gap-4 p-6 border-b border-white/10 bg-white/5">
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
              className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 p-3 md:p-6 border-b border-white/5 transition-colors items-center"
            >
              {/* Rank + Avatar */}
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-bold text-lg md:text-xl text-gray-400">
                  #{player.rank}
                </span>
                <span className="text-xl md:text-2xl">{player.avatar}</span>
              </div>

              {/* Trader Address */}
              <div className="font-mono text-xs md:text-sm text-white truncate">
                {player.address}
              </div>

              {/* Streak */}
              <div className="flex items-center justify-end gap-1">
                <Flame className="w-3 h-3 md:w-4 md:h-4 text-neon-orange" />
                <span className="font-orbitron font-bold text-sm md:text-base text-white">{player.streak}</span>
              </div>

              {/* Winnings */}
              <div className="text-right">
                <div className="font-orbitron font-bold text-xs md:text-base text-neon-green">
                  {player.winnings.toFixed(1)}
                </div>
                <div className="text-[10px] md:text-xs text-gray-400">SOL</div>
              </div>

              {/* Win Rate - Hidden on mobile */}
              <div className="hidden md:block text-right">
                <div className="font-orbitron font-bold text-base text-white">{player.winRate}%</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 text-center"
        >
          <Link href="/markets">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-3 md:py-4 bg-success-gradient text-black font-orbitron font-bold rounded-xl shadow-lg shadow-neon-green/50 hover:shadow-neon-green/70 transition-all text-sm md:text-base"
            >
              START TRADING
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

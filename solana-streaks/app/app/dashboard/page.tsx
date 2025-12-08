"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Shield, TrendingUp, Trophy, Lock, Flame, Zap, Target, Award } from "lucide-react";
import { playSolana, Achievement } from "../../lib/playSolana";
import { cn } from "@/lib/utils";
import { MOCK_USER } from "../../lib/mockData";
import StreakInsurance from "../components/StreakInsurance";
import DailyChallenges from "../components/DailyChallenges";
import PredictionAnalytics from "../components/PredictionAnalytics";
import SharePrediction from "../components/SharePrediction";

export default function DashboardPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStreak, setUserStreak] = useState(MOCK_USER.streak);

  useEffect(() => {
    setAchievements(playSolana.getAchievements());
  }, []);

  const currentMultiplier = userStreak >= 10 ? 3.0 : userStreak >= 5 ? 2.0 : userStreak >= 3 ? 1.5 : 1.0;
  const nextLevel = userStreak >= 10 ? 15 : userStreak >= 5 ? 10 : userStreak >= 3 ? 5 : 3;
  const nextMultiplier = userStreak >= 10 ? 3.5 : userStreak >= 5 ? 3.0 : userStreak >= 3 ? 2.0 : 1.5;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-orbitron font-black text-5xl md:text-6xl text-white mb-3">
            Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Manage your streaks. <span className="neon-text-green">Track your dominance</span>.
          </p>
        </div>

        {/* Share Your Stats */}
        <SharePrediction
          userStreak={userStreak}
          multiplier={currentMultiplier}
          type="streak"
        />
      </div>

      {/* Streak Counter - Hero Element */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-radial from-neon-pink/30 via-neon-orange/20 to-transparent blur-3xl -z-10" />

        <div className="glass-panel rounded-3xl border-2 border-neon-pink/30 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-neon-orange/5 to-neon-gold/10" />

          <div className="relative z-10">
            <div className="relative inline-block mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="text-9xl filter drop-shadow-2xl"
              >
                🔥
              </motion.div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-orbitron font-semibold text-neon-pink uppercase tracking-wider mb-2">
                  CURRENT STREAK
                </p>
                <h2 className="font-orbitron font-black text-8xl md:text-9xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  {userStreak}
                </h2>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-orbitron font-bold neon-text-green">{currentMultiplier}x</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Current</p>
                </div>
                <div className="h-16 w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-orbitron font-bold text-neon-purple">{nextMultiplier}x</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Next Level</p>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{userStreak} correct</span>
                  <span className="text-gray-400">{nextLevel} needed</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(userStreak / nextLevel) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-streak-fire rounded-full shadow-neon-pink"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Total Winnings"
          value={`${MOCK_USER.totalWinnings.toFixed(2)} SOL`}
          change="+12.3%"
          color="neon-green"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Win Rate"
          value={`${MOCK_USER.winRate}%`}
          change="+5.2%"
          color="neon-cyan"
        />
        <StatCard
          icon={<Trophy className="w-6 h-6" />}
          label="Achievements"
          value={MOCK_USER.achievements.length.toString()}
          change="New!"
          color="neon-purple"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Global Rank"
          value={`#${MOCK_USER.rank}`}
          change="↑ 5"
          color="neon-gold"
        />
      </div>

      {/* Monetization Features Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakInsurance
          userStreak={userStreak}
          currentMultiplier={currentMultiplier >= 2 ? "2.0x" : currentMultiplier >= 1.5 ? "1.5x" : "1.0x"}
          nextStreak={userStreak >= 10 ? 15 : userStreak >= 5 ? 10 : 5}
          onPurchase={() => {
            const confirm = window.confirm("Purchase Streak Insurance for 0.1 SOL? This will protect your active streak.");
            if (confirm) {
              alert("Insurance purchased! Your streak is now protected.");
            }
          }}
        />

        <div className="glass-panel rounded-2xl border border-white/10 p-6">
          <h3 className="font-orbitron font-bold text-xl text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {MOCK_USER.recentBets.slice(0, 4).map((bet, index) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 glass-panel rounded-lg"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{bet.market}</p>
                  <p className="text-xs text-gray-400">{bet.time}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${bet.status === 'won' ? 'text-neon-green' : 'text-gray-400'}`}>
                    {bet.status === 'won' ? `+${bet.payout.toFixed(2)}` : bet.amount.toFixed(2)} SOL
                  </p>
                  <p className="text-xs text-gray-400">{bet.prediction}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <PredictionAnalytics />

      {/* Daily Challenges */}
      <DailyChallenges />

      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-orbitron font-bold text-3xl text-white">
            Your Achievements
          </h3>
          <span className="text-sm text-gray-400">
            Powered by <span className="text-neon-purple font-semibold">Play Solana SDK</span>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.05, y: -4 }}
              className={cn(
                "relative aspect-square rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-help transition-all border-2",
                achievement.completed
                  ? "glass-panel border-neon-purple/50 hover:border-neon-purple"
                  : "bg-black/20 border-white/5 opacity-50"
              )}
              title={achievement.description}
            >
              {achievement.completed && (
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-2xl" />
              )}

              <div className="relative z-10 space-y-2">
                {achievement.completed ? (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Trophy className="w-10 h-10 text-neon-purple mx-auto" />
                  </motion.div>
                ) : (
                  <Lock className="w-10 h-10 text-gray-600 mx-auto" />
                )}
                <div>
                  <p className={cn(
                    "text-sm font-orbitron font-bold",
                    achievement.completed ? "text-neon-purple" : "text-gray-500"
                  )}>
                    {achievement.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    +{achievement.xpReward} XP
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  color: string;
}) {
  const colorClasses = {
    "neon-green": "text-neon-green border-neon-green/30",
    "neon-cyan": "text-neon-cyan border-neon-cyan/30",
    "neon-purple": "text-neon-purple border-neon-purple/30",
    "neon-gold": "text-neon-gold border-neon-gold/30"
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn("glass-panel rounded-2xl p-6 border-2 transition-all", colorClasses[color as keyof typeof colorClasses])}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
        <div className={colorClasses[color as keyof typeof colorClasses].split(' ')[0]}>
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-orbitron font-bold text-3xl text-white">
          {value}
        </p>
        <p className="text-xs text-gray-400">{change}</p>
      </div>
    </motion.div>
  );
}

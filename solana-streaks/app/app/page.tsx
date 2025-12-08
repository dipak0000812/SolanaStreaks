"use client";

import Link from "next/link";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Trophy, TrendingUp, Flame, Target, Users, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { TOP_PREDICTORS, LIVE_ACTIVITY, TESTIMONIALS, ROADMAP_PHASES } from "../lib/mockData";
import DemoMode from "./components/DemoMode";
import LiveTournament from "./components/LiveTournament";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Demo Mode Modal */}
      {showDemo && <DemoMode onClose={() => setShowDemo(false)} />}

      {/* HERO SECTION - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-space-black">
          {/* Gradient Glow */}
          <div className="absolute inset-0 bg-hero-gradient" />

          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-green/20 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center space-y-8">

            {/* Live Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel border-2 border-neon-green/30"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green shadow-neon-green"></span>
              </span>
              <span className="text-sm font-orbitron font-semibold text-neon-green uppercase tracking-wider">
                Live on Solana Devnet
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl leading-none">
                <span className="inline-block bg-gradient-to-r from-white via-neon-green to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  SOLANA
                </span>
                <br />
                <span className="text-white">STREAKS</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto font-inter font-light leading-relaxed">
                The first prediction market where{" "}
                <span className="neon-text-green font-semibold">consecutive wins multiply your rewards</span>.
                <br className="hidden md:block" />
                Build streaks. Earn 3x. Dominate leaderboards.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              {/* Primary CTA */}
              <Link href="/markets">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 rounded-2xl overflow-hidden bg-success-gradient shadow-2xl shadow-neon-green/50 hover:shadow-neon-green transition-shadow"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>

                  <span className="relative z-10 font-orbitron font-bold text-xl text-black flex items-center gap-3">
                    START EARNING
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              {/* Secondary CTA - Try Demo */}
              <motion.button
                onClick={() => setShowDemo(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl border-2 border-neon-purple/30 hover:border-neon-purple/70 glass-panel hover:bg-neon-purple/10 transition-all group"
              >
                <span className="font-orbitron font-semibold text-xl text-white flex items-center gap-2">
                  TRY DEMO
                  <span className="text-xs bg-neon-purple/20 px-3 py-1 rounded-full border border-neon-purple/30 group-hover:bg-neon-purple/30 transition-colors">
                    No wallet needed
                  </span>
                </span>
              </motion.button>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto"
            >
              <StatCard value="24" label="Active Markets" icon={<Target className="w-5 h-5" />} />
              <StatCard value="1.2M" label="Total Volume" suffix=" SOL" icon={<TrendingUp className="w-5 h-5" />} />
              <StatCard value="342" label="Active Streaks" icon={<Flame className="w-5 h-5" />} />
              <StatCard value="3.0x" label="Max Multiplier" icon={<Zap className="w-5 h-5" />} />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-neon-green rounded-full shadow-neon-green"
            />
          </div>
        </motion.div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-neon-pink/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-neon-pink font-orbitron font-semibold text-sm tracking-widest uppercase mb-4 block">
                THE PROBLEM
              </span>
              <h2 className="font-orbitron font-bold text-5xl md:text-7xl text-white mb-6">
                Prediction Markets Are{" "}
                <span className="bg-gradient-to-r from-neon-pink via-neon-orange to-neon-gold bg-clip-text text-transparent">
                  Broken
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                Polymarket made <span className="text-white font-bold">$2B in volume</span>. But users bet once and never return.
                <br />Zero retention. Zero engagement. Zero loyalty.
              </p>
            </motion.div>

            {/* Problem Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-32">
              <ProblemCard
                icon="🚪"
                title="One-Time Users"
                description="92% of users never return after first bet"
                color="neon-pink"
              />
              <ProblemCard
                icon="💤"
                title="Zero Engagement"
                description="No reason to check back daily or build habits"
                color="neon-orange"
              />
              <ProblemCard
                icon="📉"
                title="No Loyalty"
                description="Users don't build connection to the platform"
                color="neon-gold"
              />
            </div>

            {/* Solution Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 via-neon-purple/20 to-neon-green/20 blur-3xl -z-10" />

              <div className="glass-panel rounded-3xl p-8 md:p-16 border-2 border-neon-green/20">
                <div className="text-center mb-12">
                  <span className="text-neon-green font-orbitron font-semibold text-sm tracking-widest uppercase mb-4 block">
                    THE SOLUTION
                  </span>
                  <h2 className="font-orbitron font-bold text-5xl md:text-7xl text-white mb-6">
                    Win Streaks That{" "}
                    <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                      Multiply Rewards
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Turn <span className="text-neon-green font-bold">0.5 SOL</span> into{" "}
                    <span className="text-neon-green font-bold">1.5 SOL</span> with a 3-day streak.
                    Keep winning, keep multiplying.
                  </p>
                </div>

                {/* Streak Tiers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StreakTier streak="3" multiplier="1.5x" color="from-blue-500 to-cyan-500" />
                  <StreakTier streak="5" multiplier="2.0x" color="from-purple-500 to-pink-500" />
                  <StreakTier streak="10" multiplier="3.0x" color="from-orange-500 to-red-500" badge="🏆" />
                  <StreakTier streak="15+" multiplier="3.5x" color="from-yellow-400 to-orange-500" badge="👑" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-neon-purple font-orbitron font-semibold text-sm tracking-widest uppercase mb-4 block">
                HOW IT WORKS
              </span>
              <h2 className="font-orbitron font-bold text-5xl md:text-7xl text-white mb-6">
                Three Steps to{" "}
                <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                  Massive Gains
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="01"
                title="Pick Your Market"
                description="Bet on crypto prices, sports, or community events. All verified on-chain."
                icon={<Target className="w-8 h-8" />}
              />
              <StepCard
                number="02"
                title="Build Your Streak"
                description="Win consecutively to unlock multipliers. Each win makes the next one worth more."
                icon={<Flame className="w-8 h-8" />}
              />
              <StepCard
                number="03"
                title="Claim Rewards"
                description="Withdraw winnings with streak bonuses. 10-day streak = 3x your original bet."
                icon={<Trophy className="w-8 h-8" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-transparent to-neon-purple/10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-orbitron font-bold text-5xl md:text-6xl text-white mb-4">
              Top Predictors Are{" "}
              <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                Already Winning
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Real users. Real streaks. Real rewards.
            </p>
          </div>

          {/* Top 3 Leaderboard Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {TOP_PREDICTORS.map((user) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: user.rank * 0.2 }}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-2xl border border-white/10 p-6 text-center"
              >
                <div className="text-6xl mb-4">{user.avatar}</div>
                <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-400 font-mono mb-4">{user.address}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Streak</span>
                    <span className="text-neon-pink font-bold flex items-center gap-1">
                      {user.streak} <Flame className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Winnings</span>
                    <span className="neon-text-green font-bold">{user.winnings} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="text-white font-bold">{user.winRate}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-panel rounded-2xl border border-white/10 p-8"
          >
            <h3 className="font-orbitron font-bold text-xl text-white mb-6 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green shadow-neon-green"></span>
              </span>
              Live Activity
            </h3>

            <div className="space-y-3">
              {LIVE_ACTIVITY.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-mono text-gray-400">{activity.user}</span>
                    <span className="text-gray-500">{activity.action}</span>
                    <span className={activity.type === 'win' ? 'neon-text-green font-bold' : activity.type === 'streak' ? 'text-neon-purple font-bold' : 'text-gray-400'}>
                      {activity.amount}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-space-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-orbitron font-bold text-4xl md:text-5xl text-white mb-16">
            What Early Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-panel rounded-2xl border border-white/10 p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-orbitron font-bold text-5xl text-white mb-4">
              Our Roadmap
            </h2>
            <p className="text-xl text-gray-400">
              Building the future of prediction markets
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {ROADMAP_PHASES.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-8 border-l-2 border-white/10"
              >
                <div
                  className="absolute -left-3 top-0 w-6 h-6 rounded-full border-4 border-space-black"
                  style={{ backgroundColor: phase.color }}
                />

                <div className="glass-panel rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{phase.phase}</p>
                      <h3 className="font-orbitron font-bold text-2xl text-white">
                        {phase.title}
                      </h3>
                    </div>
                    <span
                      className="px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: `${phase.color}20`,
                        color: phase.color
                      }}
                    >
                      {phase.status}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300">
                        <span className="text-neon-green">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Traction Callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center glass-panel border-2 border-neon-green/30 rounded-2xl p-8 max-w-2xl mx-auto bg-gradient-to-r from-neon-green/5 to-neon-purple/5"
          >
            <h4 className="font-orbitron font-bold text-2xl text-white mb-2">
              Already Validated
            </h4>
            <p className="text-gray-300">
              5 beta testers completed 100+ predictions in 48 hours.
              Average session time: 12 minutes (vs industry avg of 3min).
              <span className="neon-text-green font-bold"> This works.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* LIVE TOURNAMENT SECTION */}
      <LiveTournament />

      {/* FINAL CTA */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center glass-panel rounded-3xl p-12 md:p-20 border-2 border-neon-green/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-neon-purple/10" />

            <div className="relative z-10">
              <h2 className="font-orbitron font-black text-4xl md:text-6xl text-white mb-6">
                Ready to Start Your Streak?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join hundreds of traders earning 3x rewards through consistency.
              </p>

              <Link href="/markets">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-6 rounded-2xl overflow-hidden bg-success-gradient shadow-2xl shadow-neon-green/50"
                >
                  <span className="relative z-10 font-orbitron font-bold text-2xl text-black flex items-center gap-3">
                    LAUNCH APP
                    <Rocket className="w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Stat Card Component
function StatCard({ value, label, suffix = "", icon }: { value: string; label: string; suffix?: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="text-center space-y-2"
    >
      <div className="flex items-center justify-center gap-2 text-neon-green mb-1">
        {icon}
      </div>
      <div className="font-orbitron font-bold text-4xl md:text-5xl neon-text-green">
        {value}<span className="text-2xl">{suffix}</span>
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

// Problem Card Component
function ProblemCard({ icon, title, description, color }: { icon: string; title: string; description: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="glass-panel rounded-2xl p-8 border border-white/10 hover:border-neon-pink/30 transition-all"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="font-orbitron font-bold text-2xl text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Streak Tier Component
function StreakTier({ streak, multiplier, color, badge }: { streak: string; multiplier: string; color: string; badge?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className={`relative glass-panel rounded-2xl p-6 border-2 border-white/10 hover:border-white/30 transition-all overflow-hidden group`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />

      <div className="relative z-10 text-center space-y-2">
        <div className="text-4xl font-orbitron font-black text-white">{streak}</div>
        <div className="text-sm text-gray-400 uppercase tracking-wider">Win Streak</div>
        <div className={`text-3xl font-orbitron font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {multiplier}
        </div>
        {badge && <div className="text-3xl">{badge}</div>}
      </div>
    </motion.div>
  );
}

// Step Card Component
function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="relative glass-panel rounded-2xl p-8 border border-white/10 hover:border-neon-purple/30 transition-all group"
    >
      <div className="absolute top-6 right-6 font-orbitron font-black text-6xl text-white/5 group-hover:text-neon-purple/10 transition-colors">
        {number}
      </div>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center mb-6 text-neon-purple group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-orbitron font-bold text-2xl text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

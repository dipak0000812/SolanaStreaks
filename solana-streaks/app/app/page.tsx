"use client";

import Link from "next/link";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import StreakCounter from "./components/StreakCounter";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Trophy, Shield } from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center space-y-24 py-12">

      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-4xl mx-auto relative"
      >
        <motion.div variants={item} className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />

        <motion.div variants={item} className="flex justify-center mb-6">
          <div className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Beta Live on Devnet</span>
          </div>
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
          Turn Predictions <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Into A Game</span>
        </motion.h1>

        <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          The first prediction market that rewards consistency. Build your streak, earn multipliers, and mint exclusive NFT badges.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/markets">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full">
              Start Predicting <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-primary/20 hover:bg-primary/10">
              Watch Demo
            </Button>
          </Link>
        </motion.div>

        {/* Live Stats / Social Proof */}
        <motion.div variants={item} className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <h4 className="text-3xl font-bold font-mono">12.5k</h4>
            <p className="text-sm text-muted-foreground">Active Bets</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-bold font-mono">$2.1M</h4>
            <p className="text-sm text-muted-foreground">Volume</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-bold font-mono">842</h4>
            <p className="text-sm text-muted-foreground">Highest Streak</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-bold font-mono">15k+</h4>
            <p className="text-sm text-muted-foreground">Users</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Feature Explainers */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        <Card className="glass-panel border-0 bg-white/5">
          <CardContent className="p-8 space-y-4 text-left">
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold">Predict Outcomes</h3>
            <p className="text-muted-foreground">Bet on crypto prices, sports matches, and community events with transparent on-chain resolution.</p>
          </CardContent>
        </Card>
        <Card className="glass-panel border-0 bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-50">
            <StreakCounter streak={7} />
          </div>
          <CardContent className="p-8 space-y-4 text-left">
            <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold">Build Your Streak</h3>
            <p className="text-muted-foreground">Win consecutively to increase your streak multiplier. 3 wins = 1.5x rewards. 10 wins = 3x rewards.</p>
          </CardContent>
        </Card>
        <Card className="glass-panel border-0 bg-white/5">
          <CardContent className="p-8 space-y-4 text-left">
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold">Earn & Compete</h3>
            <p className="text-muted-foreground">Climb the global leaderboard, earn NFT badges, and unlock exclusive features as you level up.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

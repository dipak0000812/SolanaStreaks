"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Flame, Trophy, Sparkles } from "lucide-react";

const DEMO_MARKETS = [
  {
    id: 1,
    question: "Will SOL hit $300 by Dec 15th?",
    outcomes: [
      { name: "YES", odds: 67 },
      { name: "NO", odds: 33 }
    ]
  },
  {
    id: 2,
    question: "Will Bitcoin break $100K this week?",
    outcomes: [
      { name: "YES", odds: 45 },
      { name: "NO", odds: 55 }
    ]
  },
  {
    id: 3,
    question: "Will ETH hit $4,000 before Dec 20th?",
    outcomes: [
      { name: "YES", odds: 62 },
      { name: "NO", odds: 38 }
    ]
  }
];

// Confetti Component
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
            y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
            opacity: 1
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 0,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: "easeOut"
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ['#00FF94', '#FF006E', '#8B5CF6'][Math.floor(Math.random() * 3)]
          }}
        />
      ))}
    </div>
  );
}

export default function DemoMode({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [demoBalance, setDemoBalance] = useState(10);
  const [selectedMarket, setSelectedMarket] = useState(DEMO_MARKETS[0]);
  const [selectedOutcome, setSelectedOutcome] = useState("");
  const [betAmount, setBetAmount] = useState(0.5);
  const [demoStreak, setDemoStreak] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [betsPlaced, setBetsPlaced] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, [step]);

  const placeDemoBet = () => {
    // Simulate winning (80% chance for demo)
    const won = Math.random() > 0.2;

    if (won) {
      const multiplier = demoStreak >= 5 ? 2.0 : demoStreak >= 3 ? 1.5 : 1.0;
      const winnings = betAmount * 2 * multiplier; // 2x base + streak multiplier
      setDemoBalance(prev => prev - betAmount + winnings);
      setTotalWinnings(prev => prev + winnings - betAmount);
      setDemoStreak(prev => prev + 1);
      setBetsPlaced(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setStep(4); // Win screen
    } else {
      setDemoBalance(prev => prev - betAmount);
      setDemoStreak(0);
      setBetsPlaced(prev => prev + 1);
      setStep(5); // Loss screen
    }
  };

  return (
    <AnimatePresence>
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel rounded-3xl border-2 border-neon-green/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-panel border border-white/20 hover:border-neon-pink/50 flex items-center justify-center text-gray-400 hover:text-neon-pink transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Demo Balance Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="relative">
              <p className="text-sm text-gray-400 mb-1">Demo Balance</p>
              <p className="font-orbitron font-bold text-3xl neon-text-green">
                {demoBalance.toFixed(2)} SOL
              </p>
              {step === 1 && showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute -right-4 top-0 translate-x-full bg-neon-green/20 border border-neon-green/30 rounded-lg p-2 text-xs text-neon-green whitespace-nowrap"
                >
                  👈 Your play money!
                </motion.div>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-1">Current Streak</p>
              <p className="font-orbitron font-bold text-3xl text-neon-pink flex items-center gap-2">
                {demoStreak} <Flame className="w-6 h-6" />
              </p>
            </div>
          </div>

          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl mb-4"
                >
                  🎮
                </motion.div>
                <h3 className="font-orbitron font-bold text-4xl text-white mb-4">
                  Welcome to Demo Mode!
                </h3>
                <p className="text-xl text-gray-400 mb-6">
                  You have <span className="neon-text-green font-bold">10 SOL</span> to practice with.
                  <br />Make predictions and build streaks!
                </p>
              </div>

              <div className="glass-panel rounded-2xl p-6 bg-neon-purple/5 border border-neon-purple/30">
                <h4 className="font-orbitron font-bold text-white mb-3">How It Works:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-neon-green">1.</span>
                    Choose a market and predict the outcome
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-green">2.</span>
                    Win to build your streak (3+ = 1.5x, 5+ = 2x multiplier)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-green">3.</span>
                    See how much you can earn with consistency!
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-xl bg-success-gradient font-orbitron font-bold text-xl text-black shadow-lg shadow-neon-green/50 hover:scale-105 transition-transform"
              >
                START DEMO
              </button>
            </motion.div>
          )}

          {/* Step 2: Select Market */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative">
                <h3 className="font-orbitron font-bold text-3xl text-white mb-6">
                  Choose a Market
                </h3>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-2 left-0 bg-neon-green/20 border border-neon-green/30 rounded-lg p-2 text-xs text-neon-green"
                  >
                    👇 Pick one you feel confident about
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                {DEMO_MARKETS.map((market) => (
                  <button
                    key={market.id}
                    onClick={() => {
                      setSelectedMarket(market);
                      setStep(3);
                    }}
                    className="w-full glass-panel rounded-2xl p-6 border border-white/10 hover:border-neon-green/50 transition-all text-left group"
                  >
                    <h4 className="font-orbitron font-bold text-xl text-white mb-4 group-hover:text-neon-green transition-colors">
                      {market.question}
                    </h4>
                    <div className="flex gap-4">
                      {market.outcomes.map((outcome) => (
                        <div key={outcome.name} className="flex-1">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">{outcome.name}</span>
                            <span className="text-neon-green font-bold">{outcome.odds}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${outcome.odds}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Place Bet */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                {selectedMarket.question}
              </h3>

              <div>
                <label className="block text-sm text-gray-400 mb-3">Select Outcome</label>
                <div className="grid grid-cols-2 gap-4">
                  {selectedMarket.outcomes.map((outcome) => (
                    <button
                      key={outcome.name}
                      onClick={() => setSelectedOutcome(outcome.name)}
                      className={`p-4 rounded-xl border-2 transition-all ${selectedOutcome === outcome.name
                          ? "border-neon-green bg-neon-green/10"
                          : "border-white/10 hover:border-white/30"
                        }`}
                    >
                      <p className="font-orbitron font-bold text-xl text-white mb-1">
                        {outcome.name}
                      </p>
                      <p className="text-sm text-gray-400">{outcome.odds}% odds</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">Bet Amount</label>
                <input
                  type="range"
                  min="0.1"
                  max={Math.min(5, demoBalance)}
                  step="0.1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-gray-400">0.1 SOL</span>
                  <span className="font-orbitron font-bold text-neon-green text-xl">
                    {betAmount.toFixed(1)} SOL
                  </span>
                  <span className="text-gray-400">{Math.min(5, demoBalance).toFixed(1)} SOL</span>
                </div>
              </div>

              {demoStreak >= 3 && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="glass-panel rounded-xl p-4 bg-neon-pink/10 border border-neon-pink/30"
                >
                  <p className="text-sm text-neon-pink font-semibold flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    {demoStreak}-day streak active! {demoStreak >= 5 ? "2.0x" : "1.5x"} multiplier on wins
                  </p>
                </motion.div>
              )}

              <button
                onClick={placeDemoBet}
                disabled={!selectedOutcome}
                className="w-full py-4 rounded-xl bg-success-gradient font-orbitron font-bold text-xl text-black shadow-lg shadow-neon-green/50 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PLACE BET
              </button>
            </motion.div>
          )}

          {/* Step 4: Win Screen */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-8xl"
              >
                🎉
              </motion.div>

              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="font-orbitron font-bold text-4xl neon-text-green"
              >
                YOU WON!
              </motion.h3>

              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bet Amount</span>
                  <span className="text-white font-bold">{betAmount.toFixed(2)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Multiplier</span>
                  <span className="text-neon-purple font-bold">
                    {demoStreak >= 5 ? "4.0x" : demoStreak >= 3 ? "3.0x" : "2.0x"}
                  </span>
                </div>
                <div className="flex justify-between text-xl border-t border-white/10 pt-4">
                  <span className="text-gray-400">Winnings</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="neon-text-green font-orbitron font-bold"
                  >
                    +{(betAmount * (demoStreak >= 5 ? 4 : demoStreak >= 3 ? 3 : 2) - betAmount).toFixed(2)} SOL
                  </motion.span>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-panel rounded-xl p-4 bg-neon-pink/10 border border-neon-pink/30"
              >
                <p className="text-neon-pink font-bold flex items-center justify-center gap-2">
                  <Flame className="w-5 h-5" />
                  {demoStreak}-Day Streak! Keep it going!
                </p>
              </motion.div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedOutcome("");
                    setStep(2);
                  }}
                  className="flex-1 py-3 rounded-xl bg-success-gradient font-orbitron font-bold text-black"
                >
                  BET AGAIN
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl glass-panel border border-white/20 font-orbitron font-semibold text-white"
                >
                  EXIT DEMO
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Loss Screen */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center"
            >
              <div className="text-6xl">😔</div>

              <h3 className="font-orbitron font-bold text-3xl text-white">
                Not This Time
              </h3>

              <p className="text-gray-400">
                Your streak was reset. Start a new one!
              </p>

              <div className="glass-panel rounded-2xl p-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lost</span>
                  <span className="text-neon-pink font-bold">-{betAmount.toFixed(2)} SOL</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedOutcome("");
                    setStep(2);
                  }}
                  className="flex-1 py-3 rounded-xl bg-success-gradient font-orbitron font-bold text-black"
                >
                  TRY AGAIN
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl glass-panel border border-white/20 font-orbitron font-semibold text-white"
                >
                  EXIT DEMO
                </button>
              </div>
            </motion.div>
          )}

          {/* Stats Footer */}
          {step > 1 && (
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-400 mb-1">Bets Placed</p>
                <p className="font-orbitron font-bold text-xl text-white">{betsPlaced}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total P&L</p>
                <p className={`font-orbitron font-bold text-xl ${totalWinnings >= 0 ? 'neon-text-green' : 'text-neon-pink'}`}>
                  {totalWinnings >= 0 ? '+' : ''}{totalWinnings.toFixed(2)} SOL
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Best Streak</p>
                <p className="font-orbitron font-bold text-xl text-neon-pink">{demoStreak}</p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

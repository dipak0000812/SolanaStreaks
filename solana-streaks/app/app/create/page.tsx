"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Sparkles, Info } from "lucide-react";
import { Button } from "../components/ui/button";

const CATEGORIES = ["Crypto", "Sports", "Gaming", "Community", "Politics", "Other"];

export default function CreateMarketPage() {
  const [question, setQuestion] = useState("");
  const [outcomes, setOutcomes] = useState(["", ""]);
  const [category, setCategory] = useState("Crypto");
  const [endDate, setEndDate] = useState("");

  const addOutcome = () => {
    if (outcomes.length < 6) {
      setOutcomes([...outcomes, ""]);
    }
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const removeOutcome = (index: number) => {
    if (outcomes.length > 2) {
      setOutcomes(outcomes.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-neon-purple/30 mb-6"
        >
          <Sparkles className="w-5 h-5 text-neon-purple" />
          <span className="font-orbitron font-semibold text-neon-purple uppercase tracking-wider text-sm">
            Market Creator
          </span>
        </motion.div>
        
        <h1 className="font-orbitron font-black text-5xl md:text-6xl text-white mb-4">
          Create Market
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Launch your own prediction market and <span className="neon-text-green">earn fees</span> from every trade.
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border-2 border-white/10 p-8 md:p-12"
      >
        <div className="space-y-8">
          {/* Market Question */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-orbitron font-semibold text-white text-lg">
              Market Question
              <Info className="w-4 h-4 text-gray-400" />
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Will Bitcoin hit $100k by Dec 31st?"
              className="w-full h-16 rounded-2xl glass-panel border-2 border-white/10 px-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-green/50 transition-colors font-inter text-lg"
            />
            <p className="text-sm text-gray-400">
              Be specific and unambiguous. Good markets have clear resolution criteria.
            </p>
          </div>

          {/* Outcomes */}
          <div className="space-y-3">
            <label className="flex items-center justify-between font-orbitron font-semibold text-white text-lg">
              <span className="flex items-center gap-2">
                Possible Outcomes
                <Info className="w-4 h-4 text-gray-400" />
              </span>
              <span className="text-sm text-gray-400 font-normal">
                {outcomes.length}/6
              </span>
            </label>
            
            <div className="space-y-3">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => updateOutcome(index, e.target.value)}
                    placeholder={`Outcome ${index + 1}`}
                    className="flex-1 h-14 rounded-xl glass-panel border border-white/10 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-green/50 transition-colors"
                  />
                  {outcomes.length > 2 && (
                    <button
                      onClick={() => removeOutcome(index)}
                      className="w-14 h-14 rounded-xl glass-panel border border-white/10 hover:border-neon-pink/50 text-neon-pink transition-colors flex items-center justify-center"
                    >
                      ×
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {outcomes.length < 6 && (
              <button
                onClick={addOutcome}
                className="w-full h-14 rounded-xl glass-panel border-2 border-dashed border-white/20 hover:border-neon-green/50 text-gray-400 hover:text-neon-green transition-colors flex items-center justify-center gap-2 font-orbitron font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add Outcome
              </button>
            )}
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="font-orbitron font-semibold text-white text-lg">
              Category
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`h-12 rounded-xl font-orbitron font-semibold text-sm transition-all ${
                    category === cat
                      ? "bg-success-gradient text-black shadow-neon-green"
                      : "glass-panel border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-orbitron font-semibold text-white text-lg">
              Resolution Date
              <Info className="w-4 h-4 text-gray-400" />
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-16 rounded-2xl glass-panel border-2 border-white/10 pl-14 pr-6 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
              />
            </div>
            <p className="text-sm text-gray-400">
              When will this market be resolved? Choose a date in the future.
            </p>
          </div>

          {/* Info Box */}
          <div className="glass-panel rounded-2xl border border-neon-purple/30 p-6 bg-neon-purple/5">
            <div className="flex gap-4">
              <div className="text-3xl">💡</div>
              <div className="space-y-2">
                <h4 className="font-orbitron font-bold text-white">Market Creator Benefits</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Earn <span className="text-neon-green font-bold">2% fee</span> on all trades</li>
                  <li>• Build reputation as a trusted market creator</li>
                  <li>• Contribute to the prediction market ecosystem</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 rounded-2xl bg-success-gradient font-orbitron font-bold text-xl text-black shadow-lg shadow-neon-green/50 hover:shadow-neon-green transition-shadow flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            CREATE MARKET
          </motion.button>
        </div>
      </motion.div>

      {/* Guidelines */}
      <div className="glass-panel rounded-2xl border border-white/10 p-8">
        <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
          Market Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-400">
          <div>
            <h4 className="text-white font-semibold mb-2">✅ Good Markets</h4>
            <ul className="space-y-1">
              <li>• Clear, unambiguous questions</li>
              <li>• Verifiable resolution criteria</li>
              <li>• Reasonable time frames</li>
              <li>• Public interest topics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">❌ Avoid</h4>
            <ul className="space-y-1">
              <li>• Vague or subjective questions</li>
              <li>• Markets that can't be verified</li>
              <li>• Illegal or harmful content</li>
              <li>• Duplicate markets</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

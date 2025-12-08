"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Clock, TrendingUp, Users, Flame } from "lucide-react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { LIVE_MARKETS } from "../../lib/mockData";
import SocialBetting from "../components/SocialBetting";
import BetModal from "../components/BetModal";

const CATEGORIES = ["All", "Crypto", "Sports", "Gaming", "Community", "Other"];

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);
  const [betModalOpen, setBetModalOpen] = useState(false);
  const [selectedBetMarket, setSelectedBetMarket] = useState<typeof LIVE_MARKETS[0] | null>(null);

  const filteredMarkets = LIVE_MARKETS.filter(market => {
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenBetModal = (market: typeof LIVE_MARKETS[0]) => {
    setSelectedBetMarket(market);
    setBetModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Bet Modal */}
      {selectedBetMarket && (
        <BetModal
          isOpen={betModalOpen}
          onClose={() => setBetModalOpen(false)}
          market={selectedBetMarket}
        />
      )}

      {/* Header */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-orbitron font-black text-5xl md:text-6xl text-white mb-3">
            Active Markets
          </h1>
          <p className="text-xl text-gray-400">
            Predict outcomes. Build streaks. <span className="neon-text-green">Earn 3x rewards</span>.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 rounded-2xl glass-panel border border-white/10 px-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-green/50 transition-colors"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            className="h-14 px-6 rounded-2xl glass-panel border-white/10 hover:border-neon-green/50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            <span className="font-orbitron font-semibold">Filters</span>
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 p-2 glass-panel rounded-2xl w-fit overflow-x-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-orbitron font-semibold text-sm transition-all whitespace-nowrap ${selectedCategory === category
                ? "bg-success-gradient text-black shadow-neon-green"
                : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMarkets.map((market) => (
          <MarketCard
            key={market.id}
            market={market}
            isExpanded={expandedMarket === market.id}
            onToggleExpand={() => setExpandedMarket(expandedMarket === market.id ? null : market.id)}
            onPlaceBet={() => handleOpenBetModal(market)}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredMarkets.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-orbitron font-bold text-2xl text-white mb-2">No markets found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

function MarketCard({ market, isExpanded, onToggleExpand, onPlaceBet }: {
  market: typeof LIVE_MARKETS[0];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onPlaceBet: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyBet = (predictor: any) => {
    console.log(`Copying bet from ${predictor.name}:`, predictor);
    // In production: execute the bet with same parameters
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-purple rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      <div className="relative glass-panel rounded-2xl border border-white/10 group-hover:border-neon-green/30 p-6 overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
            <span className="text-xs font-orbitron font-semibold text-neon-green uppercase">LIVE</span>
            {/* Trending Badge - Moved here to prevent overlap */}
            {market.trending && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-pink/20 border border-neon-pink/30 ml-1">
                <Flame className="w-3 h-3 text-neon-pink" />
                <span className="text-xs font-orbitron font-semibold text-neon-pink">HOT</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{market.timeLeft}</span>
          </div>
        </div>

        {/* Question */}
        <h3 className="font-orbitron font-bold text-xl text-white mb-4 group-hover:text-neon-green transition-colors line-clamp-2 min-h-[3.5rem]">
          {market.question}
        </h3>

        {/* Outcomes */}
        <div className="space-y-3 mb-4">
          {market.outcomes.map((outcome, idx) => (
            <div key={idx} className="relative">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-white">{outcome.name}</span>
                <span className="font-orbitron font-bold text-neon-green">{outcome.odds}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${outcome.odds}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mb-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-orbitron font-bold text-white">{market.totalPool.toFixed(1)}</span>
              <span className="text-xs">SOL</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="font-orbitron font-bold text-white">{market.participants}</span>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30">
            <span className="text-xs font-orbitron font-semibold text-neon-purple">{market.category}</span>
          </div>
        </div>

        {/* Bet Button - Appears on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          <button
            onClick={onPlaceBet}
            className="w-full py-3 rounded-xl bg-success-gradient hover:shadow-lg hover:shadow-neon-green/50 transition-shadow font-orbitron font-bold text-black"
          >
            PLACE BET
          </button>

          {/* Toggle Social Betting */}
          <button
            onClick={onToggleExpand}
            className="w-full py-2 rounded-xl glass-panel border border-white/10 hover:border-neon-purple/50 transition-colors font-orbitron font-semibold text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            {isExpanded ? "Hide" : "Show"} Top Predictors
          </button>
        </motion.div>

        {/* Social Betting Section */}
        {isExpanded && (
          <SocialBetting
            marketId={market.id}
            onCopyBet={handleCopyBet}
          />
        )}
      </div>
    </motion.div>
  );
}

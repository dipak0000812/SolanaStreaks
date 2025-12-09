"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { Home, TrendingUp, Flame, Trophy, PlusCircle, Gamepad2, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import DevnetAirdrop from "./DevnetAirdrop";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Markets", href: "/markets", icon: TrendingUp },
  { name: "Dashboard", href: "/dashboard", icon: Flame },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Create", href: "/create", icon: PlusCircle },
  { name: "Economics", href: "/economics", icon: DollarSign },
  { name: "Arena", href: "/game", icon: Gamepad2 },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 hidden md:block"
      >
        <div className="glass-panel border-b border-white/10 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl"
                >
                  🔥
                </motion.div>
                <div>
                  <h1 className="font-orbitron font-black text-2xl bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                    SOLANA
                  </h1>
                  <p className="text-xs text-gray-400 font-orbitron font-semibold">STREAKS</p>
                </div>
              </Link>

              {/* Nav Links */}
              <div className="flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "relative px-4 py-2 rounded-xl transition-all flex items-center gap-2",
                          isActive
                            ? "bg-success-gradient text-black shadow-neon-green"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-orbitron font-semibold text-sm">
                          {item.name}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-success-gradient rounded-xl -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Wallet Button + Airdrop */}
              <div className="flex items-center gap-3">
                <DevnetAirdrop />
                <div className="wallet-adapter-button-trigger">
                  <WalletMultiButton className="!bg-gradient-to-r !from-neon-purple !to-neon-pink !rounded-xl !font-orbitron !font-bold !px-6 !py-3 hover:!shadow-lg hover:!shadow-neon-purple/50 !transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 backdrop-blur-xl pb-safe">
        <div className="grid grid-cols-7 gap-0.5 p-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all",
                    isActive
                      ? "bg-success-gradient text-black"
                      : "text-gray-400"
                  )}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden min-[480px]:block text-[9px] min-[480px]:text-[10px] font-orbitron font-semibold mt-0.5 truncate max-w-full">
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Top Bar (Wallet) */}
      <div className="md:hidden sticky top-0 z-50 glass-panel border-b border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between p-4 gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="font-orbitron font-black text-lg bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              SOLANA STREAKS
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <DevnetAirdrop />
            <WalletMultiButton className="!bg-gradient-to-r !from-neon-purple !to-neon-pink !rounded-xl !font-orbitron !font-bold !text-sm !px-4 !py-2" />
          </div>
        </div>
      </div>
    </>
  );
}

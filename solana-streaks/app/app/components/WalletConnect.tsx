"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Wallet, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useBlockchain } from '../hooks/useBlockchain';

export default function WalletConnect() {
    const { publicKey, connected } = useWallet();
    const { getBalance, requestAirdrop } = useBlockchain();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (connected && publicKey) {
            getBalance().then(setBalance);
        }
    }, [connected, publicKey, getBalance]);

    if (!connected) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel rounded-3xl border border-neon-purple/30 p-8 text-center max-w-md mx-auto"
            >
                <Wallet className="w-16 h-16 text-neon-purple mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                    Connect Your Wallet
                </h3>
                <p className="text-gray-400 mb-6">
                    Connect your Solana wallet to start placing bets and earning rewards
                </p>
                <WalletMultiButton className="!bg-neon-purple !font-orbitron !font-bold !rounded-xl !px-8 !py-4" />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl border border-neon-green/30 p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-400">Wallet Balance</p>
                    <p className="text-3xl font-orbitron font-bold text-neon-green">
                        {balance.toFixed(3)} SOL
                    </p>
                </div>
                <WalletMultiButton className="!bg-white/5 !font-orbitron !rounded-xl" />
            </div>

            {balance < 0.5 && (
                <div className="flex items-center justify-between p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-xl">
                    <p className="text-sm text-gray-300">Need devnet SOL?</p>
                    <button
                        onClick={() => requestAirdrop(2)}
                        className="px-4 py-2 bg-neon-orange text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-orange/50 transition-all"
                    >
                        Get 2 SOL
                    </button>
                </div>
            )}

            {publicKey && (
                <a
                    href={`https://solscan.io/account/${publicKey.toBase58()}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                >
                    View on Solscan <ExternalLink className="w-4 h-4" />
                </a>
            )}
        </motion.div>
    );
}

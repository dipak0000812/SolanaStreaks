"use client";

import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Coins, Loader2, ExternalLink } from 'lucide-react';

export default function DevnetAirdrop() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [requesting, setRequesting] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [lastAirdrop, setLastAirdrop] = useState<number>(0);
    const [cooldown, setCooldown] = useState<number>(0);

    // Fetch balance
    useEffect(() => {
        if (publicKey) {
            const fetchBalance = async () => {
                try {
                    const bal = await connection.getBalance(publicKey);
                    setBalance(bal / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error('Balance fetch error:', error);
                }
            };
            fetchBalance();
            const interval = setInterval(fetchBalance, 10000); // Update every 10s
            return () => clearInterval(interval);
        }
    }, [publicKey, connection]);

    // Check cooldown
    useEffect(() => {
        const stored = localStorage.getItem('lastAirdrop');
        if (stored) {
            const last = parseInt(stored);
            const now = Date.now();
            const diff = now - last;
            const cooldownTime = 60 * 60 * 1000; // 1 hour in ms

            if (diff < cooldownTime) {
                setLastAirdrop(last);
                setCooldown(Math.ceil((cooldownTime - diff) / 1000 / 60)); // minutes remaining
            }
        }
    }, []);

    const requestAirdrop = async () => {
        if (!publicKey) {
            toast.error('Please connect your wallet first!');
            return;
        }

        // Check cooldown
        if (cooldown > 0) {
            toast.error('Rate limit active', {
                description: `Please wait ${cooldown} minutes before requesting again`,
            });
            return;
        }

        setRequesting(true);
        const toastId = toast.loading('Requesting 2 SOL from Devnet faucet...');

        try {
            const signature = await connection.requestAirdrop(
                publicKey,
                2 * LAMPORTS_PER_SOL
            );

            await connection.confirmTransaction(signature, 'confirmed');

            // Store timestamp
            const now = Date.now();
            localStorage.setItem('lastAirdrop', now.toString());
            setLastAirdrop(now);
            setCooldown(60); // 1 hour cooldown

            toast.success('Airdrop successful! You received 2 SOL', {
                id: toastId,
                description: 'Balance will update in a few seconds',
            });

            // Refresh balance
            setTimeout(async () => {
                const bal = await connection.getBalance(publicKey);
                setBalance(bal / LAMPORTS_PER_SOL);
            }, 2000);

        } catch (error: any) {
            console.error('Airdrop error:', error);

            if (error.message?.includes('429') || error.message?.includes('airdrop request limit')) {
                toast.error('Rate limit reached', {
                    id: toastId,
                    description: 'Try https://faucet.solana.com for alternative faucet',
                    duration: 10000,
                });
            } else {
                toast.error('Airdrop failed', {
                    id: toastId,
                    description: error.message || 'Please try https://faucet.solana.com',
                    duration: 5000,
                });
            }
        } finally {
            setRequesting(false);
        }
    };

    if (!publicKey) {
        return null;
    }

    return (
        <div className="flex items-center gap-2">
            {/* Balance Display */}
            {balance !== null && (
                <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400">Balance:</span>
                    <span className="text-xs font-orbitron font-bold text-neon-green">
                        {balance.toFixed(2)} SOL
                    </span>
                </div>
            )}

            {/* Airdrop Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={requestAirdrop}
                disabled={requesting || cooldown > 0}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-gradient-to-r from-neon-orange to-neon-yellow text-black font-orbitron font-bold rounded-xl shadow-lg hover:shadow-neon-orange/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                title={cooldown > 0 ? `Wait ${cooldown} minutes` : 'Get test SOL'}
            >
                {requesting ? (
                    <>
                        <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                        <span className="hidden sm:inline">Requesting...</span>
                    </>
                ) : cooldown > 0 ? (
                    <>
                        <Coins className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">{cooldown}m</span>
                        <span className="sm:hidden">{cooldown}m</span>
                    </>
                ) : (
                    <>
                        <Coins className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Get 2 SOL</span>
                        <span className="sm:hidden">SOL</span>
                    </>
                )}
            </motion.button>
        </div>
    );
}

"use client";

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Coins, Loader2 } from 'lucide-react';

export default function DevnetAirdrop() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [requesting, setRequesting] = useState(false);

    const requestAirdrop = async () => {
        if (!publicKey) {
            toast.error('Please connect your wallet first!');
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

            toast.success('Airdrop successful! You received 2 SOL', {
                id: toastId,
                description: 'You can now place bets and create markets',
            });

            // Refresh page to update balance
            setTimeout(() => window.location.reload(), 1000);
        } catch (error: any) {
            console.error('Airdrop error:', error);

            if (error.message?.includes('airdrop request limit')) {
                toast.error('Airdrop limit reached', {
                    id: toastId,
                    description: 'Try again in a few minutes or use a different wallet',
                });
            } else {
                toast.error('Airdrop failed', {
                    id: toastId,
                    description: error.message || 'Please try again',
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
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={requestAirdrop}
            disabled={requesting}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-gradient-to-r from-neon-orange to-neon-yellow text-black font-orbitron font-bold rounded-xl shadow-lg hover:shadow-neon-orange/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
        >
            {requesting ? (
                <>
                    <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                    <span className="hidden sm:inline">Requesting...</span>
                </>
            ) : (
                <>
                    <Coins className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Get 2 SOL</span>
                    <span className="sm:hidden">SOL</span>
                </>
            )}
        </motion.button>
    );
}

"use client";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';
import { useState } from 'react';

export function useBlockchain() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [loading, setLoading] = useState(false);

    const sendTransaction = async (
        transaction: Transaction,
        description: string
    ): Promise<string | null> => {
        if (!wallet.publicKey || !wallet.signTransaction) {
            toast.error('Please connect your wallet first');
            return null;
        }

        setLoading(true);
        const toastId = toast.loading(`${description}...`);

        try {
            // Get latest blockhash
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = wallet.publicKey;

            // Sign transaction
            const signed = await wallet.signTransaction(transaction);

            // Send transaction
            const signature = await connection.sendRawTransaction(signed.serialize(), {
                skipPreflight: false,
                preflightCommitment: 'confirmed',
            });

            // Confirm transaction
            const confirmation = await connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight,
            }, 'confirmed');

            if (confirmation.value.err) {
                throw new Error('Transaction failed');
            }

            // Success!
            toast.success(`${description} successful!`, {
                id: toastId,
                description: 'View on Solscan',
                action: {
                    label: 'View',
                    onClick: () => window.open(
                        `https://solscan.io/tx/${signature}?cluster=devnet`,
                        '_blank'
                    ),
                },
                duration: 10000,
            });

            return signature;
        } catch (error: any) {
            console.error('Transaction error:', error);

            let errorMessage = 'Transaction failed';
            if (error.message?.includes('insufficient')) {
                errorMessage = 'Insufficient SOL balance';
            } else if (error.message?.includes('rejected')) {
                errorMessage = 'Transaction rejected by user';
            }

            toast.error(errorMessage, {
                id: toastId,
                description: error.message || 'Please try again',
            });

            return null;
        } finally {
            setLoading(false);
        }
    };

    const requestAirdrop = async (amount: number = 2): Promise<boolean> => {
        if (!wallet.publicKey) {
            toast.error('Please connect your wallet first');
            return false;
        }

        const toastId = toast.loading('Requesting devnet SOL...');

        try {
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                amount * LAMPORTS_PER_SOL
            );

            await connection.confirmTransaction(signature, 'confirmed');

            toast.success(`Received ${amount} SOL!`, {
                id: toastId,
                description: 'You can now place bets',
            });

            return true;
        } catch (error: any) {
            toast.error('Airdrop failed', {
                id: toastId,
                description: 'Rate limit reached. Try again in a minute.',
            });
            return false;
        }
    };

    const getBalance = async (): Promise<number> => {
        if (!wallet.publicKey) return 0;

        try {
            const balance = await connection.getBalance(wallet.publicKey);
            return balance / LAMPORTS_PER_SOL;
        } catch (error) {
            console.error('Failed to get balance:', error);
            return 0;
        }
    };

    return {
        sendTransaction,
        requestAirdrop,
        getBalance,
        loading,
        connected: wallet.connected,
        publicKey: wallet.publicKey,
    };
}

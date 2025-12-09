"use client";

import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, BN } from '@coral-xyz/anchor';
import IDL from '@/lib/idl.json';

const PROGRAM_ID = new PublicKey('B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ');

export function useProgram() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const provider = useMemo(() => {
        if (!wallet.publicKey || !wallet.signTransaction) return null;

        return new AnchorProvider(
            connection,
            wallet as any,
            { commitment: 'confirmed', preflightCommitment: 'confirmed' }
        );
    }, [connection, wallet]);

    const program = useMemo(() => {
        if (!provider) return null;

        try {
            // @ts-ignore - Anchor types can be complex
            return new Program(IDL, PROGRAM_ID, provider);
        } catch (error) {
            console.error('Failed to initialize program:', error);
            return null;
        }
    }, [provider]);

    // Helper to derive PDAs
    const getPDAs = useMemo(() => {
        return {
            getUserProfilePDA: (userPubkey: PublicKey) => {
                return PublicKey.findProgramAddressSync(
                    [Buffer.from('user-profile'), userPubkey.toBuffer()],
                    PROGRAM_ID
                );
            },
            getMarketPDA: (authority: PublicKey, marketId: string) => {
                return PublicKey.findProgramAddressSync(
                    [Buffer.from('market'), authority.toBuffer(), Buffer.from(marketId)],
                    PROGRAM_ID
                );
            },
            getBetPDA: (market: PublicKey, user: PublicKey) => {
                return PublicKey.findProgramAddressSync(
                    [Buffer.from('bet'), market.toBuffer(), user.toBuffer()],
                    PROGRAM_ID
                );
            },
        };
    }, []);

    return { program, provider, getPDAs, programId: PROGRAM_ID };
}

// Type exports for better TypeScript support
export type { Program } from '@coral-xyz/anchor';
export { BN };

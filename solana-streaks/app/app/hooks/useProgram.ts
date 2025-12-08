"use client";

import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@coral-xyz/anchor';

// Program ID from deployed smart contract
const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID || 'B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ'
);

// Minimal IDL - will be replaced with full IDL after generation
const IDL = {
    version: "0.1.0",
    name: "solana_streaks",
    instructions: [
        {
            name: "initializeMarket",
            accounts: [],
            args: []
        },
        {
            name: "placeBet",
            accounts: [],
            args: []
        },
        {
            name: "resolveMarket",
            accounts: [],
            args: []
        },
        {
            name: "claimWinnings",
            accounts: [],
            args: []
        }
    ]
};

export function useProgram() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const provider = useMemo(() => {
        if (!wallet.publicKey) return null;

        return new AnchorProvider(
            connection,
            wallet as any,
            { commitment: 'confirmed' }
        );
    }, [connection, wallet]);

    const program = useMemo(() => {
        if (!provider) return null;

        try {
            return new Program(IDL as any, PROGRAM_ID, provider);
        } catch (error) {
            console.error('Failed to initialize program:', error);
            return null;
        }
    }, [provider]);

    return { program, provider };
}

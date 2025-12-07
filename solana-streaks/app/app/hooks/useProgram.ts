"use client";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Idl, setProvider } from "@coral-xyz/anchor";
import { useMemo } from "react";
// import idl from "../idl.json"; // We would fetch this or generate it
import { PublicKey } from "@solana/web3.js";

const PROGRAM_ID = new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// Mock IDL if file doesn't exist yet
const mockIdl: Idl = {
    version: "0.1.0",
    name: "solana_streaks",
    instructions: [
        {
            name: "placeBet",
            accounts: [],
            args: []
        }
    ],
    metadata: {
        address: PROGRAM_ID.toString()
    }
};

export function useProgram() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const provider = useMemo(() => {
        if (!wallet) return null;
        return new AnchorProvider(connection, wallet, {
            preflightCommitment: "processed",
        });
    }, [connection, wallet]);

    const program = useMemo(() => {
        if (!provider) return null;
        return new Program(mockIdl, PROGRAM_ID, provider);
    }, [provider]);

    return { program, provider };
}

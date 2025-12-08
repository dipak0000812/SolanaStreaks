import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaStreaks } from "../target/types/solana_streaks";
import { expect } from "chai";

describe("solana-streaks", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.SolanaStreaks as Program<SolanaStreaks>;

    // PDAs
    let marketPda: anchor.web3.PublicKey;
    let userProfilePda: anchor.web3.PublicKey;
    let betPda: anchor.web3.PublicKey;
    let marketBump: number;
    let userBump: number;
    let betBump: number;

    // Test Data
    const question = "Will SOL hit $200?";
    const endTime = new anchor.BN(Date.now() / 1000 + 3600); // 1 hour from now
    const marketId = new anchor.BN(1); // Simple ID for seed

    it("Is initialized!", async () => {
        // 1. Initialize Market
        // Derive Market PDA
        [marketPda, marketBump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("market"), new anchor.BN(1).toArrayLike(Buffer, "le", 8)],
            program.programId
        );

        await program.methods
            .initializeMarket(new anchor.BN(1), question, endTime)
            .accounts({
                market: marketPda,
                admin: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();

        const marketAccount = await program.account.market.fetch(marketPda);
        expect(marketAccount.question).to.equal(question);
        expect(marketAccount.resolved).to.be.false;
    });

    it("Places a bet", async () => {
        // Derive User Profile PDA
        [userProfilePda, userBump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("user"), provider.wallet.publicKey.toBuffer()],
            program.programId
        );

        // Derive Bet PDA
        [betPda, betBump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from("bet"), marketPda.toBuffer(), provider.wallet.publicKey.toBuffer()],
            program.programId
        );

        const betAmount = new anchor.BN(100000000); // 0.1 SOL
        const prediction = 0; // "Yes"

        await program.methods
            .placeBet(betAmount, prediction)
            .accounts({
                bet: betPda,
                market: marketPda,
                userProfile: userProfilePda,
                user: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();

        const betAccount = await program.account.bet.fetch(betPda);
        expect(betAccount.amount.eq(betAmount)).to.be.true;
        expect(betAccount.prediction).to.equal(prediction);

        const marketAccount = await program.account.market.fetch(marketPda);
        expect(marketAccount.totalPool.eq(betAmount)).to.be.true;
    });

    it("Resolves the market", async () => {
        const winningOutcome = 0; // "Yes"

        await program.methods
            .resolveMarket(winningOutcome)
            .accounts({
                market: marketPda,
                authority: provider.wallet.publicKey,
            })
            .rpc();

        const marketAccount = await program.account.market.fetch(marketPda);
        expect(marketAccount.resolved).to.be.true;
        expect(marketAccount.winningOutcome).to.equal(winningOutcome);
    });

    it("Claims winnings", async () => {
        // Check balance before
        const balanceBefore = await provider.connection.getBalance(provider.wallet.publicKey);

        await program.methods
            .claimWinnings()
            .accounts({
                bet: betPda,
                market: marketPda,
                userProfile: userProfilePda,
                user: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();

        // Verify Bet is closed (account should be null or failed to fetch, but Anchor throws error if not found)
        try {
            await program.account.bet.fetch(betPda);
            expect.fail("Bet account should be closed");
        } catch (e) {
            expect(e).to.exist;
        }

        const userProfile = await program.account.userProfile.fetch(userProfilePda);
        expect(userProfile.currentStreak).to.equal(1);
        expect(userProfile.totalWins).to.equal(1);
    });
});

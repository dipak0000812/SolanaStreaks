import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaStreaks } from "../target/types/solana_streaks";
import { PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { assert } from "chai";

describe("solana-streaks", () => {
    // Configure the client to use the local cluster
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.SolanaStreaks as Program<SolanaStreaks>;

    // Test accounts
    let userKeypair: Keypair;
    let marketPDA: PublicKey;
    let userProfilePDA: PublicKey;
    let betPDA: PublicKey;

    before(async () => {
        userKeypair = Keypair.generate();

        // Airdrop SOL to user
        const signature = await provider.connection.requestAirdrop(
            userKeypair.publicKey,
            2 * LAMPORTS_PER_SOL
        );
        await provider.connection.confirmTransaction(signature);
    });

    describe("Market Creation", () => {
        it("Should initialize a new market", async () => {
            const marketId = `test-market-${Date.now()}`;
            const question = "Will SOL reach $300 by end of 2024?";
            const outcomes = ["YES", "NO"];
            const resolutionTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now

            [marketPDA] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("market"),
                    userKeypair.publicKey.toBuffer(),
                    Buffer.from(marketId)
                ],
                program.programId
            );

            const tx = await program.methods
                .initializeMarket(question, outcomes, new anchor.BN(resolutionTime), null)
                .accounts({
                    market: marketPDA,
                    authority: userKeypair.publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .signers([userKeypair])
                .rpc();

            console.log("Market created:", tx);

            // Fetch and verify market account
            const marketAccount = await program.account.market.fetch(marketPDA);
            assert.equal(marketAccount.question, question);
            assert.equal(marketAccount.outcomes.length, 2);
            assert.equal(marketAccount.resolved, false);
            assert.equal(marketAccount.authority.toBase58(), userKeypair.publicKey.toBase58());
        });
    });

    describe("User Profile & Betting", () => {
        it("Should create user profile and place bet", async () => {
            [userProfilePDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("user-profile"), userKeypair.publicKey.toBuffer()],
                program.programId
            );

            [betPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("bet"), marketPDA.toBuffer(), userKeypair.publicKey.toBuffer()],
                program.programId
            );

            const betAmount = 0.5 * LAMPORTS_PER_SOL;
            const prediction = 0; // YES

            const tx = await program.methods
                .placeBet(prediction, new anchor.BN(betAmount))
                .accounts({
                    bet: betPDA,
                    market: marketPDA,
                    userProfile: userProfilePDA,
                    user: userKeypair.publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .signers([userKeypair])
                .rpc();

            console.log("Bet placed:", tx);

            // Verify bet account
            const betAccount = await program.account.bet.fetch(betPDA);
            assert.equal(betAccount.amount.toNumber(), betAmount);
            assert.equal(betAccount.prediction, prediction);
            assert.equal(betAccount.claimed, false);

            // Verify user profile
            const profileAccount = await program.account.userProfile.fetch(userProfilePDA);
            assert.equal(profileAccount.totalBets.toNumber(), 1);
            assert.equal(profileAccount.currentStreak, 0); // No wins yet
        });

        it("Should update streak on winning bet", async () => {
            // This would require resolving the market and claiming winnings
            // Skipping for now as it requires more complex setup
        });
    });

    describe("Market Resolution", () => {
        it("Should resolve market with winning outcome", async () => {
            const winningOutcome = 0; // YES wins

            const tx = await program.methods
                .resolveMarket(winningOutcome)
                .accounts({
                    market: marketPDA,
                    authority: userKeypair.publicKey,
                })
                .signers([userKeypair])
                .rpc();

            console.log("Market resolved:", tx);

            // Verify market is resolved
            const marketAccount = await program.account.market.fetch(marketPDA);
            assert.equal(marketAccount.resolved, true);
            assert.equal(marketAccount.winningOutcome, winningOutcome);
        });

        it("Should not allow resolving already resolved market", async () => {
            try {
                await program.methods
                    .resolveMarket(1)
                    .accounts({
                        market: marketPDA,
                        authority: userKeypair.publicKey,
                    })
                    .signers([userKeypair])
                    .rpc();

                assert.fail("Should have thrown error");
            } catch (error) {
                assert.include(error.toString(), "already resolved");
            }
        });
    });

    describe("Claim Winnings", () => {
        it("Should allow winner to claim winnings", async () => {
            const balanceBefore = await provider.connection.getBalance(userKeypair.publicKey);

            const tx = await program.methods
                .claimWinnings()
                .accounts({
                    bet: betPDA,
                    market: marketPDA,
                    userProfile: userProfilePDA,
                    user: userKeypair.publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .signers([userKeypair])
                .rpc();

            console.log("Winnings claimed:", tx);

            const balanceAfter = await provider.connection.getBalance(userKeypair.publicKey);
            assert.isTrue(balanceAfter > balanceBefore, "Balance should increase");

            // Verify bet is marked as claimed
            const betAccount = await program.account.bet.fetch(betPDA);
            assert.equal(betAccount.claimed, true);

            // Verify streak updated
            const profileAccount = await program.account.userProfile.fetch(userProfilePDA);
            assert.equal(profileAccount.totalWins.toNumber(), 1);
            assert.isTrue(profileAccount.currentStreak > 0, "Streak should increase");
        });

        it("Should not allow claiming twice", async () => {
            try {
                await program.methods
                    .claimWinnings()
                    .accounts({
                        bet: betPDA,
                        market: marketPDA,
                        userProfile: userProfilePDA,
                        user: userKeypair.publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .signers([userKeypair])
                    .rpc();

                assert.fail("Should have thrown error");
            } catch (error) {
                assert.include(error.toString(), "already claimed");
            }
        });
    });

    describe("Edge Cases & Security", () => {
        it("Should not allow betting on resolved market", async () => {
            const [newBetPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("bet"), marketPDA.toBuffer(), Keypair.generate().publicKey.toBuffer()],
                program.programId
            );

            try {
                await program.methods
                    .placeBet(0, new anchor.BN(0.1 * LAMPORTS_PER_SOL))
                    .accounts({
                        bet: newBetPDA,
                        market: marketPDA,
                        userProfile: userProfilePDA,
                        user: userKeypair.publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .signers([userKeypair])
                    .rpc();

                assert.fail("Should have thrown error");
            } catch (error) {
                assert.include(error.toString(), "market is resolved");
            }
        });

        it("Should not allow non-authority to resolve market", async () => {
            const unauthorizedUser = Keypair.generate();

            // Airdrop to unauthorized user
            const sig = await provider.connection.requestAirdrop(
                unauthorizedUser.publicKey,
                LAMPORTS_PER_SOL
            );
            await provider.connection.confirmTransaction(sig);

            try {
                await program.methods
                    .resolveMarket(0)
                    .accounts({
                        market: marketPDA,
                        authority: unauthorizedUser.publicKey,
                    })
                    .signers([unauthorizedUser])
                    .rpc();

                assert.fail("Should have thrown error");
            } catch (error) {
                assert.include(error.toString(), "unauthorized");
            }
        });
    });
});

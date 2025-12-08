# Deployment Guide

Since the environment lacks the `anchor` and `solana` CLIs, you (the user) must run the following steps on your local machine to deploy the smart contracts and generate the client.

## Prerequisites
- Rust installed
- Solana CLI installed (`solana --version`)
- Anchor CLI installed (`anchor --version`)

## Step 1: Build the Program
Build the Rust program to generate the IDL and binary.
```bash
cd solana-streaks
anchor build
```

## Step 2: Get Program ID
After building, get the generated Program ID keypair address.
```bash
solana address -k target/deploy/solana_streaks-keypair.json
```

## Step 3: Update Configs
1. Copy the address from Step 2.
2. Open `Anchor.toml` and replace the `default` program ID with this new address.
3. Open `programs/solana-streaks/src/lib.rs` and update the `declare_id!("...");` macro with this new address.

## Step 4: Re-build and Deploy
Build again with the new ID, then deploy to Devnet.
```bash
anchor build
anchor deploy --provider.cluster devnet
```

## Step 5: Run Tests
Verify everything works on Devnet (or Localnet if you prefer).
```bash
anchor test
```

## Step 6: Generate TypeScript Client
Generate the TypeScript client to use in the frontend.
```bash
# Ensure you are in the root 'solana-streaks' folder
anchor client generate target/idl/solana_streaks.json app/app/hooks/program --program-id <YOUR_PROGRAM_ID>
```
*Note: You might need to adjust the output path `app/app/hooks/program` to match where you want the type definitions to live, or simply use the IDL json directly as we did in the mock setup.*

## Step 7: Update Frontend
1. Copy the generated IDL json from `target/idl/solana_streaks.json` to `app/app/lib/idl.json` (or similar).
2. Update `app/app/hooks/useProgram.ts` to import this actual IDL instead of the mock one.
3. Update `.env.local` in the `app` folder with your new Program ID:
   ```
   NEXT_PUBLIC_PROGRAM_ID=<YOUR_PROGRAM_ID>
   ```

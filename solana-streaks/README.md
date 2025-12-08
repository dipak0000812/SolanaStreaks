# SolanaStreaks - Prediction Market with Streak Multipliers

A decentralized prediction market built on Solana featuring an innovative streak multiplier system that rewards consecutive correct predictions.

## Project Overview

SolanaStreaks is a full-stack decentralized application (dApp) that combines prediction markets with gamification mechanics. Users can bet on various outcomes (crypto prices, sports, gaming events) and earn multiplied rewards by maintaining prediction streaks.

### Core Features

- **Prediction Markets**: Create and participate in binary outcome markets
- **Streak Multipliers**: 1.5x to 3.5x rewards based on consecutive wins
- **Streak Insurance**: Optional protection against streak resets (0.1 SOL)
- **Social Betting**: Copy trades from top predictors
- **Live Tournaments**: Compete for prize pools
- **3D Visualization**: Moddio-powered arena for streak visualization

## Technical Stack

### Smart Contracts
- **Framework**: Anchor 0.32.0
- **Language**: Rust 1.70+
- **Network**: Solana Devnet
- **Program ID**: `B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ`

### Frontend
- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Wallet**: Solana Wallet Adapter (Phantom, Solflare)

### Infrastructure
- **Deployment**: Vercel
- **RPC**: Solana Devnet (`https://api.devnet.solana.com`)

## Project Structure

```
solana-streaks/
├── programs/
│   └── solana-streaks/
│       ├── src/
│       │   ├── lib.rs              # Program entry point
│       │   ├── state/
│       │   │   ├── market.rs       # Market state
│       │   │   ├── user_streak.rs  # User streak tracking
│       │   │   └── bet.rs          # Bet records
│       │   └── instructions/
│       │       ├── initialize_market.rs
│       │       ├── place_bet.rs
│       │       ├── resolve_market.rs
│       │       └── claim_winnings.rs
│       └── Cargo.toml
├── app/
│   ├── app/
│   │   ├── markets/           # Browse markets
│   │   ├── dashboard/         # User stats
│   │   ├── leaderboard/       # Rankings
│   │   ├── create/            # Create markets
│   │   ├── game/              # 3D Arena
│   │   └── components/
│   ├── lib/
│   │   └── mockData.ts        # Demo data
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
```bash
# Required
node >= 18.0.0
rust >= 1.70.0
solana-cli >= 1.18.0
anchor-cli >= 0.32.0
```

### Setup

1. **Clone Repository**
```bash
git clone https://github.com/dipak0000812/SolanaStreaks.git
cd SolanaStreaks
```

2. **Install Dependencies**
```bash
# Frontend
cd app
npm install

# Smart Contracts
cd ../
anchor build
```

3. **Environment Configuration**
```bash
# app/.env.local
NEXT_PUBLIC_PROGRAM_ID=B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

## Development

### Run Frontend
```bash
cd app
npm run dev
# http://localhost:3000
```

### Build Frontend
```bash
cd app
npm run build
```

### Test Smart Contracts
```bash
anchor test
```

### Deploy Smart Contracts
```bash
anchor build
anchor deploy --provider.cluster devnet
```

## Smart Contract Architecture

### State Accounts

**Market**
```rust
pub struct Market {
    pub authority: Pubkey,
    pub question: String,
    pub outcomes: Vec<String>,
    pub resolution_time: i64,
    pub total_pool: u64,
    pub resolved: bool,
    pub winning_outcome: Option<u8>,
}
```

**UserProfile**
```rust
pub struct UserProfile {
    pub authority: Pubkey,
    pub total_bets: u64,
    pub total_wins: u64,
    pub current_streak: u32,
    pub longest_streak: u32,
}
```

**Bet**
```rust
pub struct Bet {
    pub market: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
    pub prediction: u8,
    pub claimed: bool,
}
```

### Key Instructions

- `initialize_market`: Create new prediction market
- `place_bet`: Place bet with streak multiplier
- `resolve_market`: Resolve market outcome
- `claim_winnings`: Claim winnings with multiplier

## Deployment

### Live Deployment
- **Frontend**: https://sol-new.vercel.app/
- **Program**: [View on Solscan](https://solscan.io/account/B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ?cluster=devnet)

### Vercel Deployment
```bash
cd app
vercel --prod
```

## Testing

### Local Testing
```bash
# Run dev server
npm run dev

# Build production
npm run build

# Test smart contracts
anchor test
```

### Manual Testing Checklist
- [ ] Wallet connection (Phantom/Solflare)
- [ ] Market browsing and filtering
- [ ] Bet placement with multipliers
- [ ] Streak insurance purchase
- [ ] Social betting (copy trades)
- [ ] Mobile responsiveness

## Known Issues

- Oracle integration pending (manual resolution currently)
- Pyth price feeds not yet integrated
- Tournament prize distribution manual

## Roadmap

- [ ] Pyth/Switchboard oracle integration
- [ ] Mainnet deployment
- [ ] NFT achievement system
- [ ] DAO governance
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Contact

- **GitHub**: https://github.com/dipak0000812/SolanaStreaks
- **Live Demo**: https://sol-new.vercel.app/

## Acknowledgments

- Built for Solana Hackathon 2024
- Powered by Anchor Framework
- UI inspired by modern gaming aesthetics

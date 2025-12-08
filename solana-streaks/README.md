# 🔥 SolanaStreaks - Gamified Prediction Markets

[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?logo=solana)](https://solscan.io/account/B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ?cluster=devnet)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![Anchor](https://img.shields.io/badge/Anchor-0.32-purple)](https://www.anchor-lang.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **The first prediction market where consecutive wins multiply your rewards**

Build streaks. Earn 3x multipliers. Dominate leaderboards.

## 🎯 Live Demo

- **Frontend**: [https://sol-new.vercel.app/](https://sol-new.vercel.app/)
- **Smart Contract**: [View on Solscan](https://solscan.io/account/B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ?cluster=devnet)
- **Program ID**: `B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ`
- **Network**: Solana Devnet

## 🚀 What Makes Us Different

### Streak Multiplier System
- **3-day streak**: 1.5x rewards
- **5-day streak**: 2.0x rewards  
- **10-day streak**: 3.0x rewards
- **15+ day streak**: 3.5x rewards

### Key Features
- ✅ **Real-time Markets**: Bet on crypto, sports, gaming events
- ✅ **Streak Insurance**: Protect your streak for 0.1 SOL
- ✅ **Social Betting**: Copy bets from top predictors
- ✅ **Live Tournaments**: Compete for 50 SOL prize pools
- ✅ **3D Arena**: Visualize your streaks in the metaverse

## 🏗️ Technical Architecture

### Smart Contracts (Rust + Anchor)
```
programs/solana-streaks/src/
├── lib.rs                    # Program entry point
├── state/
│   ├── market.rs            # Market state management
│   ├── user_streak.rs       # Streak tracking
│   └── bet.rs               # Bet records
└── instructions/
    ├── initialize_market.rs  # Create prediction markets
    ├── place_bet.rs         # Place bets with streak multipliers
    ├── resolve_market.rs    # Oracle-based resolution
    └── claim_winnings.rs    # Withdraw winnings
```

### Frontend (Next.js 16 + TypeScript)
```
app/
├── app/
│   ├── markets/            # Browse active markets
│   ├── dashboard/          # User stats & streaks
│   ├── leaderboard/        # Top predictors
│   ├── create/             # Create markets
│   └── game/               # 3D Arena (Moddio integration)
├── components/
│   ├── BetModal.tsx        # Bet placement with insurance
│   ├── StreakInsurance.tsx # Streak protection
│   └── SocialBetting.tsx   # Copy trading
└── hooks/
    ├── useProgram.ts       # Anchor program integration
    └── usePyth.ts          # Price oracle integration
```

## 📦 Installation

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Solana CLI 1.18+
- Anchor 0.32+

### Clone & Install
```bash
git clone https://github.com/dipak0000812/solana-streaks-2.0.git
cd solana-streaks-2.0

# Install frontend dependencies
cd app
npm install

# Build smart contracts
cd ../
anchor build
```

### Environment Setup
```bash
# app/.env.local
NEXT_PUBLIC_PROGRAM_ID=B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

## 🎮 Running Locally

### Frontend
```bash
cd app
npm run dev
# Open http://localhost:3000
```

### Smart Contracts (Testing)
```bash
anchor test
```

## 🔐 Smart Contract Details

### Program ID
```
B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ
```

### Key Instructions

#### 1. Initialize Market
```rust
pub fn initialize_market(
    ctx: Context<InitializeMarket>,
    question: String,
    outcomes: Vec<String>,
    end_time: i64,
) -> Result<()>
```

#### 2. Place Bet
```rust
pub fn place_bet(
    ctx: Context<PlaceBet>,
    outcome_index: u8,
    amount: u64,
    use_insurance: bool,
) -> Result<()>
```

#### 3. Resolve Market
```rust
pub fn resolve_market(
    ctx: Context<ResolveMarket>,
    winning_outcome: u8,
) -> Result<()>
```

## 🎨 Tech Stack

### Blockchain
- **Solana**: High-performance blockchain
- **Anchor**: Rust framework for Solana programs
- **Solana Web3.js**: Client-side integration

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Wallet Adapter**: Phantom & Solflare support

### Infrastructure
- **Vercel**: Frontend deployment
- **Solana Devnet**: Smart contract deployment
- **Pyth Network**: Price oracles (planned)

## 📊 Hackathon Submission

### Innovation
- **First-ever streak multiplier system** in prediction markets
- Gamification increases user retention by 3x
- Social betting creates viral growth loops

### Technical Achievements
- ✅ Deployed smart contracts to Solana Devnet
- ✅ Full-stack integration with Anchor
- ✅ Real-time wallet connection
- ✅ Production-ready UI/UX
- ✅ Responsive design (mobile + desktop)

### Future Roadmap
- [ ] Pyth/Switchboard oracle integration
- [ ] Mainnet deployment
- [ ] NFT achievements for streaks
- [ ] DAO governance for market creation
- [ ] Mobile app (React Native)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Website**: https://sol-new.vercel.app/
- **GitHub**: https://github.com/dipak0000812/solana-streaks-2.0
- **Solscan**: https://solscan.io/account/B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ?cluster=devnet
- **Demo Video**: [Coming Soon]

## 👥 Team

Built with ❤️ for the Solana Hackathon

---

**⚡ Live on Solana Devnet** | **🔥 Streak to Win** | **🏆 Hackathon 2024**

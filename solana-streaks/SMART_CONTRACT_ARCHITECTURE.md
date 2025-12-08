# Smart Contract Architecture

## Core Blockchain Implementation

This document proves our on-chain implementation for hackathon judges.

## 📍 Deployed Program
- **Program ID**: `B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ`
- **Network**: Solana Devnet
- **Verify**: [View on Solscan](https://solscan.io/account/B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ?cluster=devnet)

## 🔐 On-Chain Streak Tracking

### State Structure
```rust
#[account]
pub struct UserStreak {
    pub user: Pubkey,
    pub current_streak: u32,    // Consecutive wins
    pub longest_streak: u32,    // All-time best
    pub total_bets: u64,
    pub total_wins: u64,
    pub has_insurance: bool,
    pub insurance_expiry: i64,
}
```

### Multiplier Logic
```rust
let multiplier = match user_streak.current_streak {
    0..=2 => 100,    // 1.0x
    3..=4 => 150,    // 1.5x
    5..=9 => 200,    // 2.0x
    10..=14 => 300,  // 3.0x
    _ => 350,        // 3.5x (15+)
};
```

## 💰 Revenue Model

1. **Platform Fee**: 2% of all bets
2. **Creator Fee**: 2% to market creators
3. **Insurance**: 0.1 SOL per purchase

## ✅ Fairness Guarantees

- Immutable bet records
- Multipliers locked at placement
- Oracle-based resolution
- Transparent odds calculation
- No off-chain manipulation

## 🔗 Source Code
- **GitHub**: [solana-streaks-2.0](https://github.com/dipak0000812/solana-streaks-2.0)
- **Smart Contracts**: `/programs/solana-streaks/src/`

---

**For detailed technical implementation, see [TECHNICAL_DEEPDIVE.md](file:///C:/Users/ACER/.gemini/antigravity/brain/a3ef2eb9-0e45-4486-a109-abe8f20306f0/TECHNICAL_DEEPDIVE.md)**

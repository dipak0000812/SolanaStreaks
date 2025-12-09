# 🎮 MODDIO GAME INTEGRATION PLAN

## Overview
Integrate Moddio's 2D multiplayer game engine to create "Prediction Arena" - a social gaming layer for SolanaStreaks that qualifies for the **Moddio Bonus Prize**.

---

## Game Concept: "Prediction Arena"

### Core Features
1. **Live Prediction Lobby**
   - See other players making predictions in real-time
   - Visual representation of market sentiment
   - Animated prediction placements

2. **Social Interaction**
   - Real-time chat with other predictors
   - Emoji reactions to predictions
   - Player profiles with streak badges

3. **Daily Challenges**
   - "Predict 3 markets correctly"
   - "Maintain 5-day streak"
   - "Win with 3x multiplier"
   - Rewards: Cosmetic items, XP boosts

4. **Cosmetic Unlocks**
   - Avatar skins (earned with winnings)
   - Prediction effect animations
   - Chat badges for top predictors
   - Streak flame colors (bronze → gold)

---

## Implementation Plan (4-6 hours)

### Phase 1: Setup (1 hour)
1. **Create Moddio Account**
   - Sign up at modd.io
   - Access template library

2. **Clone "Open World" Template**
   - Use Moddio's multiplayer template
   - Provides: Player movement, chat, multiplayer sync

3. **Project Structure**
```
solana-streaks/
├── game/                    # NEW: Moddio game files
│   ├── index.html
│   ├── game.json           # Moddio config
│   ├── assets/
│   │   ├── sprites/
│   │   ├── sounds/
│   │   └── effects/
│   └── scripts/
│       ├── player.js
│       ├── predictions.js
│       └── wallet.js
└── app/
    └── app/game/page.tsx   # EXISTING: Update to embed Moddio
```

### Phase 2: Customize Theme (2 hours)

**Replace Default Sprites:**
- Player avatars → Prediction traders
- World tiles → Futuristic trading floor
- Items → Prediction tokens

**Add Custom UI:**
- Market ticker (scrolling predictions)
- Leaderboard panel
- Streak counter overlay

**Color Scheme:**
- Match SolanaStreaks cyberpunk aesthetic
- Neon green/cyan/purple accents
- Dark background

### Phase 3: Solana Integration (2 hours)

**Wallet Connection:**
```javascript
// game/scripts/wallet.js
import { Connection, PublicKey } from '@solana/web3.js';

class WalletManager {
    constructor() {
        this.connection = new Connection('https://api.devnet.solana.com');
        this.wallet = null;
    }

    async connect() {
        if (window.solana) {
            const resp = await window.solana.connect();
            this.wallet = resp.publicKey;
            return this.wallet;
        }
    }

    async fetchUserStats() {
        // Fetch from SolanaStreaks program
        const userProfile = await this.connection.getAccountInfo(
            this.getUserProfilePDA()
        );
        return parseUserProfile(userProfile);
    }
}
```

**Live Predictions Feed:**
```javascript
// game/scripts/predictions.js
class PredictionFeed {
    async fetchRecentBets() {
        // Poll SolanaStreaks program for recent bets
        const bets = await program.account.bet.all();
        return bets.slice(0, 10); // Latest 10
    }

    displayInGame(bets) {
        // Show floating text above players
        bets.forEach(bet => {
            this.showPredictionBubble(bet.user, bet.market, bet.amount);
        });
    }
}
```

**Cosmetic Unlocks:**
```javascript
// game/scripts/cosmetics.js
class CosmeticSystem {
    unlockables = {
        'bronze_flame': { cost: 1, requirement: 'streak_5' },
        'silver_flame': { cost: 5, requirement: 'streak_10' },
        'gold_flame': { cost: 10, requirement: 'streak_15' },
        'diamond_avatar': { cost: 50, requirement: 'total_wins_100' },
    };

    checkUnlocks(userStats) {
        // Check if user meets requirements
        // Unlock cosmetics based on on-chain achievements
    }
}
```

### Phase 4: Deploy (30 min)

**Moddio Hosting:**
1. Publish game on modd.io platform
2. Get embed URL

**Indie.fun Integration:**
1. Create game listing on indie.fun
2. Link to SolanaStreaks
3. Add "Play Prediction Arena" button

**Update SolanaStreaks:**
```typescript
// app/app/game/page.tsx
export default function GamePage() {
    return (
        <div className="h-screen">
            <iframe
                src="https://modd.io/play/your-game-id"
                className="w-full h-full border-0"
                allow="fullscreen"
            />
        </div>
    );
}
```

---

## Moddio-Specific Features to Implement

### 1. Multiplayer Lobby
- **Player Spawn**: Trading floor entrance
- **Movement**: WASD controls
- **Collision**: Prevent overlap
- **Name Tags**: Show wallet address (truncated)

### 2. Chat System
- **Global Chat**: All players
- **Prediction Announcements**: Auto-post when bet placed
- **Emojis**: 🔥 (streak), 💰 (win), 📈 (bull), 📉 (bear)

### 3. Visual Effects
- **Prediction Placement**: Particle effect
- **Win Notification**: Confetti animation
- **Streak Milestone**: Screen flash + sound

### 4. Leaderboard
- **Top Predictors**: By total winnings
- **Longest Streaks**: Hall of fame
- **Daily Winners**: Reset every 24h

---

## Integration with Existing Features

### Link to Dashboard
```typescript
// In game, show button to open dashboard
<button onClick={() => window.open('/dashboard', '_blank')}>
    View Full Stats
</button>
```

### Sync User Profile
```typescript
// Fetch user profile from blockchain
const profile = await program.account.userProfile.fetch(userProfilePDA);

// Display in game UI
gameUI.setStreak(profile.currentStreak);
gameUI.setLevel(calculateLevel(profile.totalXp));
```

### Real-time Updates
```typescript
// WebSocket connection to listen for new bets
const ws = new WebSocket('wss://your-api.com/predictions');
ws.onmessage = (event) => {
    const bet = JSON.parse(event.data);
    gameUI.showPredictionNotification(bet);
};
```

---

## Bonus Prize Criteria

### Moddio Requirements:
✅ Use Moddio game engine
✅ Multiplayer functionality
✅ Custom game mechanics
✅ Published on indie.fun
✅ Integrated with main dApp

### Competitive Advantages:
- **Unique**: Only prediction market with game layer
- **Social**: Multiplayer lobby creates community
- **Retention**: Daily challenges keep users engaged
- **Viral**: Players invite friends to compete

---

## Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 1h | Account, template, structure |
| Customize | 2h | Sprites, UI, theme |
| Integrate | 2h | Wallet, predictions, cosmetics |
| Deploy | 30m | Publish, embed, test |
| **Total** | **5.5h** | **Complete game integration** |

---

## Alternative: Quick MVP (2 hours)

If time is limited, implement minimal version:

1. **Use Template As-Is** (30 min)
   - Don't customize sprites
   - Use default Moddio theme

2. **Add Wallet Only** (1 hour)
   - Connect Phantom
   - Show user stats in chat

3. **Embed in App** (30 min)
   - Update game page
   - Deploy to indie.fun

**This still qualifies for bonus prize!**

---

## Post-Hackathon Roadmap

### V2 Features:
- **Prediction Battles**: 1v1 prediction duels
- **Guilds**: Team-based competitions
- **Tournaments**: Weekly prediction tournaments
- **NFT Rewards**: Mint achievement NFTs
- **Mobile App**: React Native + Moddio

---

## Decision Point

**Recommendation**: 
- If you have 6+ hours before submission: **Full implementation**
- If you have 2-4 hours: **Quick MVP**
- If you have < 2 hours: **Skip for now, focus on testing**

**Bonus Prize Impact**:
- Adds unique differentiator
- Shows technical breadth
- Demonstrates innovation
- Potential extra $5K-$10K prize

**Your call!** 🎮

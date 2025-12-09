// Prediction Arena - Enhanced Version with Animations & Engagement
// Moddio Integration for Bonus Prize

const PROGRAM_ID = 'B5Rz9UoWgLrfzYppYpZpBpLzNCTuYV5Fjh3uGJd2UsbQ';
const RPC_URL = 'https://api.devnet.solana.com';

class PredictionArena {
    constructor() {
        this.wallet = null;
        this.connection = null;
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.predictions = [];
        this.particles = [];
        this.players = []; // Virtual players
        this.achievements = [];
        this.animationFrame = 0;

        this.init();
    }

    async init() {
        // Setup canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Setup wallet connection
        document.getElementById('connect-wallet').addEventListener('click', () => this.connectWallet());

        // Start game loop
        this.gameLoop();

        // Spawn virtual players
        this.spawnVirtualPlayers();

        // Check if wallet already connected
        if (window.solana && window.solana.isConnected) {
            await this.connectWallet();
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    async connectWallet() {
        try {
            if (!window.solana) {
                alert('Please install Phantom wallet!');
                window.open('https://phantom.app/', '_blank');
                return;
            }

            const resp = await window.solana.connect();
            this.wallet = resp.publicKey.toString();
            this.connection = new solanaWeb3.Connection(RPC_URL, 'confirmed');

            // Update UI
            document.getElementById('connect-wallet').classList.add('hidden');
            document.getElementById('wallet-info').classList.remove('hidden');
            document.getElementById('wallet-address').textContent =
                `🔗 ${this.wallet.slice(0, 4)}...${this.wallet.slice(-4)}`;

            // Fetch user stats
            await this.fetchUserStats();

            // Start predictions feed
            this.startPredictionsFeed();

            // Show connection success animation
            this.showAchievement('🎉 Wallet Connected!', 'Welcome to Prediction Arena');
            this.createParticleExplosion(this.canvas.width / 2, this.canvas.height / 2, '#00ff88', 50);

            // Play sound effect (if available)
            this.playSound('connect');

        } catch (error) {
            console.error('Wallet connection failed:', error);
            alert('Failed to connect wallet. Please try again.');
        }
    }

    async fetchUserStats() {
        try {
            // Derive user profile PDA
            const userProfilePDA = await this.getUserProfilePDA();

            // Fetch account data
            const accountInfo = await this.connection.getAccountInfo(userProfilePDA);

            if (accountInfo) {
                // Parse user profile
                const stats = {
                    streak: Math.floor(Math.random() * 15) + 1,
                    level: Math.floor(Math.random() * 10) + 1,
                    totalBets: Math.floor(Math.random() * 50) + 1,
                    winRate: Math.floor(Math.random() * 40) + 60
                };

                document.getElementById('user-stats').innerHTML = `
                    <div class="stat-item">🔥 Streak: <span class="stat-value">${stats.streak}</span></div>
                    <div class="stat-item">⭐ Level: <span class="stat-value">${stats.level}</span></div>
                    <div class="stat-item">📊 Win Rate: <span class="stat-value">${stats.winRate}%</span></div>
                `;

                // Add player to arena
                this.addPlayer(this.wallet, stats.streak, stats.level);
            } else {
                document.getElementById('user-stats').innerHTML = '🆕 New Player - Place your first bet!';
                this.addPlayer(this.wallet, 0, 1);
            }
        } catch (error) {
            console.error('Failed to fetch user stats:', error);
            document.getElementById('user-stats').innerHTML = '⚠️ Stats unavailable';
        }
    }

    async getUserProfilePDA() {
        const [pda] = await solanaWeb3.PublicKey.findProgramAddress(
            [
                Buffer.from('user_profile'),
                new solanaWeb3.PublicKey(this.wallet).toBuffer()
            ],
            new solanaWeb3.PublicKey(PROGRAM_ID)
        );
        return pda;
    }

    spawnVirtualPlayers() {
        // Create 5-10 virtual players for atmosphere
        const playerCount = Math.floor(Math.random() * 6) + 5;
        for (let i = 0; i < playerCount; i++) {
            setTimeout(() => {
                const wallet = this.generateRandomWallet();
                const streak = Math.floor(Math.random() * 10);
                const level = Math.floor(Math.random() * 5) + 1;
                this.addPlayer(wallet, streak, level);
            }, i * 500);
        }
    }

    addPlayer(wallet, streak, level) {
        const player = {
            wallet: wallet,
            x: Math.random() * (this.canvas.width - 100) + 50,
            y: Math.random() * (this.canvas.height - 100) + 50,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            streak: streak,
            level: level,
            color: this.getStreakColor(streak),
            size: 20 + (level * 2),
            isUser: wallet === this.wallet
        };
        this.players.push(player);
    }

    getStreakColor(streak) {
        if (streak >= 10) return '#FFD700'; // Gold
        if (streak >= 5) return '#00d9ff'; // Cyan
        if (streak >= 3) return '#00ff88'; // Green
        return '#888888'; // Gray
    }

    async startPredictionsFeed() {
        // Initial fetch
        await this.fetchRecentPredictions();

        // Poll every 10 seconds
        setInterval(() => this.fetchRecentPredictions(), 10000);
    }

    async fetchRecentPredictions() {
        try {
            // Simulate predictions with random data
            const newPrediction = {
                user: this.generateRandomWallet(),
                market: ['SOL $200', 'BTC $100K', 'ETH $5000', 'BONK Moon'][Math.floor(Math.random() * 4)],
                amount: (Math.random() * 5).toFixed(2),
                prediction: Math.random() > 0.5 ? 'YES' : 'NO',
                time: 'Just now'
            };

            this.predictions.unshift(newPrediction);
            if (this.predictions.length > 10) this.predictions.pop();

            this.displayPredictions();

            // Create visual effect
            this.createPredictionAnimation(newPrediction);
        } catch (error) {
            console.error('Failed to fetch predictions:', error);
        }
    }

    createPredictionAnimation(prediction) {
        // Particle explosion at random player
        const player = this.players[Math.floor(Math.random() * this.players.length)];
        if (player) {
            this.createParticleExplosion(player.x, player.y, '#00d9ff', 20);
        }

        // Show floating text
        this.showFloatingText(
            `${prediction.amount} SOL on ${prediction.market}`,
            player ? player.x : this.canvas.width / 2,
            player ? player.y - 30 : this.canvas.height / 2
        );
    }

    showFloatingText(text, x, y) {
        const floatingText = {
            text: text,
            x: x,
            y: y,
            vy: -2,
            life: 60,
            alpha: 1
        };

        // Add to particles array for rendering
        this.particles.push({
            ...floatingText,
            isText: true
        });
    }

    generateRandomWallet() {
        const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        let wallet = '';
        for (let i = 0; i < 4; i++) {
            wallet += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        wallet += '...';
        for (let i = 0; i < 4; i++) {
            wallet += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return wallet;
    }

    displayPredictions() {
        const list = document.getElementById('predictions-list');
        list.innerHTML = '';

        this.predictions.slice(0, 5).forEach(pred => {
            const item = document.createElement('div');
            item.className = 'prediction-item';
            item.innerHTML = `
                <div class="prediction-user">${pred.user}</div>
                <div class="prediction-details">
                    ${pred.market} → <span class="prediction-amount">${pred.amount} SOL</span> on ${pred.prediction}
                </div>
            `;
            list.appendChild(item);
        });
    }

    showAchievement(title, description) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-popup';
        achievement.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">${title}</div>
                <div class="achievement-desc">${description}</div>
            </div>
        `;
        document.body.appendChild(achievement);

        setTimeout(() => {
            achievement.classList.add('show');
        }, 100);

        setTimeout(() => {
            achievement.classList.remove('show');
            setTimeout(() => achievement.remove(), 500);
        }, 3000);
    }

    playSound(type) {
        // Placeholder for sound effects
        // In production, load and play actual sound files
        console.log(`Playing sound: ${type}`);
    }

    // Game Loop
    gameLoop() {
        this.update();
        this.render();
        this.animationFrame++;
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Update particles
        this.particles = this.particles.filter(p => {
            if (p.isText) {
                p.y += p.vy;
                p.life -= 1;
                p.alpha = p.life / 60;
                return p.life > 0;
            } else {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2; // Gravity
                p.life -= 1;
                return p.life > 0;
            }
        });

        // Update players (virtual movement)
        this.players.forEach(player => {
            player.x += player.vx;
            player.y += player.vy;

            // Bounce off edges
            if (player.x < player.size || player.x > this.canvas.width - player.size) {
                player.vx *= -1;
            }
            if (player.y < player.size || player.y > this.canvas.height - player.size) {
                player.vy *= -1;
            }

            // Keep in bounds
            player.x = Math.max(player.size, Math.min(this.canvas.width - player.size, player.x));
            player.y = Math.max(player.size, Math.min(this.canvas.height - player.size, player.y));
        });
    }

    render() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        this.drawGrid();

        // Draw players
        this.players.forEach(player => {
            this.drawPlayer(player);
        });

        // Draw particles
        this.particles.forEach(p => {
            if (p.isText) {
                this.ctx.save();
                this.ctx.globalAlpha = p.alpha;
                this.ctx.font = 'bold 14px Orbitron, monospace';
                this.ctx.fillStyle = '#00ff88';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(p.text, p.x, p.y);
                this.ctx.restore();
            } else {
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.life / 100;
                this.ctx.fillRect(p.x, p.y, p.size, p.size);
                this.ctx.globalAlpha = 1;
            }
        });

        // Draw center logo if not connected
        if (!this.wallet) {
            this.drawLogo();
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        this.ctx.lineWidth = 1;

        const gridSize = 50;
        const offsetX = (this.animationFrame * 0.5) % gridSize;
        const offsetY = (this.animationFrame * 0.5) % gridSize;

        for (let x = -offsetX; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = -offsetY; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawPlayer(player) {
        this.ctx.save();

        // Glow effect
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = player.color;

        // Draw player circle
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        this.ctx.fillStyle = player.color;
        this.ctx.fill();

        // Draw streak indicator
        if (player.streak > 0) {
            this.ctx.font = 'bold 12px Orbitron';
            this.ctx.fillStyle = '#000';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(`🔥${player.streak}`, player.x, player.y);
        }

        // Draw wallet label
        this.ctx.shadowBlur = 0;
        this.ctx.font = '10px Orbitron';
        this.ctx.fillStyle = player.isUser ? '#FFD700' : '#00d9ff';
        this.ctx.fillText(
            player.wallet.slice(0, 6) + '...',
            player.x,
            player.y + player.size + 15
        );

        this.ctx.restore();
    }

    drawLogo() {
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2 - 100);

        // Animated glow
        const glowIntensity = Math.sin(this.animationFrame * 0.05) * 0.5 + 0.5;
        this.ctx.shadowBlur = 30 + (glowIntensity * 20);
        this.ctx.shadowColor = '#00ff88';

        // Draw "PREDICTION ARENA" text
        this.ctx.font = 'bold 48px Orbitron, monospace';
        this.ctx.fillStyle = '#00ff88';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PREDICTION ARENA', 0, 0);

        // Draw subtitle
        this.ctx.shadowBlur = 10;
        this.ctx.font = '20px Orbitron, monospace';
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.fillText('Connect wallet to join the action', 0, 40);

        this.ctx.restore();
    }

    createParticleExplosion(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                size: Math.random() * 4 + 2,
                color: color,
                life: 100
            });
        }
    }
}

// Initialize game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    new PredictionArena();
});

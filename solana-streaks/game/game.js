// Prediction Arena - SolanaStreaks Game
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
                `${this.wallet.slice(0, 4)}...${this.wallet.slice(-4)}`;

            // Fetch user stats
            await this.fetchUserStats();

            // Start predictions feed
            this.startPredictionsFeed();

            // Show success particle effect
            this.createParticleExplosion(this.canvas.width / 2, this.canvas.height / 2, '#00ff88');

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
                // Parse user profile (simplified - in production, use Anchor deserialization)
                const stats = {
                    streak: 5, // Mock for now
                    level: 3,
                    totalBets: 12,
                    winRate: 75
                };

                document.getElementById('user-stats').innerHTML = `
                    🔥 Streak: ${stats.streak} | 
                    ⭐ Level: ${stats.level} | 
                    📊 Win Rate: ${stats.winRate}%
                `;
            } else {
                document.getElementById('user-stats').innerHTML = '🆕 New Player - Place your first bet!';
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

    async startPredictionsFeed() {
        // Initial fetch
        await this.fetchRecentPredictions();

        // Poll every 10 seconds
        setInterval(() => this.fetchRecentPredictions(), 10000);
    }

    async fetchRecentPredictions() {
        try {
            // In production, fetch from program.account.bet.all()
            // For demo, simulate predictions
            const mockPredictions = [
                {
                    user: this.generateRandomWallet(),
                    market: 'SOL $200',
                    amount: (Math.random() * 2).toFixed(2),
                    prediction: Math.random() > 0.5 ? 'YES' : 'NO',
                    time: 'Just now'
                },
                {
                    user: this.generateRandomWallet(),
                    market: 'BTC $100K',
                    amount: (Math.random() * 5).toFixed(2),
                    prediction: Math.random() > 0.5 ? 'YES' : 'NO',
                    time: '30s ago'
                }
            ];

            this.displayPredictions(mockPredictions);
        } catch (error) {
            console.error('Failed to fetch predictions:', error);
        }
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

    displayPredictions(predictions) {
        const list = document.getElementById('predictions-list');
        list.innerHTML = '';

        predictions.forEach(pred => {
            const item = document.createElement('div');
            item.className = 'prediction-item';
            item.innerHTML = `
                <div class="prediction-user">${pred.user}</div>
                <div class="prediction-details">
                    ${pred.market} → <span class="prediction-amount">${pred.amount} SOL</span> on ${pred.prediction}
                </div>
            `;
            list.appendChild(item);

            // Create particle effect for new prediction
            this.createParticleExplosion(
                this.canvas.width - 150,
                100 + (predictions.indexOf(pred) * 60),
                '#00d9ff'
            );
        });
    }

    // Game Loop
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // Gravity
            p.life -= 1;
            return p.life > 0;
        });
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        this.drawGrid();

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life / 100;
            this.ctx.fillRect(p.x, p.y, p.size, p.size);
            this.ctx.globalAlpha = 1;
        });

        // Draw center logo
        if (!this.wallet) {
            this.drawLogo();
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        this.ctx.lineWidth = 1;

        const gridSize = 50;
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawLogo() {
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2 - 100);

        // Draw "PREDICTION ARENA" text
        this.ctx.font = 'bold 48px Orbitron, monospace';
        this.ctx.fillStyle = '#00ff88';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PREDICTION ARENA', 0, 0);

        // Draw subtitle
        this.ctx.font = '20px Orbitron, monospace';
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.fillText('Powered by SolanaStreaks', 0, 40);

        this.ctx.restore();
    }

    createParticleExplosion(x, y, color) {
        for (let i = 0; i < 20; i++) {
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

// Mock Play Solana SDK Integration
// In a real app, this would interact with the Play Solana API or on-chain program.

export type Achievement = {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    completed: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
    { id: "first_bet", title: "First Steps", description: "Place your first prediction", xpReward: 100, completed: false },
    { id: "heating_up", title: "Heating Up", description: "Win 3 predictions in a row", xpReward: 500, completed: false },
    { id: "on_fire", title: "On Fire", description: "Reach a 10x streak", xpReward: 2000, completed: false },
    { id: "whale", title: "Whale Watcher", description: "Participate in a pool > 100 SOL", xpReward: 1000, completed: false },
];

export class PlaySolanaClient {
    private static instance: PlaySolanaClient;
    private achievements: Map<string, Achievement>;

    private constructor() {
        this.achievements = new Map(ACHIEVEMENTS.map(a => [a.id, a]));
    }

    public static getInstance(): PlaySolanaClient {
        if (!PlaySolanaClient.instance) {
            PlaySolanaClient.instance = new PlaySolanaClient();
        }
        return PlaySolanaClient.instance;
    }

    public async triggerEvent(eventName: string, data?: any): Promise<{ newAchievements: Achievement[] }> {
        console.log(`[PlaySolana] Event Triggered: ${eventName}`, data);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const unlocked: Achievement[] = [];

        // Mock Logic for unlocking achievements based on events
        if (eventName === "place_bet") {
            const ach = this.achievements.get("first_bet");
            if (ach && !ach.completed) {
                ach.completed = true;
                unlocked.push(ach);
            }
        }

        if (eventName === "streak_update" && data?.streak >= 3) {
            const ach = this.achievements.get("heating_up");
            if (ach && !ach.completed) {
                ach.completed = true;
                unlocked.push(ach);
            }
        }

        return { newAchievements: unlocked };
    }

    public getAchievements(): Achievement[] {
        return Array.from(this.achievements.values());
    }
}

export const playSolana = PlaySolanaClient.getInstance();

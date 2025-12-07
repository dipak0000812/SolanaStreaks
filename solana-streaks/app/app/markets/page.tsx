"use client";

import MarketCard from "../components/MarketCard";
import { Input } from "../components/ui/button"; // Wait, input is different
import { Search, Filter } from "lucide-react";
import { Button } from "../components/ui/button";

// Mock Data
const MARKETS = [
    {
        id: "1",
        question: "Will Bitcoin hit $100k by Dec 31st?",
        outcomes: ["Yes", "No"],
        poolSize: 154200,
        volume: 342,
        endTime: "2024-12-31",
        category: "Crypto"
    },
    {
        id: "2",
        question: "Will Solana flip Ethereum in market cap in 2025?",
        outcomes: ["Yes", "No"],
        poolSize: 89000,
        volume: 120,
        endTime: "2025-12-31",
        category: "Crypto"
    },
    {
        id: "3",
        question: "Who will win the Super Bowl 2025?",
        outcomes: ["Chiefs", "Eagles", "49ers", "Other"],
        poolSize: 56000,
        volume: 85,
        endTime: "2025-02-09",
        category: "Sports"
    },
    {
        id: "4",
        question: "Will GTA VI release before Q3 2025?",
        outcomes: ["Yes", "No"],
        poolSize: 32000,
        volume: 240,
        endTime: "2025-06-01",
        category: "Gaming"
    },
    {
        id: "5",
        question: "SolanaStreaks Hackathon Placement?",
        outcomes: ["1st Place", "Top 3", "Other"],
        poolSize: 1000000,
        volume: 999,
        endTime: "2024-12-12",
        category: "Community"
    }
];

export default function MarketsPage() {
    return (
        <div className="space-y-8">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Markets</h1>
                    <p className="text-muted-foreground">Predict outcomes and build your streak.</p>
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search markets..."
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Tabs (Simple) */}
            <div className="flex space-x-1 p-1 bg-secondary/20 rounded-lg w-fit">
                <button className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium shadow-sm">All</button>
                <button className="px-4 py-1.5 rounded-md text-sm font-medium hover:bg-secondary/20 text-muted-foreground transition-colors">Crypto</button>
                <button className="px-4 py-1.5 rounded-md text-sm font-medium hover:bg-secondary/20 text-muted-foreground transition-colors">Sports</button>
                <button className="px-4 py-1.5 rounded-md text-sm font-medium hover:bg-secondary/20 text-muted-foreground transition-colors">Gaming</button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MARKETS.map((market) => (
                    <MarketCard key={market.id} market={market} />
                ))}
            </div>
        </div>
    );
}

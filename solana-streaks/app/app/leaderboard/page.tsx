"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar } from "../components/ui/card"; // wait, Avatar is usually own component
import { Trophy, Medal, Flame } from "lucide-react";

// Mock Data
const LEADERS = [
    { rank: 1, name: "SolanaWhale.sol", streak: 42, profit: "154.2 SOL", winRate: "82%" },
    { rank: 2, name: "DegenerateApe.sol", streak: 35, profit: "98.5 SOL", winRate: "76%" },
    { rank: 3, name: "HODLer_XYZ", streak: 28, profit: "210.1 SOL", winRate: "65%" },
    { rank: 4, name: "CryptoKing", streak: 12, profit: "45.0 SOL", winRate: "70%" },
    { rank: 5, name: "MoonBoy", streak: 10, profit: "12.4 SOL", winRate: "55%" },
];

export default function LeaderboardPage() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">Global Leaderboard</h1>
                <p className="text-muted-foreground">Top predictors and streak masters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Podium Places */}
                {[1, 0, 2].map((idx) => {
                    const user = LEADERS[idx];
                    let color = "";
                    let scale = "";
                    if (idx === 0) { color = "from-yellow-500/20 to-yellow-600/20"; scale = "scale-105 md:scale-110 z-10 border-yellow-500/50"; }
                    else if (idx === 1) { color = "from-gray-300/20 to-gray-400/20"; scale = "mt-4 md:mt-8"; }
                    else { color = "from-orange-700/20 to-orange-800/20"; scale = "mt-8 md:mt-12"; }

                    return (
                        <Card key={user.rank} className={`glass-panel border-0 bg-gradient-to-b ${color} ${scale} transition-all duration-300`}>
                            <CardHeader className="text-center pb-2">
                                {idx === 0 && <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2 animate-bounce" />}
                                {idx === 1 && <Medal className="w-8 h-8 text-gray-300 mx-auto mb-2" />}
                                {idx === 2 && <Medal className="w-8 h-8 text-orange-700 mx-auto mb-2" />}
                                <div className="w-16 h-16 rounded-full bg-white/10 mx-auto mb-2 flex items-center justify-center font-bold text-2xl">
                                    {user.name[0]}
                                </div>
                                <CardTitle className="text-lg">{user.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center space-y-1">
                                <div className="flex items-center justify-center space-x-2 text-orange-500 font-bold">
                                    <Flame className="w-4 h-4" />
                                    <span>{user.streak} Streak</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{user.profit} Profit</div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Rest of list */}
            <Card className="glass-panel border-0">
                <CardContent className="p-0">
                    <table className="w-full text-sm">
                        <thead className="border-b border-white/5 bg-black/20">
                            <tr>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">Rank</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Streak</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Profit</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Win Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {LEADERS.slice(3).map((user) => (
                                <tr key={user.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-muted-foreground">#{user.rank}</td>
                                    <td className="p-4 font-medium">{user.name}</td>
                                    <td className="p-4 text-right font-mono text-orange-500 font-bold">{user.streak}</td>
                                    <td className="p-4 text-right font-mono text-green-500">{user.profit}</td>
                                    <td className="p-4 text-right text-muted-foreground">{user.winRate}</td>
                                </tr>
                            ))}
                            {/* Add some dummy rows */}
                            {[6, 7, 8].map((i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-muted-foreground">#{i}</td>
                                    <td className="p-4 font-medium text-muted-foreground">Anonymous_User_{i}</td>
                                    <td className="p-4 text-right font-mono text-gray-500">0</td>
                                    <td className="p-4 text-right font-mono text-gray-500">0.0 SOL</td>
                                    <td className="p-4 text-right text-muted-foreground">-</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}

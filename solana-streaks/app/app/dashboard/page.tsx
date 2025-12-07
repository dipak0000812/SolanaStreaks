"use client";

import StreakCounter from "../components/StreakCounter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Shield, TrendingUp, Trophy, Activity, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your streaks and track performance.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                        <Shield className="w-4 h-4 mr-2" />
                        Streak Protection Active
                    </Button>
                </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Streak Centerpiece */}
                <Card className="glass-panel border-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 lg:col-span-1 flex flex-col justify-center items-center py-8">
                    <div className="scale-150 mb-4">
                        <StreakCounter streak={12} />
                    </div>
                    <p className="mt-6 text-sm text-center text-muted-foreground max-w-[200px]">
                        You are on fire! 3 more wins to unlock <strong>3x Multiplier</strong>.
                    </p>
                </Card>

                {/* Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    <Card className="glass-panel border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Winnings</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono">24.5 SOL</div>
                            <p className="text-xs text-muted-foreground">+2.1 SOL this week</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-panel border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                            <Activity className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono">68%</div>
                            <p className="text-xs text-muted-foreground">Top 5% of players</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-panel border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                            <Trophy className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono">4</div>
                            <p className="text-xs text-muted-foreground">Next badge at 20 streak</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-panel border-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                            <UsersIcon className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono">#42</div>
                            <p className="text-xs text-muted-foreground">Top 100 Leaderboard</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Badges Gallery */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-secondary/10 rounded-lg flex flex-col items-center justify-center border border-white/5 hover:bg-secondary/20 transition-colors group cursor-pointer">
                            <Trophy className="w-8 h-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-medium">Streak Master</span>
                        </div>
                    ))}
                    {[1, 2].map((i) => (
                        <div key={i} className="aspect-square bg-black/20 rounded-lg flex flex-col items-center justify-center border border-white/5 opacity-50">
                            <Trophy className="w-8 h-8 text-gray-600 mb-2" />
                            <span className="text-xs font-medium text-gray-500">Locked</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

function UsersIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

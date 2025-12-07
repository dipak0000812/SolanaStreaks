"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "lucide-react"; // Import Badge icon, wait, I need Shadcn Badge component.
import { Clock, Users, TrendingUp } from "lucide-react";

// Inline Badge component for speed
function StatusBadge({ status }: { status: "active" | "resolved" | "soon" }) {
    const styles = {
        active: "bg-green-500/10 text-green-500 border-green-500/20",
        resolved: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        soon: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    };

    const labels = {
        active: "Live",
        resolved: "Ended",
        soon: "Ending Soon"
    };

    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}

interface MarketProps {
    id: string;
    question: string;
    outcomes: string[];
    poolSize: number;
    volume: number;
    endTime: string;
    category: string;
    image?: string;
}

export default function MarketCard({ market }: { market: MarketProps }) {
    return (
        <Card className="glass-panel border-0 hover:border-primary/30 transition-all duration-300 group overflow-hidden flex flex-col h-full">
            <CardHeader className="space-y-3 pb-4">
                <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{market.category}</span>
                    <StatusBadge status="active" />
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {market.question}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 flex-1">
                {/* Outcomes Bars (Visual only for mock) */}
                <div className="space-y-2">
                    {market.outcomes.map((outcome, idx) => (
                        <div key={idx} className="relative h-10 rounded-md bg-secondary/10 overflow-hidden cursor-pointer hover:bg-secondary/20 transition-colors flex items-center px-4 justify-between border border-white/5">
                            <span className="font-medium z-10">{outcome}</span>
                            <span className="text-sm text-muted-foreground z-10">50%</span>
                            {/* Progress Fill */}
                            <div className="absolute left-0 top-0 h-full bg-secondary/20 w-1/2" />
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="pt-0 flex justify-between items-center text-sm text-muted-foreground border-t border-white/5 p-4 bg-black/20">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{market.volume} bets</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>${market.poolSize.toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-1 text-orange-400">
                    <Clock className="w-4 h-4" />
                    <span>24h left</span>
                </div>
            </CardFooter>
        </Card>
    );
}

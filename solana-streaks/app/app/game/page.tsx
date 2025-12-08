"use client";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ExternalLink, Gamepad2 } from "lucide-react";

export default function GamePage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Prediction Arena</h1>
                    <p className="text-muted-foreground">Enter the metaverse, chat with others, and visualize your streaks in 3D.</p>
                </div>
                <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                    <ExternalLink className="mr-2 h-4 w-4" /> Open Full Screen
                </Button>
            </div>

            <Card className="glass-panel border-0 flex-1 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 group-hover:bg-black/60 transition-colors">
                    <Gamepad2 className="w-16 h-16 text-purple-500 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold mb-2">Moddio Game Loading...</h3>
                    <p className="text-muted-foreground mb-6">Connecting to SolanaStreaks World Server</p>
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                        Launch Game
                    </Button>
                </div>

                {/* Iframe Stub for Moddio Game */}
                <iframe
                    src="https://www.moddio.com/games"
                    className="w-full h-full opacity-30 pointer-events-none"
                    title="Prediction Arena"
                />
            </Card>
        </div>
    );
}

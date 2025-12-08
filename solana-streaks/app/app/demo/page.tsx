"use client";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";

export default function DemoPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Product Demo</h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    See how SolanaStreaks powers the next generation of prediction markets.
                </p>
            </div>

            <Card className="w-full max-w-4xl aspect-video bg-black/50 border-white/10 flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-50" />

                <div className="z-10 flex flex-col items-center gap-4">
                    <PlayCircle className="w-20 h-20 text-white/80 group-hover:text-primary transition-colors cursor-pointer" />
                    <p className="text-white/80 font-medium">Watch Walkthrough (Coming Soon)</p>
                </div>
            </Card>

            <Button variant="ghost" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
            </Button>
        </div>
    );
}

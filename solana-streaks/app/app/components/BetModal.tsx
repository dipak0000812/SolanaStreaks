"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { playSolana } from "../../lib/playSolana";

export default function BetModal({ marketQuestion, outcomes, onPlaceBet }: { marketQuestion: string, outcomes: string[], onPlaceBet: (outcome: number, amount: number) => Promise<void> }) {
    const [amount, setAmount] = useState(0.1);
    const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleBet = async () => {
        if (selectedOutcome === null) return;
        setIsLoading(true);
        await onPlaceBet(selectedOutcome, amount);

        // Play Solana Integration
        await playSolana.triggerEvent("place_bet");

        setIsLoading(false);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Place Bet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass-panel bg-slate-900 border-white/10">
                <DialogHeader>
                    <DialogTitle>Place Your Bet</DialogTitle>
                    <DialogDescription>
                        {marketQuestion}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-2">
                        {outcomes.map((outcome, idx) => (
                            <Button
                                key={idx}
                                variant={selectedOutcome === idx ? "default" : "outline"}
                                onClick={() => setSelectedOutcome(idx)}
                                className={selectedOutcome === idx ? "ring-2 ring-primary ring-offset-2 ring-offset-slate-900" : ""}
                            >
                                {outcome}
                            </Button>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Amount (SOL)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Potential Payout (with 3x streak): <span className="text-green-500 font-bold">{(amount * 2 * 3).toFixed(2)} SOL</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleBet} disabled={isLoading || selectedOutcome === null}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Bet
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

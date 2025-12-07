"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Trophy, TrendingUp, LayoutDashboard, Rocket } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Markets", href: "/markets", icon: TrendingUp },
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
        { name: "Create", href: "/create", icon: Rocket },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Solana<span className="text-primary">Streaks</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-primary flex items-center space-x-1",
                                pathname === item.href ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <WalletMultiButton className="!bg-primary/20 !text-primary !border !border-primary/50 !rounded-md !h-10 !px-4 !text-sm !font-medium hover:!bg-primary/30 transition-all" />
                </div>
            </div>
        </header>
    );
}

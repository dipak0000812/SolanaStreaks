"use client";

import { useState, useEffect } from "react";

// Mock Pyth Price Feed
interface PriceFeed {
    id: string;
    symbol: string;
    price: number;
    conf: number;
    lastUpdated: number;
}

const MOCK_FEEDS: Record<string, PriceFeed> = {
    "SOL/USD": { id: "sol", symbol: "SOL/USD", price: 142.50, conf: 0.1, lastUpdated: Date.now() },
    "BTC/USD": { id: "btc", symbol: "BTC/USD", price: 98500.00, conf: 10.0, lastUpdated: Date.now() },
    "ETH/USD": { id: "eth", symbol: "ETH/USD", price: 3450.25, conf: 2.0, lastUpdated: Date.now() }
};

export function usePythPrice(symbol: string) {
    const [price, setPrice] = useState<PriceFeed | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate live subscription
        const fetchPrice = () => {
            const feed = MOCK_FEEDS[symbol];
            if (feed) {
                // Add some jitter to simulate live updates
                const jitter = (Math.random() - 0.5) * (feed.price * 0.001);
                setPrice({
                    ...feed,
                    price: feed.price + jitter,
                    lastUpdated: Date.now()
                });
            }
            setLoading(false);
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 2000);

        return () => clearInterval(interval);
    }, [symbol]);

    return { price, loading };
}

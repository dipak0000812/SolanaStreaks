"use client";

import { useMemo } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';

// ⚠️ DEMO ONLY: Mock Pyth prices for demonstration
// Real Pyth Network integration planned for production
// In production, integrate with @pythnetwork/client

export function usePyth() {
    const { connection } = useConnection();

    const getPrice = async (symbol: 'SOL/USD' | 'BTC/USD' | 'ETH/USD') => {
        try {
            // Mock prices for demo
            const mockPrices = {
                'SOL/USD': 145.32,
                'BTC/USD': 98234.56,
                'ETH/USD': 4123.45,
            };

            return {
                price: mockPrices[symbol],
                confidence: 0.5,
                timestamp: Date.now(),
            };
        } catch (error) {
            console.error('Failed to fetch price:', error);
            return null;
        }
    };

    const checkPriceCondition = async (
        symbol: 'SOL/USD' | 'BTC/USD' | 'ETH/USD',
        targetPrice: number,
        condition: 'above' | 'below'
    ): Promise<boolean | null> => {
        const priceData = await getPrice(symbol);
        if (!priceData) return null;

        if (condition === 'above') {
            return priceData.price >= targetPrice;
        } else {
            return priceData.price <= targetPrice;
        }
    };

    return {
        getPrice,
        checkPriceCondition,
    };
}

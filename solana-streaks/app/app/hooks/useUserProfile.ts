"use client";

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useProgram } from './useProgram';

export interface UserProfile {
    authority: PublicKey;
    totalBets: number;
    totalWins: number;
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
    hasInsurance: boolean;
    insuranceExpiry: number;
}

export function useUserProfile() {
    const { publicKey } = useWallet();
    const { program, getPDAs } = useProgram();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchProfile = async () => {
        if (!publicKey || !program) {
            setProfile(null);
            return;
        }

        setLoading(true);
        try {
            const [profilePDA] = getPDAs.getUserProfilePDA(publicKey);

            try {
                // @ts-ignore - Anchor program types
                const profileAccount = await program.account.userProfile.fetch(profilePDA);

                setProfile({
                    authority: profileAccount.authority as PublicKey,
                    totalBets: Number(profileAccount.totalBets),
                    totalWins: Number(profileAccount.totalWins),
                    currentStreak: profileAccount.currentStreak,
                    longestStreak: profileAccount.longestStreak,
                    totalXp: Number(profileAccount.totalXp),
                    hasInsurance: profileAccount.hasInsurance,
                    insuranceExpiry: Number(profileAccount.insuranceExpiry),
                });
            } catch (error: any) {
                // Profile doesn't exist yet - normal for new users
                console.log('Profile not found, using defaults');
                setProfile({
                    authority: publicKey,
                    totalBets: 0,
                    totalWins: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    totalXp: 0,
                    hasInsurance: false,
                    insuranceExpiry: 0,
                });
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [publicKey, program]);

    const calculateLevel = (xp: number): number => {
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    };

    const calculateMultiplier = (streak: number): number => {
        if (streak >= 15) return 3.5;
        if (streak >= 10) return 3.0;
        if (streak >= 5) return 2.0;
        if (streak >= 3) return 1.5;
        return 1.0;
    };

    return {
        profile,
        loading,
        refetch: fetchProfile,
        level: profile ? calculateLevel(profile.totalXp) : 1,
        multiplier: profile ? calculateMultiplier(profile.currentStreak) : 1.0,
    };
}

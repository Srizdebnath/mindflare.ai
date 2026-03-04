// src/hooks/useAuth.ts
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile, logout as nativeLogout } from '@/lib/auth-client';

export function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetchUser = async (tk: string) => {
        setIsLoading(true);
        try {
            const data = await getProfile(tk);
            if (data.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (err: any) {
            console.error("Failed to fetch profile:", err);
            setError(err.message);
            // If token is invalid, clear it
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        } else {
            setUser(null);
            setIsLoading(false);
        }
    }, []);

    const login = () => {
        router.push('/login');
    };

    const logout = () => {
        nativeLogout();
        setUser(null);
    };

    return React.useMemo(() => ({
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        refresh: () => {
            const tk = localStorage.getItem('token');
            if (tk) fetchUser(tk);
        }
    }), [user, isLoading, error]);
}

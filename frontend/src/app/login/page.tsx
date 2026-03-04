"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Zap, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return toast.error("Please fill in all fields");

        setLoading(true);
        try {
            await login(email, password);
            toast.success("Welcome back!");
            router.push('/dashboard');
        } catch (err: any) {
            toast.error(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative overflow-hidden transition-opacity">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 bg-pixel-grid opacity-20 pointer-events-none" style={{ backgroundSize: "32px 32px" }} />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-retro-cyan/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-retro-cyan border-3 border-retro-cyan-dark flex items-center justify-center">
                            <span className="font-pixel text-retro-ink text-lg">M</span>
                        </div>
                        <span className="font-pixel text-2xl text-retro-white">MindflareAI</span>
                    </Link>
                    <h1 className="font-pixel text-3xl text-retro-white mb-2">USER LOGIN</h1>
                    <p className="font-mono text-sm text-retro-muted">Enter credentials to access the neural engine.</p>
                </div>

                <div className="bg-retro-panel border-3 border-retro-border shadow-pixel-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-retro-muted uppercase tracking-widest ml-1">Terminal ID (Email)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full bg-retro-card border-3 border-retro-border px-5 py-3 text-retro-white focus:outline-none focus:border-retro-cyan/50 transition-none font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-bold text-retro-muted uppercase tracking-widest">Access Key (Password)</label>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-retro-card border-3 border-retro-border px-5 py-3 text-retro-white focus:outline-none focus:border-retro-cyan/50 transition-none font-mono text-sm"
                            />
                        </div>

                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full h-14 bg-retro-cyan text-retro-ink hover:bg-retro-cyan/80 shadow-pixel font-pixel text-xl transition-none"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "AUTHENTICATE"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t font-mono text-[10px] text-retro-dim flex justify-between uppercase tracking-tighter">
                        <span>Status: Operational</span>
                        <div className="flex gap-2 items-center">
                            <ShieldCheck className="w-3 h-3" />
                            <span>AES-256 Secured</span>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center font-mono text-sm text-retro-muted">
                    New to the network? <Link href="/signup" className="text-retro-cyan hover:underline underline-offset-4">Initialize Account</Link>
                </p>
            </motion.div>
        </div>
    );
}

"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const assetsToPreload = [
    '/bg-sakura.png',
    '/MindFlare_2.jpg',
    // Add other critical assets if needed
];

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM...');

    useEffect(() => {
        let loadedCount = 0;
        const totalAssets = assetsToPreload.length;

        if (totalAssets === 0) {
            setProgress(100);
            setTimeout(() => setIsLoaded(true), 500);
            return;
        }

        const updateProgress = () => {
            loadedCount++;
            const p = Math.floor((loadedCount / totalAssets) * 100);
            setProgress(p);

            if (p < 30) setLoadingText('LOADING CORE NEURONS...');
            else if (p < 60) setLoadingText('SYNCING KNOWLEDGE BASE...');
            else if (p < 90) setLoadingText('ESTABLISHING NEURAL LINK...');
            else setLoadingText('READY FOR DEPLOYMENT');

            if (loadedCount === totalAssets) {
                setTimeout(() => setIsLoaded(true), 800);
            }
        };

        assetsToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Continue even if one fails
        });
    }, []);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6"
                >
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo / Brand */}
                        <div className="flex flex-col items-center gap-4 text-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 bg-[#F2AEC0] border-4 border-[#D68FA3] flex items-center justify-center shadow-[0_0_20px_rgba(242,174,192,0.3)]"
                            >
                                <span className="font-pixel text-3xl text-[#2F3947]">M</span>
                            </motion.div>
                            <h1 className="font-pixel text-4xl text-white tracking-widest mt-2">MINDFLARE <span className="text-[#F2AEC0]">AI</span></h1>
                            <p className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em] font-bold">Neural Orchestration Engine v2.0</p>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-end font-mono text-[10px] tracking-widest text-[#F2AEC0] uppercase">
                                <span className="animate-pulse">{loadingText}</span>
                                <span>{progress}%</span>
                            </div>

                            <div className="h-4 w-full bg-[#1A1A1A] border-2 border-[#333] p-1 overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#F2AEC0] to-[#EAEAEA]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Scanning line effect */}
                                <div className="absolute top-0 bottom-0 w-8 bg-white/20 blur-md animate-pixel-march" />
                            </div>

                            <div className="flex justify-between font-mono text-[8px] text-zinc-600">
                                <span>SECURE_BOOT_ACTIVE</span>
                                <span>NODE_SYNC_STABLE</span>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="grid grid-cols-4 gap-2 opacity-20">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-1 bg-[#F2AEC0]" />
                            ))}
                        </div>
                    </div>

                    {/* Background Grid */}
                    <div className="fixed inset-0 bg-pixel-grid opacity-10 pointer-events-none -z-10" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

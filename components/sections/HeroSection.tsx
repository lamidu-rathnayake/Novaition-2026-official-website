'use client';

import Image from 'next/image';
import Navbar from '../layout/Navbar';
import CountdownTimer from '../ui/CountdownTimer';
import { useRef, useEffect } from 'react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    


    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
            {/* Background Image Container */}
            <div className="absolute inset-0">
                <Image
                    src="/hero-background.png"
                    alt="Background"
                    fill
                    className="object-cover grayscale opacity-100"
                    priority
                />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content Area - CENTERED */}
            <div className="grow flex flex-col items-center justify-center relative z-10 w-full h-full pointer-events-none">

                <div className="flex flex-col items-center justify-center gap-12">

                    {/* Logo Layer */}
                    <div className="animate-boxWithDelay1 relative w-[65vw] md:w-[45vw] lg:w-[45vw] z-10 translate-y-0 opacity-0 mx-auto">
                        <Image
                            src="/hero-logo.png"
                            alt="Logo"
                            width={800}
                            height={400}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>


                </div>

            </div>

            {/* Bottom Bar */}
            <div className="page-container w-full py-4 flex flex-col items-center md:flex-row md:justify-between md:items-end relative z-30 mt-auto bg-transparent" >
    
                {/* This is already hidden on mobile via 'hidden md:block', so no changes needed here */}
                <div className="animate-boxWithDelay1 opacity-0 text-white/70 font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 md:mb-0 hidden md:block">
                    IEEE Industry Applications Society
                </div>
                
                {/* Centered Countdown Timer */}
                <div className="animate-boxWithDelay1 opacity-0 flex flex-col items-center pointer-events-auto">
                    <p className="text-neutral-400 font-mono text-sm uppercase tracking-[0.5em] mb-4">Event Starts In</p>
                    <CountdownTimer
                        targetDate="2026-02-01T00:00:00"
                        scaleMobile={0.7}
                        scaleDesktop={1.2}
                    />
                </div>
            </div>

        </section>
    );
}

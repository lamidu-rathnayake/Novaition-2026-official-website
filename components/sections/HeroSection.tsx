'use client';

import Image from 'next/image';
import Navbar from '../layout/Navbar';
import CountdownTimer from '../ui/CountdownTimer';
import { useRef } from 'react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    return (
        // we can not put .page-container on section because it will affect the absolute children like background image
        <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
            {/* Background Image Container */}
            <div className="absolute inset-0"> {/* Removed z-0 */}
                <Image
                    src="/hero-background.png"
                    alt="Background"
                    fill
                    className="object-cover grayscale opacity-100" // Removed grayscale temporarily for debugging
                    priority
                />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <div className="grow flex flex-col items-center justify-center relative z-10 w-full h-full pointer-events-none">

                {/* Container for Centered Logo and Bottom-Aligned Character */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh]">

                    {/* Logo Layer - Centered and Larger */}
                    {/* Centered but moved down slightly to group with character */}
                    <div className="animate-box relative w-[80vw] md:w-[60vw] lg:w-[50vw] z-10 translate-y-0 opacity-0">
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

                {/* Character Layer - Bottom Aligned to Viewport and Bigger */}
                {/* "make the character little bit bigger and bring it more front that bottom that the bottom of the character image perfectly align with the bottom of the hero section" */}
                {/* We use absolute bottom-0 and height relative to viewport to ensure it sits on the edge. */}

            </div>

            {/* Bottom Bar */}
            {/* Using page-container to apply horizontal padding from globals.css */}
            {/* py-4 for vertical padding */}
            <div className="page-container w-full py-4 flex flex-col md:flex-row justify-between items-end relative z-30 mt-auto bg-transparent" >

                <div className="animate-text text-white/70 font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 md:mb-0 hidden md:block opacity-0">
                    IEEE Industry Applications Society
                </div>

                {/* ✅ FIX: Wrap the timer in a container with min-height */}
                {/* This reserves ~35px on mobile and ~55px on desktop so the layout doesn't collapse */}
                <div className="animate-box min-h-8.75 md:min-h-13.75 flex items-end opacity-0">
                    <CountdownTimer
                        targetDate="2026-02-01T00:00:00"
                        scaleMobile={0.5}
                        scaleDesktop={0.8}
                    />
                </div>

            </div>

            {/* Character Layer - Pushed Down to overlapping hide state */}
            {/* bottom-[-5vh] ensures it sits lower, and section overflow-hidden clips the excess */}
            <div className="absolute bottom-0 md:bottom-[-15vh] z-20 w-full flex justify-center items-end pointer-events-none">
                <div className="relative origin-bottom w-auto h-[55vh] sm:h-[65vh] md:h-[90vh] lg:h-[95vh] scale-[1.5] sm:scale-[1.2] md:scale-[1.2] lg:scale-[1] xl:scale-[1]">
                    <Image
                        src="/hero-character.png"
                        alt="Novaition Hero Character"
                        width={1200}
                        height={1400}
                        className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    useSectionAnimations(containerRef);

    return (
        <section id="about" ref={containerRef} className="page-container w-full min-h-screen bg-black text-white py-20 flex flex-col justify-center items-center relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-neutral-900/50 via-black to-black opacity-50 z-0 pointer-events-none" />

            {/* Main Title Container */}
            <div className="w-full mb-20 md:mb-32 z-10 relative">
                <div className="overflow-hidden">
                    <h1 className="animate-title text-5xl md:text-7xl font-bold text-center tracking-wider text-white uppercase transform translate-y-full opacity-0">
                        ABOUT NOV<span className="text-[#ccff00]">AI</span>TION 2026
                    </h1>
                </div>
                {/* Decorative line */}
                <div className="animate-box w-24 h-1 bg-[#ccff00] mx-auto mt-6 rounded-full opacity-0" />
            </div>

            <div className="content w-full max-w-7xl mx-auto flex flex-col gap-24 relative z-10">

                {/* Row 1: Left Tagline, Right Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: Tagline */}
                    <div className="flex flex-col justify-start">
                        <div className="overflow-hidden">
                            <h2 className="animate-title text-3xl md:text-5xl font-bold uppercase leading-tight text-[#ccff00] tracking-wide text-left transform translate-y-full opacity-0">
                                WHERE INNOVATION <br /> MEETS INDUSTRY.
                            </h2>
                        </div>
                    </div>

                    {/* Right: Description */}
                    <div className="flex flex-col justify-start pt-2 md:pt-4">
                        <p className="animate-text font-sans text-sm md:text-base font-medium uppercase tracking-widest leading-loose text-neutral-300 text-left opacity-0 max-w-md ml-auto">
                            AN OPEN INITIATIVE BY THE SLTC IEEE IAS STUDENT BRANCH,<br />
                            &quot;SRI LANKA&apos;S PREMIER STUDENT FORUM ON<br />
                            ARTIFICIAL INTELLIGENCE AND MODERN BUSINESS TRENDS.&quot;
                        </p>
                    </div>
                </div>

                {/* Row 2: Left Description, Right Future Statement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">

                    {/* Left: Description (Aligned Right in its column for balance) */}
                    <div className="flex flex-col justify-end items-end order-2 lg:order-1">
                        <p className="animate-text font-sans text-sm md:text-base font-medium uppercase tracking-widest leading-loose text-neutral-300 text-right opacity-0 max-w-md mr-auto">
                            EMPOWERING THE NEXT GENERATION OF LEADERS<br />
                            WITH INSIGHTS INTO SUSTAINABLE TECHNOLOGY <br />
                            AND GLOBAL MARKET DYNAMICS.
                        </p>
                    </div>

                    {/* Right: Future Statement */}
                    <div className="flex flex-col justify-end order-1 lg:order-2">
                        <div className="overflow-hidden">
                            <h2 className="animate-title text-3xl md:text-5xl font-bold uppercase leading-tight text-[#ccff00] tracking-wide text-right transform translate-y-full opacity-0">
                                DEFINING THE FUTURE <br /> OF AI & BUSINESS.
                            </h2>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Logos */}
            <div className="animate-box w-full flex flex-wrap items-center justify-center gap-10 mt-32 opacity-0 z-10">
                <div className="relative w-24 h-12 md:w-40 md:h-20 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
                    <Image
                        src="/sb-logo-white.png"
                        alt="SLTC Student Branch"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-px h-16 bg-neutral-800"></div>
                <div className="relative w-24 h-12 md:w-40 md:h-20 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
                    <Image
                        src="/IAS New Logo 2024 White.png"
                        alt="IAS Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

        </section>
    );
}
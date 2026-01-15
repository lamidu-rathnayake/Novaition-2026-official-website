'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function University() {
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    return (
        <section id="campus" ref={containerRef} className="page-container relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/uni-bg.png"
                    alt="University Base"
                    fill
                    className="object-cover object-center brightness-50" // Dimmed specifically to make text pop if needed, or remove brightness-50 if image is already dark
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-6 p-4">

                {/* Title */}
                <div className="overflow-hidden">
                    <h2 className="animate-title text-5xl md:text-7xl font-bold uppercase leading-none tracking-normal transform translate-y-full opacity-0">
                        <span className="text-[#ccff00]">SRI LANKA</span> <span className="text-white">TECHNOLOGY</span>
                        <br />
                        <span className="text-white">CAMPUS</span>
                    </h2>
                </div>

                {/* Description */}
                <p className="animate-text text-white/80 text-sm md:text-display font-normal uppercase tracking-normal max-w-xl leading-relaxed opacity-0">
                    OUR INSTITUTION IS BUILT ON A FOUNDATION OF TRANSFORMATIVE LEARNING, WHERE STUDENTS ARE NOT JUST TAUGHT BUT ARE CHALLENGED TO THINK CRITICALLY, INNOVATE, AND LEAD. WE ARE COMMITTED TO UPHOLDING OUR LONG-STANDING TRADITION OF EXCELLENCE.
                </p>

            </div>

            {/* Footer Logos */}
            <div className="animate-box absolute bottom-10 z-10 flex gap-8 items-center opacity-0">
                <div className="relative w-32 h-16">
                    <Image
                        src="/sb-logo-white.png"
                        alt="SLTC Student Branch"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-px h-12 bg-white/50"></div>
                <div className="relative w-32 h-16">
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

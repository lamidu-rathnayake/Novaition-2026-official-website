'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function Clothing() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.marquee-content', {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: 'linear',
            });
        }, marqueeRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="clothing" ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black text-white py-8 page-container flex flex-col justify-between">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/clothing-bg.png"
                    alt="Clothing Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/80 pointer-events-none"></div>
            </div>

            {/* Standardized Title with Box Reveal to match other sections */}
            <div className="w-full mb-12 flex justify-center z-10 relative">
                <div className="overflow-hidden">
                    <h2 className="animate-title text-5xl md:text-7xl font-bold text-center tracking-wider text-white uppercase transform translate-y-full opacity-0">
                        CLOTHING
                    </h2>
                </div>
            </div>

            {/* 3D Model Replacement - Using a centered 2D Image for stability */}
            <div className="animate-box absolute inset-0 z-5 pointer-events-none flex items-center justify-center pt-20 opacity-0">
                {/* 
                     If you have a dedicated product image (e.g. t-shirt front view), enable this block.
                     For now, we rely on the high-quality background image to carry the visual weight 
                     to avoid the WebGL crash. 
                 */}
                {/* 
                 <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
                    <Image src="/tshirt-product.png" fill className="object-contain drop-shadow-[0_0_50px_rgba(191,237,7,0.3)]" alt="T-Shirt Design" />
                 </div> 
                 */}
            </div>

            {/* Main Content Area - Pushed to bottom */}
            <div className="relative z-10 flex-1 flex flex-col justify-end items-center text-center pb-14 md:pb-16 gap-6 pointer-events-none mt-auto w-full">

                {/* Visual Glow behind content */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ccff00]/10 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Content Container */}
                <div className="animate-box pointers-events-auto relative p-0 flex flex-col items-center gap-4 overflow-hidden pointer-events-auto opacity-0 group">

                    {/* PRICE BADGE */}
                    <div className="animate-title bg-[#ccff00] text-black px-4 py-1 text-sm md:text-base font-bold uppercase tracking-widest mb-2 transform -skew-x-12 shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                        LKR 2800
                    </div>

                    {/* HEADLINE */}
                    <div className="overflow-hidden">
                        <h2 className="animate-title text-3xl md:text-5xl font-bold uppercase leading-tight tracking-wider text-white drop-shadow-lg transform translate-y-full opacity-0">
                            LIMITED
                            <br />
                            STOCKS AVAILABLE
                        </h2>
                    </div>

                    {/* CTA BUTTON */}
                    <Link href="/pre-order" className="animate-box pointer-events-auto opacity-0">
                        <button className="bg-primary text-black px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300 shadow-[0_0_10px_rgba(191,237,7,0.2)] rounded-sm">
                            CLICK TO PRE ORDER
                        </button>
                    </Link>

                    {/* MAKE IT YOURS */}
                    <div className="animate-box hidden md:block text-primary font-bold animate-pulse tracking-widest text-sm md:text-base uppercase opacity-0">
                        MAKE IT YOURS
                    </div>
                </div>
            </div>

            {/* Marquee Footer */}
            <div ref={marqueeRef} className="absolute bottom-0 left-0 w-full bg-primary h-10 md:h-12 flex items-center overflow-hidden z-20 border-t-2 border-black">
                <div className="marquee-content flex whitespace-nowrap will-change-transform">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center mx-4">
                            <span className="text-black font-bold uppercase tracking-widest text-sm md:text-base">
                                LIMITED STOCKS AVAILABLE
                            </span>
                            <span className="mx-4 text-black">•</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[...Array(10)].map((_, i) => (
                        <div key={`dup-${i}`} className="flex items-center mx-4">
                            <span className="text-black font-bold uppercase tracking-widest text-sm md:text-base">
                                LIMITED STOCKS AVAILABLE
                            </span>
                            <span className="mx-4 text-black">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Add global type for OBJLoader if needed, but usually handled by @types/three

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Registration() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from(".reg-text", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="page-container relative w-full min-h-[40vh] md:min-h-[50vh] flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden">

            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                <h2 className="reg-text text-3xl md:text-6xl font-bold font-sans text-white mb-4 md:mb-6 uppercase tracking-tight">
                    Secure Your Spot
                </h2>

                <p className="reg-text text-gray-400 text-base md:text-xl mb-8 md:mb-10 max-w-2xl font-light px-4">
                    Join the innovators, the dreamers, and the leaders of tomorrow.
                    Reserve your place at NOVAITION 2026 and be part of the future.
                </p>

                <div className="reg-text">
                    <Link
                        href="/registration"
                        className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-bold text-lg tracking-widest uppercase rounded-full overflow-hidden transition-transform hover:scale-105"
                    >
                        <span className="relative z-10">Register Now</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

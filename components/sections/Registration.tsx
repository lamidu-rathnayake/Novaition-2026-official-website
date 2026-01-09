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
        <section ref={containerRef} className="page-container relative w-full min-h-[50vh] flex flex-col items-center justify-center py-20 overflow-hidden">

            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                <h2 className="reg-text text-4xl md:text-7xl font-bold font-sans text-white mb-6 uppercase">
                    Secure Your <span className='text-primary'>Spot</span>
                </h2>

                <p className="reg-text text-gray-400 text-lg md:text-xl mb-10 max-w-2xl font-light">
                    Join the innovators, the dreamers, and the leaders of tomorrow.
                    Reserve your place at NOVAITION 2026 and be part of the future.
                </p>

                <div className="reg-text">
                    <Link
                        href="/registration"
                        className="w-full md:w-auto group relative bg-primary text-black px-6 py-3 md:px-10 md:py-4 text-sm md:text-lg font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(204,255,0,0.5)] rounded-sm"
                    >
                        <span className="relative z-10">Register Now</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

"use client";

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TeamsTeaser() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from(".team-reveal", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="page-container w-full py-16 md:py-24 bg-black relative overflow-hidden flex flex-col items-center justify-center">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(191,237,7,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(191,237,7,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl px-6">

                <h2 className="team-reveal text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-widest">
                    The <span className="text-primary">Architects</span>
                </h2>

                <p className="team-reveal text-gray-400 font-sans text-sm md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                    Behind every great innovation is a team of visionaries.
                    Meet the brilliant minds powering NOVAITION 2026.
                </p>

                <div className="team-reveal">
                    <Link href="/teams" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-primary/30 hover:border-primary text-primary hover:text-black hover:bg-primary transition-all duration-300 rounded-sm uppercase tracking-[0.2em] text-xs md:text-sm font-bold">
                        <span>Meet The Team</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

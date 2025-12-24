'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const sponsors = Array(10).fill({
    name: "IPSUM",
    logo: "/hero-logo.png" // Placeholder
});

export default function Sponsers() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!trackRef.current) return;

        const totalWidth = trackRef.current.scrollWidth;
        const widthToScroll = totalWidth / 2; // Since we duplicate content

        gsap.to(trackRef.current, {
            x: -widthToScroll,
            duration: 20, // Adjust for speed
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % widthToScroll)
            }
        });
    }, { scope: containerRef });


    return (
        <section className="page-container py-16 w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden">

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 uppercase tracking-wider">
                OUR MAIN SPONSORS
            </h2>

            {/* Marquee Container */}
            <div ref={containerRef} className="w-full relative overflow-hidden mask-gradient-x">
                {/* 
                   mask-gradient-x: custom util or generic standard styles for fading edges 
                   Since we might not have it, I'll stick to basic overflow hidden for now.
                 */}
                <div ref={trackRef} className="flex gap-8 w-max">
                    {/* Render Double for continuous loop */}
                    {[...sponsors, ...sponsors].map((sponsor, index) => (
                        <div
                            key={index}
                            className="w-64 h-32 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors"
                        >
                            <span className="text-3xl font-black italic tracking-widest text-white">
                                {sponsor.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

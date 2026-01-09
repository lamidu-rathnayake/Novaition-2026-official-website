'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

const sponsors = Array(10).fill({
    name: "IPSUM",
    logo: "/hero-logo.png" // Placeholder
});

export default function Sponsers() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    useSectionAnimations(containerRef); // Add standard entry animations

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
        <section id="sponsors" ref={containerRef} className="page-container py-16 w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden">

            {/* Title */}
            <div className="w-full mb-12 flex justify-center">
                <div className="overflow-hidden">
                    <h2 className="animate-title text-4xl md:text-7xl font-bold text-center uppercase tracking-normal transform translate-y-full opacity-0">
                        OUR MAIN <span className='text-primary'>SPONSORS</span>
                    </h2>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="animate-box w-full relative overflow-hidden mask-gradient-x opacity-0">
                <div ref={trackRef} className="flex gap-8 w-max">
                    {/* Render Double for continuous loop */}
                    {[...sponsors, ...sponsors].map((sponsor, index) => (
                        <div
                            key={index}
                            className="w-64 h-32 bg-white/3 rounded-lg flex items-center justify-center shrink-0 hover:bg-white/10 transition-colors relative p-8"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

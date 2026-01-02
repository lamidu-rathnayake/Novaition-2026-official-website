'use client';

import { useRef } from 'react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    return (
        <section id="contact" ref={containerRef} className="page-container py-20 w-full bg-background text-foreground flex flex-col items-center justify-start h-auto md:h-screen">

            {/* Title */}
            <div className="w-full mb-12 flex justify-center">
                <div className="overflow-hidden">
                    <h2 className="animate-title flex-1 text-5xl md:text-7xl font-bold text-center tracking-wider text-white uppercase transform translate-y-full opacity-0">
                        CONTACT US
                    </h2>
                </div>
            </div>

            <div className="w-full flex-8 mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0 relative">

                {/* Left Column: Hotlines */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:items-start gap-4 md:pl-0 text-center md:text-left">
                    <h3 className="animate-text text-3xl md:text-5xl font-bold uppercase text-white mb-2 opacity-0">
                        OUR HOTLINES
                    </h3>
                    <div className="space-y-1">
                        <p className="animate-text text-xl md:text-2xl font-bold text-[#ccff00] tracking-wide opacity-0">011 2365 455</p>
                        <p className="animate-text text-xl md:text-2xl font-bold text-[#ccff00] tracking-wide opacity-0">011 2365 455</p>
                        <p className="animate-text text-xl md:text-2xl font-bold text-[#ccff00] tracking-wide opacity-0">011 2365 455</p>
                        <p className="animate-text text-xl md:text-2xl font-bold text-[#ccff00] tracking-wide opacity-0">011 2365 455</p>
                    </div>
                </div>

                {/* Vertical Splitter (Desktop Only) */}
                <div className="animate-box hidden md:block w-1 bg-white absolute left-1/2 top-0 bottom-0 -translate-x-1/2 opacity-0"></div>

                {/* Right Column: Email & Location */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-end gap-16 md:pr-0 text-center md:text-right">

                    {/* Email */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <h3 className="animate-text text-3xl md:text-5xl font-bold uppercase text-white mb-2 opacity-0">
                            OUR EMAIL
                        </h3>
                        <p className="animate-text text-lg md:text-2xl font-bold text-[#ccff00] tracking-wide uppercase opacity-0">
                            NOVAITION2026@GMAIL.COM
                        </p>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <h3 className="animate-text text-3xl md:text-5xl font-bold uppercase text-white mb-2 opacity-0">
                            LOCATION
                        </h3>
                        <p className="animate-text text-lg md:text-2xl font-bold text-[#ccff00] tracking-wide uppercase max-w-md opacity-0">
                            SRI LANKA TECHNOLOGY CAMPUS, PADUKKA
                        </p>
                    </div>

                </div>

            </div>

            {/* Bottom Padding */}
            <div className="h-16 md:h-24"></div>

        </section>
    );
}

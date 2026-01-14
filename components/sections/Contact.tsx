'use client';

import { useRef } from 'react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    return (
        <section id="contact" ref={containerRef} className="page-container w-full min-h-screen bg-black text-foreground flex flex-col items-center justify-center relative overflow-hidden py-16 md:py-24">

            {/* Background Tech Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.neutral.900)_0%,theme(colors.black)_100%)] z-0" />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="absolute left-10 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

            {/* Title Block */}
            <div className="w-full mb-20 flex flex-col items-center z-10">
                <div className="overflow-hidden">
                    <h2 className="animate-title text-4xl md:text-6xl lg:text-8xl font-display font-bold text-center tracking-widest text-white uppercase transform translate-y-full opacity-0">
                        CONTACT
                    </h2>
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <span className="h-px w-12 bg-primary/50"></span>
                    <span className="font-mono text-primary text-sm tracking-[0.3em] uppercase">Connect With Us</span>
                    <span className="h-px w-12 bg-primary/50"></span>
                </div>
            </div>

            {/* Command Center Panels */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 px-4">

                {/* Panel 1: Hotlines */}
                <div className="animate-box group relative bg-neutral-900/40 border border-white/5 p-8 rounded-xl backdrop-blur-sm hover:bg-neutral-900/60 transition-all duration-300 opacity-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="flex flex-col items-center text-center h-full justify-between gap-8">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary mb-4 p-4 border border-white/5 group-hover:border-primary/30 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold uppercase text-white mb-6 tracking-wider">Hotlines</h3>
                            <div className="space-y-3 font-mono text-lg text-neutral-300 group-hover:text-primary transition-colors">
                                <p>011 2365 455</p>
                                <p>011 2365 455</p>
                            </div>
                        </div>
                        <div className="w-full text-xs font-mono text-neutral-600 uppercase tracking-widest pt-4 border-t border-white/5">
                            Lines Open 24/7
                        </div>
                    </div>
                </div>

                {/* Panel 2: Email */}
                <div className="animate-box group relative bg-neutral-900/40 border border-white/5 p-8 rounded-xl backdrop-blur-sm hover:bg-neutral-900/60 transition-all duration-300 opacity-0 overflow-hidden delay-100">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="flex flex-col items-center text-center h-full justify-between gap-8">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary mb-4 p-4 border border-white/5 group-hover:border-primary/30 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold uppercase text-white mb-6 tracking-wider">Email Us</h3>
                            <a href="mailto:novaiotion2026@gmail.com" className="font-mono text-lg text-neutral-300 group-hover:text-primary transition-colors break-all">
                                NOVAITION2026@GMAIL.COM
                            </a>
                        </div>
                        <div className="w-full text-xs font-mono text-neutral-600 uppercase tracking-widest pt-4 border-t border-white/5">
                            Response Time: &lt; 24h
                        </div>
                    </div>
                </div>

                {/* Panel 3: Location */}
                <div className="animate-box group relative bg-neutral-900/40 border border-white/5 p-8 rounded-xl backdrop-blur-sm hover:bg-neutral-900/60 transition-all duration-300 opacity-0 overflow-hidden delay-200">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="flex flex-col items-center text-center h-full justify-between gap-8">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-primary mb-4 p-4 border border-white/5 group-hover:border-primary/30 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-display font-bold uppercase text-white mb-6 tracking-wider">Location</h3>
                            <p className="font-sans text-neutral-300 group-hover:text-white transition-colors max-w-xs mx-auto leading-relaxed">
                                SRI LANKA TECHNOLOGY CAMPUS,<br />PADUKKA
                            </p>
                        </div>
                        <div className="w-full text-xs font-mono text-neutral-600 uppercase tracking-widest pt-4 border-t border-white/5">
                            Main Auditorium
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer decorative text */}
            <div className="absolute bottom-8 left-0 w-full text-center">
                <p className="text-xs font-mono text-neutral-800 uppercase tracking-[1em]">System Online</p>
            </div>

        </section>
    );
}

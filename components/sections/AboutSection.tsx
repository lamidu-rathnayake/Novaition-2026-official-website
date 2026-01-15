"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    useSectionAnimations(containerRef);

    return (
        <section id="about" ref={containerRef} className="page-container w-full min-h-screen bg-black text-white py-24 flex flex-col justify-center items-center relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 bg-background z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(191,237,7,0.1),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-30" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] z-0 pointer-events-none" />


            {/* Content Container */}
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                {/* Header */}
                <div className="text-center relative">
                    <h1 className="animate-title text-6xl md:text-7xl font-sans font-bold uppercase tracking-normal text-white mb-6 transform translate-y-10 opacity-0 relative inset-x-0 mx-auto w-fit">
                        About Nov<span className="inline-block relative text-primary">AI</span>tion

                    </h1>
                    <p className="animate-text font-sans text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto text-center opacity-0 tracking-wide">
                        Sri Lanka&apos;s Premier Student Forum on Artificial Intelligence and Modern Business Trends
                    </p>
                </div>


                {/* Tech Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Card 1: Vision */}
                    <div className="animate-box glass-panel group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-primary/50 flex flex-col gap-6 opacity-0 relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-0 p-4 opacity-50 text-primary font-mono text-xs">VISION</div>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                        <h3 className="text-2xl tracking-wide font-sans font-bold uppercase text-white group-hover:text-primary transition-colors">
                            Innovation Meets Industry
                        </h3>
                        <p className="font-sans text-neutral-400 leading-relaxed group-hover:text-white/80 transition-colors">
                            We bridge the gap between academic theory and industrial reality, creating a nexus where student innovation directly interfaces with market leaders.
                        </p>
                        <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
                    </div>

                    {/* Card 2: Mission */}
                    <div className="animate-box glass-panel group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-primary/50 flex flex-col gap-6 opacity-0 relative overflow-hidden backdrop-blur-md delay-100">
                        <div className="absolute top-0 right-0 p-4 opacity-50 text-primary font-mono text-xs">MISSION</div>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="text-2xl tracking-wide font-sans font-bold uppercase text-white group-hover:text-primary transition-colors">
                            Empowering The Next Gen
                        </h3>
                        <p className="font-sans text-neutral-400 leading-relaxed group-hover:text-white/80 transition-colors">
                            An open initiative by the SLTC IEEE IAS Student Branch to equip future leaders with deep insights into sustainable technology and global market dynamics.
                        </p>
                        <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
                    </div>

                    {/* Card 3: Future */}
                    <div className="animate-box glass-panel group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-primary/50 flex flex-col gap-6 opacity-0 relative overflow-hidden backdrop-blur-md delay-200">
                        <div className="absolute top-0 right-0 p-4 opacity-50 text-primary font-mono text-xs">FUTURE</div>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <h3 className="text-2xl tracking-wide font-sans font-bold uppercase text-white group-hover:text-primary transition-colors">
                            Defining The Future
                        </h3>
                        <p className="font-sans text-neutral-400 leading-relaxed group-hover:text-white/80 transition-colors">
                            We aren&apos;t just observing trends; we are setting the stage for the next wave of AI and business integration. Join us in shaping tomorrow.
                        </p>
                        <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
                    </div>

                </div>

            </div>

            {/* Footer Logos - Modernized */}
            <div className="w-full max-w-4xl mx-auto mt-24 px-6 z-10">
                <div className="flex items-center justify-between gap-8 border-t border-white/10 pt-12 opacity-0 animate-box">

                    {/* Label */}
                    <div className="hidden md:block text-neutral-500 font-mono text-xs uppercase tracking-widest shrink-0">
                        Organized By
                    </div>

                    {/* Logos */}
                    <div className="flex items-center justify-center gap-10 md:gap-16 mx-auto md:mx-0 flex-wrap overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">

                        {/* Logo 1 */}
                        <div className="relative w-32 h-12 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                            <Image
                                src="/sb-logo-white.png"
                                alt="SLTC Student Branch"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-10 bg-white/20 shrink-0"></div>

                        {/* Logo 2 */}
                        <div className="relative w-32 h-12 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                            <Image
                                src="/IAS New Logo 2024 White.png"
                                alt="IAS Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>


        </section>
    );
}
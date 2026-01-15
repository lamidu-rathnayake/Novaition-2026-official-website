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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-gpu-icon lucide-gpu"><path d="M2 21V3"/><path d="M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26"/><path d="M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3"/><circle cx="16" cy="11" r="2"/><circle cx="8" cy="11" r="2"/></svg>
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
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plug-zap-icon lucide-plug-zap"><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/></svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-compass-icon lucide-compass"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></svg>
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
                    <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest shrink-0">
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
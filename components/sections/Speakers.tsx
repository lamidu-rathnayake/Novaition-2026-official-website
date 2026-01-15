'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';
import gsap from 'gsap';

// Dummy Data
const speakers = [
    {
        id: 1,
        name: "MALINDA ALAHAKOON",
        title: "SRI LANKAN BORN LECTURER AND SCIENCE COMMUNICATOR",
        description: "KNOWN FOR HIS ROLE AS A LECTURER AT INSTITUTIONS LIKE SWINBURNE UNIVERSITY OF TECHNOLOGY IN MELBOURNE, AUSTRALIA. WITH OVER A DECADE OF ACADEMIC EXPERIENCE, HE HAS ACTIVELY ENGAGED IN MAKING SCIENCE ACCESSIBLE TO A WIDER AUDIENCE.",
        image: "/malinda.png",
        specialty: "SCIENCE COMMS",
        stats: { exp: "10+ YRS", projects: "50+" }
    },
    {
        id: 2,
        name: "JANE DOE",
        title: "AI RESEARCHER",
        description: "PIONEERING NEW FRONTIERS IN GENERATIVE AI AND ITS APPLICATIONS IN SUSTAINABLE ENERGY.",
        image: "/hero-character.png", // Placeholder
        specialty: "GENERATIVE AI",
        stats: { exp: "08+ YRS", projects: "30+" }
    },
    {
        id: 3,
        name: "JOHN SMITH",
        title: "TECH INNOVATOR",
        description: "LEADING THE CHARGE IN QUANTUM COMPUTING ACCESSIBILITY FOR DEVELOPERS WORLDWIDE.",
        image: "/hero-character.png", // Placeholder
        specialty: "QUANTUM COMP",
        stats: { exp: "15+ YRS", projects: "100+" }
    }
];

export default function Speakers() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useSectionAnimations(containerRef);

    const animateSlide = (direction: 'next' | 'prev', newIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            }
        });

        // Out animation
        tl.to([imageRef.current, textRef.current], {
            opacity: 0,
            x: direction === 'next' ? -50 : 50,
            duration: 0.4,
            ease: "power2.in",
        })
            .call(() => setCurrentIndex(newIndex))
            .set([imageRef.current, textRef.current], {
                x: direction === 'next' ? 50 : -50
            })
            // In animation
            .to([imageRef.current, textRef.current], {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out",
            });
    };

    const nextSlide = () => {
        animateSlide('next', (currentIndex + 1) % speakers.length);
    };

    const prevSlide = () => {
        animateSlide('prev', (currentIndex - 1 + speakers.length) % speakers.length);
    };

    const currentSpeaker = speakers[currentIndex];

    return (
        <section id="speakers" ref={containerRef} className="page-container py-24 relative w-full min-h-screen bg-black text-white flex flex-col justify-center overflow-hidden">

            {/* Background Tech Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-10 bg-[radial-gradient(circle_at_center,theme(colors.primary)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
                <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="absolute left-0 bottom-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </div>

            {/* Header */}
            <div className="w-full mb-16 z-10 relative flex flex-col items-center">
                <div className="overflow-hidden mb-4    ">
                    <h2 className="animate-title text-6xl md:text-7xl font-sans font-bold text-center tracking-normal text-white uppercase transform translate-y-full opacity-0">
                        SPEAKERS
                    </h2>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">

                {/* Left: Holographic Image Card */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1">
                    <div ref={imageRef} className="animate-box opacity-0 relative w-[300px] md:w-[400px] h-[400px] md:h-[500px] group">

                        {/* Card Frame */}
                        <div className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg clip-path-tech">
                            {/* Corner Accents */}
                            <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-primary" />
                            <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-primary" />

                            {/* Inner Grid */}
                            <div className="absolute inset-4 border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                        </div>

                        {/* Image */}
                        <div className="absolute inset-4 overflow-hidden rounded-sm">
                            <Image
                                src={currentSpeaker.image}
                                alt={currentSpeaker.name}
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-110 filter md:grayscale group-hover:grayscale-0"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                            <div>
                                <p className="text-primary font-mono text-xs tracking-wider mb-1">SPECIALTY</p>
                                <p className="text-white font-display text-lg tracking-widest uppercase">{currentSpeaker.specialty}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-primary font-mono text-xs tracking-wider mb-1">EXPERIENCE</p>
                                <p className="text-white font-display text-lg tracking-widest">{currentSpeaker.stats.exp}</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right: Tech Info Component */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start order-2 text-center md:text-left">
                    <div ref={textRef} className="animate-box opacity-0 max-w-lg">

                        <h3 className="animate-box tracking-normal text-4xl md:text-5xl lg:text-5xl font-sans font-bold text-white leading-none uppercase">
                            {currentSpeaker.name}
                        </h3>

                        <p className="animate-box font-normal text-primary text-sm md:text-base tracking-widest mb-8 mx-auto md:mx-0 w-fit text-center md:text-left">
                            {currentSpeaker.title}
                        </p>

                        <p className="animate-box font-sans text-neutral-400 leading-relaxed tracking-wide text-sm md:text-base mb-10">
                            {currentSpeaker.description}
                        </p>

                        {/* Controls */}
                        <div className="flex items-center gap-6 justify-center md:justify-start">
                            <button
                                onClick={prevSlide}
                                className="group relative w-14 h-14 flex items-center justify-center border border-white/10 bg-black hover:bg-primary hover:border-primary transition-all duration-300 rounded-full"
                            >
                                <ChevronLeft className="text-white group-hover:text-black transition-colors" />
                            </button>

                            {/* Progress Dots */}
                            <div className="flex gap-2">
                                {speakers.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="group relative w-14 h-14 flex items-center justify-center border border-white/10 bg-black hover:bg-primary hover:border-primary transition-all duration-300 rounded-full"
                            >
                                <ChevronRight className="text-white group-hover:text-black transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .clip-path-tech {
                    clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
                }
                .clip-path-octagon {
                    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
                }
            `}</style>

        </section>
    );
}

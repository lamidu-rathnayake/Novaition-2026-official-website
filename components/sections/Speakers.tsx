'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

// Dummy Data
const speakers = [
    {
        id: 1,
        name: "MALINDA ALAHAKOON",
        title: "SRI LANKAN BORN LECTURER AND SCIENCE COMMUNICATOR",
        description: "KNOWN FOR HIS ROLE AS A LECTURER AT INSTITUTIONS LIKE SWINBURNE UNIVERSITY OF TECHNOLOGY IN MELBOURNE, AUSTRALIA. WITH OVER A DECADE OF ACADEMIC EXPERIENCE, HE HAS ACTIVELY ENGAGED IN MAKING SCIENCE ACCESSIBLE TO A WIDER AUDIENCE.",
        image: "/malinda.png", // Using hero char as placeholder for now
    },
    {
        id: 2,
        name: "JANE DOE",
        title: "AI RESEARCHER",
        description: "PIONEERING NEW FRONTIERS IN GENERATIVE AI AND ITS APPLICATIONS IN SUSTAINABLE ENERGY.",
        image: "/hero-character.png",
    },
    {
        id: 3,
        name: "JOHN SMITH",
        title: "TECH INNOVATOR",
        description: "LEADING THE CHARGE IN QUANTUM COMPUTING ACCESSIBILITY FOR DEVELOPERS WORLDWIDE.",
        image: "/hero-character.png",
    }
];

export default function Speakers() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % speakers.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
    };

    const currentSpeaker = speakers[currentIndex];

    return (
        <section id="speakers" ref={containerRef} className="page-container py-20 relative w-full min-h-screen bg-background text-foreground flex flex-col overflow-hidden" >

            {/* Standardized Title with Box Reveal */}
            <div className="w-full mb-12 flex justify-center">
                <div className="overflow-hidden">
                    <h2 className="animate-title text-5xl md:text-7xl font-bold text-center tracking-wider text-white uppercase transform translate-y-full opacity-0">
                        SPEAKERS
                    </h2>
                </div>
            </div>

            <div className="w-full mx-auto flex flex-col grow relative">

                {/* Progress Bars */}
                <div className="animate-box flex gap-4 opacity-0">
                    {speakers.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 flex-1 transition-colors duration-300 ${index === currentIndex ? 'bg-[#ccff00]' : 'bg-neutral-800'
                                }`}
                        />
                    ))}
                </div>

                {/* Content Grid */}
                <div className="flex flex-col md:flex-row md:items-stretch items-center justify-between gap-8 md:gap-12 grow py-8">

                    {/* Left: Text Content - Standardized Typography and Animation */}
                    <div className="w-full md:w-1/2 space-y-4 md:space-y-6 order-2 md:order-1 flex flex-col justify-center items-center md:items-start p-3 md:p-4">
                        <div className="relative w-full md:w-4/5 flex flex-col justify-center items-center md:items-start gap-4">
                            <h3 className="animate-text text-[#ccff00] text-3xl md:text-5xl lg:text-5xl font-bold tracking-widest uppercase leading-tight md:leading-normal max-w-full text-center md:text-left opacity-0">
                                {currentSpeaker.name}
                            </h3>
                            <p className="animate-text text-neutral-300 text-sm md:text-base leading-loose tracking-widest uppercase font-medium text-center md:text-left max-w-lg opacity-0">
                                {currentSpeaker.description}
                            </p>
                        </div>
                    </div>

                    {/* Right: Image - Standardized Container */}
                    <div className="w-full md:w-1/2 relative order-1 md:order-2">
                        {/* Image Container */}
                        <div className="animate-box relative w-full h-[50vh] md:h-[60vh] opacity-0">
                            <Image
                                src={currentSpeaker.image}
                                alt={currentSpeaker.name}
                                fill
                                className="object-contain object-bottom drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                </div>

                {/* Navigation Buttons */}
                <div className="absolute z-20 flex w-full items-center justify-between inset-y-0 left-0 right-0 px-4 pointer-events-none md:inset-y-auto md:top-auto md:bottom-10 md:justify-center md:gap-8 md:px-0">
                    <button
                        onClick={prevSlide}
                        className="pointer-events-auto p-4 rounded-full bg-neutral-900/50 hover:bg-[#ccff00]/20 border border-neutral-700 hover:border-[#ccff00] backdrop-blur-md transition-all text-white hover:text-[#ccff00]"
                        aria-label="Previous speaker"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="pointer-events-auto p-4 rounded-full bg-neutral-900/50 hover:bg-[#ccff00]/20 border border-neutral-700 hover:border-[#ccff00] backdrop-blur-md transition-all text-white hover:text-[#ccff00]"
                        aria-label="Next speaker"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

            </div>
        </section>
    );
}

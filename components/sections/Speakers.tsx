'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % speakers.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
    };

    const currentSpeaker = speakers[currentIndex];

    return (
        <section className="page-container py-4 relative w-full min-h-screen bg-background text-foreground flex flex-col overflow-hidden" >

            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-bold text-center py-4 tracking-wider">
                SPEAKERS
            </h2>

            <div className="w-full mx-auto flex flex-col grow relative">

                {/* Progress Bars */}
                <div className="flex gap-4">
                    {speakers.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 flex-1 transition-colors duration-300 ${index === currentIndex ? 'bg-primary' : 'bg-foreground/20'
                                }`}
                        />
                    ))}
                </div>

                {/* Content Grid */}
                <div className="flex flex-col md:flex-row md:items-stretch items-center justify-between gap-8 md:gap-12 grow py-8">

                    {/* Left: Text Content */}
                    <div className="w-full md:w-1/2 space-y-4 md:space-y-6 order-2 md:order-1 flex flex-col justify-center items-center md:items-start p-3 md:p-4">
                        <div className="relative w-full md:w-4/5 flex flex-col justify-center items-center md:items-start gap-3">
                            <h3 className="text-primary text-2xl md:text-4xl lg:text-5xl tracking-widest uppercase leading-tight md:leading-none max-w-full md:max-w-[12ch] text-center md:text-left">
                                {currentSpeaker.name}
                                {/* IS A {currentSpeaker.title} */}
                            </h3>
                            <p className="text-foreground/80 text-xs md:text-sm lg:text-base leading-relaxed tracking-wide uppercase font-light text-center md:text-left max-w-lg">
                                {currentSpeaker.description}
                            </p>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full md:w-1/2 relative order-1 md:order-2">
                        {/* Image Container */}
                        <div className="relative w-full h-[50vh] md:h-full">
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
                        className="pointer-events-auto p-2 md:p-4 rounded-full bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm transition-colors text-foreground"
                        aria-label="Previous speaker"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="pointer-events-auto p-2 md:p-4 rounded-full bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm transition-colors text-foreground"
                        aria-label="Next speaker"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

            </div>
        </section>
    );
}

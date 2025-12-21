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
        image: "/hero-character.png", // Using hero char as placeholder for now
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
        <section className="relative w-full min-h-screen bg-background text-foreground flex flex-col overflow-hidden" style={{ padding: 'var(--page-padding)' }}>

            {/* Title */}
            <h2 className="text-5xl md:text-5xl font-bold text-center mb-8 tracking-wider">
                SPEAKERS
            </h2>

            <div className="w-full max-w-7xl mx-auto flex flex-col grow relative">

                {/* Progress Bars */}
                <div className="flex gap-4 mb-8 md:mb-12">
                    {speakers.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 flex-1 transition-colors duration-300 ${index === currentIndex ? 'bg-primary' : 'bg-foreground/20'
                                }`}
                        />
                    ))}
                </div>

                {/* Content Grid */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 grow">

                    {/* Left: Text Content */}
                    <div className="w-full md:w-1/2 space-y-6 text-left order-2 md:order-1 flex flex-col items-start">
                        <h3 className="text-primary text-4xl md:text-5xl lg:text-5xl tracking-widest uppercase leading-none max-w-[12ch]">
                            {currentSpeaker.name}
                            {/* IS A {currentSpeaker.title} */}
                        </h3>
                        <p className="text-foreground/80 text-sm md:text-base leading-relaxed tracking-wide uppercase font-light text-justify max-w-lg">
                            {currentSpeaker.description}
                        </p>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full md:w-1/2 h-[55vh] md:h-[70vh] relative order-1 md:order-2 flex justify-center items-end">
                        {/* Image Container */}
                        <div className="relative w-full h-full">
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

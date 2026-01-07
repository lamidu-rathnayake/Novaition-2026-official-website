"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true),
        });

        // Initial State
        gsap.set(containerRef.current, { autoAlpha: 1 });
        const progress = { value: 0 };

        // 1. Reveal Animations
        tl.to(".preloader-text", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1
        });

        // 2. Main Progress & Rotation (3.5s)
        tl.to(progress, {
            value: 100,
            duration: 3.5,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.round(progress.value).toString().padStart(3, '0');
                }
            }
        }, 0)
            .fromTo(".tech-ring",
                { rotation: 0 },
                { rotation: 360, duration: 4, ease: "power1.inOut" },
                0
            )
            .to(".ring-progress", {
                strokeDashoffset: 0,
                duration: 3.5,
                ease: "power2.inOut"
            }, 0);

        // 3. Glitch Effect on Text
        tl.to(".glitch-text", {
            duration: 0.2,
            skewX: 20,
            color: "#ccff00",
            yoyo: true,
            repeat: 5,
            ease: "steps(1)"
        }, 1.5);

        // 4. Exit Sequence
        tl.to([".preloader-content", ".tech-ring-container"], {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        }, 3.5)
            .to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "expo.inOut"
            }, 3.8);

    }, { scope: containerRef });

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_80%)]" />

            {/* Rotating Ring Container */}
            <div className="tech-ring-container absolute flex items-center justify-center opacity-80">
                <svg className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]" viewBox="0 0 100 100">
                    {/* Outer Rotating Dashed Ring */}
                    <circle
                        className="tech-ring text-neutral-800"
                        cx="50" cy="50" r="48"
                        fill="none" stroke="currentColor" strokeWidth="0.5"
                        strokeDasharray="4 2"
                    />
                    {/* Inner Static Progress Track */}
                    <circle
                        className="text-neutral-900"
                        cx="50" cy="50" r="40"
                        fill="none" stroke="currentColor" strokeWidth="1"
                    />
                    {/* Inner Progress Fill */}
                    <circle
                        className="ring-progress text-primary"
                        cx="50" cy="50" r="40"
                        fill="none" stroke="currentColor" strokeWidth="1"
                        strokeDasharray="251.2" // 2 * pi * 40
                        strokeDashoffset="251.2"
                        transform="rotate(-90 50 50)"
                    />
                    {/* Decorative Markers */}
                    <circle cx="50" cy="2" r="1" fill="#ccff00" className="tech-ring" />
                    <circle cx="50" cy="98" r="1" fill="#ccff00" className="tech-ring" />
                </svg>
            </div>

            {/* Center Content */}
            <div className="preloader-content relative z-10 flex flex-col items-center gap-2">

                {/* Logo */}
                <h1 className="preloader-text opacity-0 translate-y-4 text-5xl md:text-7xl font-display font-bold tracking-widest uppercase">
                    NOV<span className="glitch-text inline-block">AI</span>TION
                </h1>

                {/* Counter & Label */}
                <div className="preloader-text opacity-0 translate-y-4 flex items-center gap-4 mt-2">
                    <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">System Sync</span>
                    <div className="h-px w-12 bg-neutral-700" />
                    <span className="font-mono text-2xl font-bold text-white tabular-nums">
                        <span ref={counterRef}>000</span>%
                    </span>
                </div>

            </div>

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 flex gap-1">
                <div className="w-1 h-1 bg-primary" />
                <div className="w-1 h-1 bg-white/20" />
                <div className="w-1 h-1 bg-white/20" />
            </div>
            <div className="absolute bottom-8 right-8 flex gap-1">
                <div className="w-1 h-1 bg-white/20" />
                <div className="w-1 h-1 bg-white/20" />
                <div className="w-1 h-1 bg-primary" />
            </div>

        </div>
    );
}

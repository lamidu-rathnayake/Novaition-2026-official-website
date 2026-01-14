"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true),
        });

        // 0. Initial States
        gsap.set(containerRef.current, { autoAlpha: 1 });
        gsap.set(".hud-ring", { scale: 0, opacity: 0 });
        gsap.set(".scan-line", { scaleY: 0 });
        gsap.set(".data-text", { opacity: 0 });

        // --- PHASE 1: BOOT UP (0s - 1s) ---

        // Rings expand from center
        tl.to(".hud-ring", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.2)"
        });

        // Start Rotations (Continuous)
        gsap.to(".ring-1", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
        gsap.to(".ring-2", { rotation: -360, duration: 15, repeat: -1, ease: "none" });
        gsap.to(".ring-3", { rotation: 180, duration: 10, repeat: -1, ease: "none" });
        gsap.to(".ring-dashed", { rotation: -180, duration: 25, repeat: -1, ease: "none" });

        // Scanning Line
        tl.to(".scan-line", {
            scaleY: 1,
            duration: 0.5,
            ease: "power2.out"
        }, 0.5);

        // Data Text Reveal
        tl.to(".data-text", {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1
        }, 0.8);

        // --- PHASE 2: PROCESSING (1s - 3.5s) ---

        // Counter from 00 to 100
        const counterObj = { val: 0 };
        tl.to(counterObj, {
            val: 100,
            duration: 2.5,
            ease: "power4.inOut",
            onUpdate: () => {
                const el = document.getElementById("loader-counter");
                if (el) el.innerText = Math.floor(counterObj.val).toString().padStart(3, "0");
            }
        }, 1);

        // Intense flicker near end
        tl.to(".hud-container", {
            opacity: 0.8,
            yoyo: true,
            repeat: 5,
            duration: 0.05,
        }, 3);

        // --- PHASE 3: SHUTDOWN (3.5s+) ---

        // Collapse to center
        tl.to(".hud-container", {
            scale: 0.1,
            opacity: 0,
            duration: 0.4,
            ease: "back.in(1.7)"
        });

        // Horizontal line wipe exit
        tl.to(containerRef.current, {
            scaleY: 0.002, // squish to line
            duration: 0.3,
            ease: "power2.in"
        }).to(containerRef.current, {
            scaleX: 0, // shrink line to nothing
            duration: 0.3,
            ease: "power2.out"
        });

    }, { scope: containerRef });

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(191,237,7,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(191,237,7,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
            </div>

            {/* Main HUD Container */}
            <div className="hud-container relative z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">

                {/* --- SVG RINGS --- */}
                <svg className="absolute inset-0 w-full h-full text-[#BFED07]" viewBox="0 0 100 100">

                    {/* Ring 1: Outer Decorative */}
                    <circle
                        className="hud-ring ring-1 opacity-50"
                        cx="50" cy="50" r="48"
                        fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 2"
                    />

                    {/* Ring 2: Thick Segments */}
                    <circle
                        className="hud-ring ring-2"
                        cx="50" cy="50" r="42"
                        fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 30"
                    />

                    {/* Ring 3: Inner Fast Track */}
                    <circle
                        className="hud-ring ring-3 opacity-80"
                        cx="50" cy="50" r="35"
                        fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="50 50"
                    />

                    {/* Dashed Markers */}
                    <circle
                        className="hud-ring ring-dashed opacity-30"
                        cx="50" cy="50" r="25"
                        fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="1 10"
                    />

                    {/* Center Reticle */}
                    <path
                        className="hud-ring"
                        d="M45,50 L55,50 M50,45 L50,55"
                        stroke="currentColor" strokeWidth="0.5"
                    />
                </svg>

                {/* --- CENTER CONTENT --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#BFED07] font-mono">
                    <div className="text-[10px] md:text-sm tracking-[0.2em] opacity-70 mb-2">SYSTEM SYNC</div>
                    <div className="text-6xl md:text-8xl font-bold tracking-tighter tabular-nums leading-none">
                        <span id="loader-counter">000</span>
                    </div>
                    <div className="text-[8px] md:text-xs tracking-widest opacity-50 mt-2">ENCRYPTED CONNECTION</div>
                </div>

                {/* --- DECORATIVE SIDES --- */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-2 h-32 bg-black border border-[#BFED07]/30 flex flex-col justify-between p-1">
                    <div className="scan-line w-full h-full bg-[#BFED07]" />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-2 h-32 bg-black border border-[#BFED07]/30 flex flex-col justify-between p-1">
                    <div className="scan-line w-full h-full bg-[#BFED07]" />
                </div>

                {/* --- DATA BLOCKS --- */}
                <div className="data-text absolute top-0 right-0 -mr-20 text-[8px] text-[#BFED07]/60 font-mono text-left w-24">
                    <div>MEM: OK</div>
                    <div>CPU: OK</div>
                    <div>NET: OK</div>
                    <div>SEC: HIGH</div>
                </div>
                <div className="data-text absolute bottom-0 left-0 -ml-20 text-[8px] text-[#BFED07]/60 font-mono text-right w-24">
                    <div>LOAD: 99%</div>
                    <div>PING: 2ms</div>
                    <div>LOC: ASIA</div>
                </div>

            </div>

        </div>
    );
}

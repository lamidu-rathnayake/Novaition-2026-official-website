"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(() => {
    const progress = { value: 0 };

    gsap.set(containerRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    /* ------------------------------
       DASHED RING — PURE ROTATION
    -------------------------------- */
    gsap.to(".tech-ring", {
        rotation: () => (Math.random() > 0.5 ? 20 : -20), // smaller swing
        duration: 0.5, // snappy but not too fast
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
        transformBox: "fill-box",
  });

    /* ------------------------------
       PROGRESS COUNTER
    -------------------------------- */
    tl.to(progress, {
      value: 100,
      duration: 3.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(progress.value)
            .toString()
            .padStart(3, "0");
        }
      },
    }, 0);

    /* ------------------------------
       PROGRESS RING FILL
    -------------------------------- */
    tl.to(".ring-progress", {
      strokeDashoffset: 0,
      duration: 3.5,
      ease: "power2.inOut",
    }, 0);

    /* ------------------------------
       SUBTLE GLITCH PULSE (LOGO)
    -------------------------------- */
    tl.to(".logo-glitch", {
      opacity: 0.6,
      duration: 0.08,
      repeat: 6,
      yoyo: true,
      ease: "steps(1)",
    }, 1.6);

    /* ------------------------------
       EXIT SEQUENCE
    -------------------------------- */
    tl.to(".preloader-content", {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, 3.4)
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
      }, 3.7);

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,25,1)_0%,rgba(0,0,0,1)_75%)]" />

      {/* RING SYSTEM */}
      <div className="absolute flex items-center justify-center">
        <svg
          className="w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
          viewBox="0 0 100 100"
        >
          {/* OUTER DASHED RING */}
          <circle
            className="tech-ring text-neutral-700"
            cx="50"
            cy="50"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="4 2"
          />

          {/* INNER TRACK */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#111"
            strokeWidth="1"
          />

          {/* PROGRESS FILL */}
          <circle
            className="ring-progress text-primary"
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="251.2"
            strokeDashoffset="251.2"
            transform="rotate(-90 50 50)"
          />

          {/* MARKERS */}
          <circle cx="50" cy="2" r="1" fill="#ccff00" />
          <circle cx="50" cy="98" r="1" fill="#ccff00" />
        </svg>
      </div>

      {/* CENTER CONTENT */}
      <div className="preloader-content relative z-10 flex flex-col items-center gap-4">
        {/* LOGO (replace src later) */}
        <div className="logo-glitch relative w-40 md:w-52">
          <Image
            src="/hero-logo.png" // replace when ready
            alt="Novaition"
            width={400}
            height={200}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* COUNTER */}
        <div className="flex items-center gap-2 md:gap-4">
          <span className="font-mono text-2xs md:text-xs uppercase tracking-normal md:tracking-[0.25em] text-primary">
            System Sync
          </span>
          <div className="h-px w-3 md:w-10 bg-neutral-700" />
          <span className="font-mono text-lg md:text-2xl text-white tabular-nums">
            <span ref={counterRef}>000</span>%
          </span>
        </div>
      </div>

      {/* CORNER ACCENTS */}
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

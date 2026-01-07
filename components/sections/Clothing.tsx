'use client';

import React, { Suspense, useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, SpotLight } from '@react-three/drei';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';

function TShirtModel() {
    return (
        <group dispose={null}>
            {/* Body */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[1.5, 2.5, 0.5]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Left Sleeve */}
            <mesh castShadow receiveShadow position={[-1, 0.75, 0]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.8, 1, 0.5]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Right Sleeve */}
            <mesh castShadow receiveShadow position={[1, 0.75, 0]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.8, 1, 0.5]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Neck (Visual indication) */}
            <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
                <meshStandardMaterial color="#101010" />
            </mesh>
        </group>
    );
}

export default function Clothing() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    useSectionAnimations(containerRef);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.marquee-content', {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: 'linear',
            });
        }, marqueeRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="clothing" ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black text-white py-8 page-container flex flex-col justify-between">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/clothing-bg.png"
                    alt="Clothing Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/60 pointer-events-none"></div>
            </div>

            {/* Standardized Title with Box Reveal to match other sections */}
            <div className="w-full mb-12 flex justify-center z-10 relative">
                <div className="overflow-hidden">
                    <h2 className="animate-title text-5xl md:text-7xl font-bold text-center tracking-wider text-white uppercase transform translate-y-full opacity-0">
                        CLOTHING
                    </h2>
                </div>
            </div>

            {/* 3D Model Canvas Area - Centered but shifted up */}
            <div className="animate-box absolute inset-0 z-5 pointer-events-none flex items-start justify-center pt-60 md:pt-48 opacity-0">
                <div className="w-[90%] h-[50vh] md:w-3/4 md:h-3/4 pointer-events-auto">
                    <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }}>
                        <ambientLight intensity={0.5} />
                        <SpotLight position={[0, 10, 0]} angle={0.4} penumbra={0.5} intensity={800} castShadow />
                        <pointLight position={[-10, 5, 5]} intensity={100} color="#BFED07" distance={20} />
                        <pointLight position={[10, 5, 5]} intensity={100} color="#ffffff" distance={20} />

                        <Suspense fallback={<group><mesh><boxGeometry /><meshBasicMaterial color="lime" wireframe /></mesh></group>}>
                            <TShirtModel />
                            <Environment preset="night" />
                        </Suspense>
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
                    </Canvas>
                </div>
            </div>

            {/* Main Content Area - Pushed to bottom */}
            <div className="relative z-10 flex-1 flex flex-col justify-end items-center text-center pb-14 md:pb-16 gap-6 pointer-events-none mt-auto w-full">

                {/* Visual Glow behind content */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ccff00]/10 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Content Container - No Blur/Bg as requested, but keeping layout */}
                <div className="animate-box pointers-events-auto relative p-0 flex flex-col items-center gap-4 overflow-hidden pointer-events-auto opacity-0 group">



                    {/* PRICE BADGE */}
                    <div className="animate-title bg-[#ccff00] text-black px-4 py-1 text-sm md:text-base font-bold uppercase tracking-widest mb-2 transform -skew-x-12 shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                        LKR 2800
                    </div>

                    {/* HEADLINE */}
                    <div className="overflow-hidden">
                        <h2 className="animate-title text-3xl md:text-5xl font-bold uppercase leading-tight tracking-wider text-white drop-shadow-lg transform translate-y-full opacity-0">
                            LIMITED
                            <br />
                            STOCKS AVAILABLE
                        </h2>
                    </div>

                    {/* CTA BUTTON */}
                    <Link href="/pre-order" className="animate-box pointer-events-auto opacity-0">
                        <button className="bg-primary text-black px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300 shadow-[0_0_10px_rgba(191,237,7,0.2)] rounded-sm">
                            CLICK TO PRE ORDER
                        </button>
                    </Link>

                    {/* MAKE IT YOURS */}
                    <div className="animate-box hidden md:block text-primary font-bold animate-pulse tracking-widest text-sm md:text-base uppercase opacity-0">
                        MAKE IT YOURS
                    </div>
                </div>
            </div>

            {/* Bottom Info Row - REMOVED */}

            {/* Marquee Footer */}
            <div ref={marqueeRef} className="absolute bottom-0 left-0 w-full bg-primary h-10 md:h-12 flex items-center overflow-hidden z-20 border-t-2 border-black">
                <div className="marquee-content flex whitespace-nowrap will-change-transform">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center mx-4">
                            <span className="text-black font-bold uppercase tracking-widest text-sm md:text-base">
                                LIMITED STOCKS AVAILABLE
                            </span>
                            <span className="mx-4 text-black">•</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[...Array(10)].map((_, i) => (
                        <div key={`dup-${i}`} className="flex items-center mx-4">
                            <span className="text-black font-bold uppercase tracking-widest text-sm md:text-base">
                                LIMITED STOCKS AVAILABLE
                            </span>
                            <span className="mx-4 text-black">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Add global type for OBJLoader if needed, but usually handled by @types/three

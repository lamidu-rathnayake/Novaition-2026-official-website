'use client';

import React, { Suspense, useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, SpotLight, Center } from '@react-three/drei';
import Image from 'next/image';
import gsap from 'gsap';
// @ts-ignore
import * as THREE from 'three';

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
        <section className="relative w-full min-h-screen overflow-hidden bg-black text-white py-4 page-container flex flex-col justify-between">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/clothing-bg.png"
                    alt="Clothing Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-transparent to-black/60 pointer-events-none"></div>
            </div>

            {/* Top Navigation / Header text */}
            <div className="relative z-10 w-full flex justify-between items-start font-display tracking-widest text-sm md:text-base uppercase pt-4">
                <div className="font-bold">NOVAITION</div>
                <div className="text-primary font-bold animate-pulse">MAKE IT YOURS</div>
                <div className="font-bold">2026</div>
            </div>

            {/* 3D Model Canvas Area - Centered but shifted up */}
            <div className="absolute inset-0 z-5 pointer-events-none flex items-start justify-center pt-20 md:pt-10">
                <div className="w-full h-full md:w-3/4 md:h-3/4 pointer-events-auto">
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
            <div className="relative z-10 flex-1 flex flex-col justify-end items-center text-center pb-8 md:pb-12 gap-6 pointer-events-none mt-auto">
                {/* HEADLINE */}
                <h2 className="text-5xl md:text-7xl font-bold uppercase leading-tight tracking-wider text-white drop-shadow-lg">
                    LIMITED
                    <br />
                    STOCKS AVAILABLE
                </h2>

                {/* CTA BUTTON */}
                <button className="pointer-events-auto bg-primary text-black px-8 py-3 md:px-10 md:py-4 text-lg md:text-xl font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(191,237,7,0.4)]">
                    CLICK TO PRE ORDER
                </button>
            </div>

            {/* Bottom Info Row */}
            <div className="relative z-10 w-full flex justify-between items-end pb-8 md:pb-12 pointer-events-none">
                <div className="text-2xl md:text-4xl font-bold uppercase font-display tracking-wide">IEEE IAS</div>

                {/* Barcode Graphic (CSS construction) */}
                <div className="flex flex-col items-center gap-1 opacity-90">
                    <div className="flex h-10 md:h-12 items-end gap-[2px]">
                        {/* Simple barcode lines */}
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="bg-white" style={{ width: (i % 3 === 0 || i % 7 === 0) ? '4px' : '2px', height: '100%' }}></div>
                        ))}
                    </div>
                    <span className="text-[10px] tracking-[0.4em] text-white">ORIGINAL</span>
                </div>
            </div>

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

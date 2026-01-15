'use client';

import React, { Suspense, useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, SpotLight, Float, Sparkles, ContactShadows, Grid } from '@react-three/drei';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';
import * as THREE from 'three';

// --- 3D COMPONENTS ---

function TShirtModel() {
    return (
        <group dispose={null}>
            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
                <group>
                    {/* Body */}
                    <mesh castShadow receiveShadow position={[0, 0, 0]}>
                        <boxGeometry args={[1.2, 2, 0.4]} /> {/* smaller width, height, depth */}
                        <meshStandardMaterial color="#202020" roughness={0.3} metalness={0.4} envMapIntensity={0.5} />
                    </mesh>

                    {/* Left Sleeve */}
                    <mesh castShadow receiveShadow position={[-0.8, 0.6, 0]} rotation={[0, 0, 0.2]}>
                        <boxGeometry args={[0.64, 0.8, 0.4]} /> {/* reduced proportionally */}
                        <meshStandardMaterial color="#202020" roughness={0.3} metalness={0.4} envMapIntensity={0.5} />
                    </mesh>

                    {/* Right Sleeve */}
                    <mesh castShadow receiveShadow position={[0.8, 0.6, 0]} rotation={[0, 0, -0.2]}>
                        <boxGeometry args={[0.64, 0.8, 0.4]} />
                        <meshStandardMaterial color="#202020" roughness={0.3} metalness={0.4} envMapIntensity={0.5} />
                    </mesh>

                    {/* Neck */}
                    <mesh castShadow receiveShadow position={[0, 1, 0]}>
                        <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} /> {/* slightly smaller neck */}
                        <meshStandardMaterial color="#101010" />
                    </mesh>
                </group>

            </Float>
        </group>
    );
}

function RotatingGrid() {
    const gridRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (gridRef.current) gridRef.current.rotation.y += delta * 0.05;
    });
    return (
        <group ref={gridRef} position={[0, -2.5, 0]}>
            <Grid args={[10, 10]} cellSize={0.5} cellThickness={1} sectionSize={1.5} sectionThickness={1.5} fadeDistance={8} sectionColor="#ccff00" cellColor="#333" />
        </group>
    );
}

// --- MAIN COMPONENT ---

export default function Clothing() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    useSectionAnimations(containerRef);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.marquee-content', {
                xPercent: -50,
                repeat: -1,
                duration: 50,
                ease: 'linear',
            });

            gsap.to('.scanner-line', {
                top: '100%',
                repeat: -1,
                duration: 4,
                ease: 'power2.inOut',
                yoyo: true
            });
        }, [marqueeRef, containerRef]);
        return () => ctx.revert();
    }, []);

    return (
        <section id="clothing" ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black text-white py-4 md:py-8 page-container flex flex-col justify-between">

            {/* --- BACKGROUND --- */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/clothing-bg.png"
                    alt="Clothing Background"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, black 90%) pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 pointer-events-none mix-blend-screen"
                    style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>
            </div>

            {/* --- TITLE SECTION --- */}
            <div className="w-full mb-4 flex flex-col items-center z-20 relative pt-12 md:pt-6 shrink-0">
                <div className="overflow-hidden">
                    <h2 className="animate-title text-6xl md:text-7xl font-extrabold font-sans text-center tracking-wider text-white uppercase transform translate-y-full opacity-0 drop-shadow-lg">
                        <span className='text-primary'>MERCH</span> DROP
                    </h2>
                </div>
                <div className="flex gap-4 items-center mt-2 md:mt-0 opacity-80 animate-box">
                    <p className="font-sans text-[10px] md:text-sm text-primary uppercase tracking-[0.3em] md:tracking-[0.4em] relative">
                        <span className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse"></span>
                        Official Event Gear
                        <span className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse"></span>
                    </p>
                </div>
            </div>

            {/* --- 3D CANVAS AREA --- */}
            <div className="animate-box absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-0">
                <div className="w-full h-full pointer-events-auto relative -mt-20 md:mt-0">
                    <Canvas
                        shadows
                        camera={{ position: [0, 0, 8], fov: 35 }}
                        gl={{ preserveDrawingBuffer: true, antialias: true }}
                    >
                        <ambientLight intensity={0.4} />
                        <SpotLight position={[5, 8, 5]} angle={0.5} penumbra={1} intensity={1200} castShadow color="#ffffff" />

                        <Sparkles count={25} scale={7} size={3} speed={0.3} opacity={0.4} color="#ccff00" />

                        <Suspense fallback={null}>
                            <group position={[0, 0.2, 0]}>
                                <TShirtModel />
                            </group>

                            {/* FIX: Removed envMapIntensity from here */}
                            <Environment preset="city" />

                            <RotatingGrid />
                            <ContactShadows position={[0, -2.5, 0]} opacity={0.7} scale={10} blur={1.5} far={4} resolution={256} color="#000000" />
                        </Suspense>

                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.8}
                            minPolarAngle={Math.PI / 2.5}
                            maxPolarAngle={Math.PI / 1.5}
                        />
                    </Canvas>
                </div>
            </div>

            {/* --- FOOTER CONTENT --- */}
            <div className="relative z-30 flex-1 flex flex-col justify-end items-center text-center pb-12 md:pb-14 gap-6 pointer-events-none mt-auto w-full">
                <div className="animate-box pointers-events-auto relative py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-16 overflow-hidden pointer-events-auto opacity-0 w-[90%] md:w-full">

                    {/* Price Tag */}
                    <div className="flex-1 flex flex-row md:flex-col items-baseline md:items-start gap-3 md:gap-0">
                        <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest md:mb-2">Price</p>
                        <div className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight flex items-start">
                            <span className="text-primary text-xs md:text-sm pt-1 mr-1 md:mr-2 font-mono">LKR</span>2,800
                        </div>
                    </div>

                    {/* Button */}
                    <Link href="/pre-order" className="flex-1 w-1/2 md:w-auto">
                        <button className="w-full md:w-auto group relative bg-primary text-black px-6 py-3 md:px-10 md:py-4 text-sm md:text-lg font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(204,255,0,0.5)] rounded-sm">
                            <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                                Pre-Order
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </span>
                        </button>
                    </Link>

                    {/* Status */}
                    <div className="flex-1 flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0">
                        <p className="hidden md:block text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">Availability</p>
                        <div className="flex items-center gap-2 md:gap-3 bg-white/5 px-2 py-1 md:px-3 rounded-full border border-white/10">
                            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-primary"></span>
                            </span>
                            <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider font-mono">Selling Fast</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MARQUEE --- */}
            <div ref={marqueeRef} className="absolute bottom-0 left-0 w-full bg-black h-8 md:h-12 flex items-center overflow-hidden z-20 border-t border-white/20">
                <div className="marquee-content flex whitespace-nowrap will-change-transform opacity-60">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center mx-4 md:mx-8">
                            <span className="text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                                /// EXCLUSIVE NOVAITION WEAR /// LIMITED EDITION RUN ///
                            </span>
                        </div>
                    ))}
                    {[...Array(10)].map((_, i) => (
                        <div key={`dup-${i}`} className="flex items-center mx-4 md:mx-8">
                            <span className="text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                                /// EXCLUSIVE EVENT WEAR /// LIMITED EDITION RUN ///
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
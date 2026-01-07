"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'SPEAKERS', href: '#speakers' },
        { name: 'CLOTHING', href: '#clothing' },
        { name: 'SPONSORS', href: '#sponsors' },
        { name: 'CAMPUS', href: '#campus' },
        { name: 'ABOUT', href: '#about' },
        { name: 'TEAMS', href: '/teams' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'
                }`}
        >
            <div className="page-container flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="relative z-50 group">
                    <div className="relative h-6 md:h-8 w-auto transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/navbar-logo.png"
                            alt="NOVAITION"
                            width={120}
                            height={120}
                            className="w-auto h-full object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {/* Decorative Line */}
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20"></div>

                    <div className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative text-white/80 font-mono text-xs tracking-widest hover:text-primary transition-colors uppercase group py-2"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Decorative Line */}
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20"></div>

                    <Link
                        href="/registration"
                        className="relative group overflow-hidden bg-transparent border border-primary/50 hover:border-primary text-primary hover:text-black font-display text-xs font-bold tracking-wider px-6 py-2 uppercase transition-all duration-300"
                    >
                        <span className="relative z-10 transition-colors duration-300">Register Access</span>
                        <div className="absolute inset-0 bg-primary transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>

                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-100 group-hover:border-black transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-100 group-hover:border-black transition-colors"></div>
                    </Link>
                </div>

                {/* Mobile/Tablet Menu Button */}
                <button
                    className="lg:hidden z-50 text-white hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : (
                        <div className="flex flex-col items-end gap-1.5 group">
                            <span className="w-8 h-0.5 bg-white group-hover:bg-primary transition-colors"></span>
                            <span className="w-6 h-0.5 bg-white group-hover:bg-primary transition-colors"></span>
                            <span className="w-4 h-0.5 bg-white group-hover:bg-primary transition-colors"></span>
                        </div>
                    )}
                </button>

                {/* Mobile Overlay Menu */}
                <div
                    className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                >
                    {/* Grid Background in Menu */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

                    {navItems.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-white font-display text-2xl tracking-widest hover:text-primary transition-all uppercase transform hover:scale-110 relative z-10"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <span className="text-primary/50 text-xs font-mono mr-4">0{index + 1}</span>
                            {item.name}
                        </Link>
                    ))}

                    <Link
                        href="/registration"
                        onClick={() => setIsOpen(false)}
                        className="mt-8 relative inline-flex items-center justify-center bg-primary text-black font-display font-bold tracking-widest px-10 py-4 uppercase hover:bg-white transition-colors clip-path-polygon z-10"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                    >
                        Initialize Registration
                    </Link>
                </div>
            </div>
        </nav>
    );
}

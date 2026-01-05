"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Imports from lucide-react

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'SPEAKERS', href: '#speakers' },
        { name: 'CLOTHING', href: '#clothing' },
        { name: 'SPONSORS', href: '#sponsors' },
        { name: 'CAMPUS', href: '#campus' },
        { name: 'ABOUT', href: '#about' },
        { name: 'TEAMS', href: '#teams' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        // i use page container here to apply the padding from globals.css
        // py-4 for vertical padding
        <nav className="page-container absolute top-0 left-0 right-0 z-50 flex items-center justify-between py-4 bg-transparent">
            {/* Logo */}
            <div className="relative w-auto h-4 md:h-4 flex justify-center items-center z-50">
                <Image
                    src="/navbar-logo.png"
                    alt="NOVAITION"
                    width={120}
                    height={120}
                    className="w-auto h-full object-contain"
                    priority
                />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
                <div className="flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-white font-sans text-xs font-bold tracking-wider hover:text-primary transition-colors uppercase"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <Link
                    href="#"
                    className="inline-flex items-center justify-center bg-primary text-black font-sans text-xs font-bold tracking-wider px-6 py-2 uppercase hover:bg-white transition-colors rounded-tl-[10px] rounded-br-[10px] lg:rounded-tl-[15px] lg:rounded-br-[15px]"
                >
                    Register to Event
                </Link>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
                className="lg:hidden z-50 text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Overlay Menu */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white font-display text-lg tracking-widest hover:text-primary transition-colors uppercase"
                    >
                        {item.name}
                    </Link>
                ))}

                <Link
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 inline-flex items-center justify-center bg-primary text-black font-sans text-xs font-bold tracking-wider px-10 py-4 uppercase hover:bg-white transition-colors rounded-tl-[15px] rounded-br-[15px]"
                >
                    Register to Event
                </Link>
            </div>
        </nav>
    );
}

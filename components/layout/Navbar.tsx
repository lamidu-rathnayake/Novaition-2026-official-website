"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Track scroll only when menu is closed
  useEffect(() => {
    if (menuOpen) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const navItems = [
    { name: "Speakers", href: "/#speakers" },
    { name: "Clothing", href: "/#clothing" },
    { name: "Sponsors", href: "/#sponsors" },
    { name: "Campus", href: "/#campus" },
    { name: "About", href: "/#about" },
    { name: "Teams", href: "/teams" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 transition-colors duration-300
        ${scrolled ? "bg-black/80 backdrop-blur border-b border-white/10" : "bg-transparent"}`}
      >
        <div className="page-container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 ">
            <Image
              src="/navbar-logo.png"
              alt="NOVAITION"
              width={120}
              height={32}
              priority
              className="h-6 w-auto md:h-7"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs uppercase tracking-widest text-white/80 hover:text-primary transition"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/registration"
              className="relative group overflow-hidden bg-transparent border border-primary/50 hover:border-primary text-primary hover:text-black font-display text-xs font-bold tracking-wider px-6 py-2 uppercase transition-all duration-300"
            >
              <span className="relative z-10 transition-colors duration-300">Register</span>
              <div className="absolute inset-0 bg-primary transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>

              {/* Tech Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-100 group-hover:border-black transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-100 group-hover:border-black transition-colors"></div>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative z-50 text-white"
          >
            {menuOpen ? <X size={28} /> : (
              <div className="flex flex-col items-end gap-1.5">
                <span className="w-8 h-0.5 bg-white" />
                <span className="w-6 h-0.5 bg-white" />
                <span className="w-4 h-0.5 bg-white" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300
        ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <nav className="h-screen overflow-y-auto flex flex-col items-center justify-center gap-8 text-center px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl uppercase tracking-widest text-white hover:text-primary transition"
            >
              {item.name}
            </Link>
          ))}


          <Link
            href="/registration"
            className="relative group overflow-hidden bg-transparent border border-primary/50 hover:border-primary text-primary active:text-black md:hover:text-black font-display text-xs font-bold tracking-wider px-6 py-2 uppercase transition-all duration-300"
          >
            <span className="relative z-10 transition-colors duration-300">Register</span>
            <div className="absolute inset-0 bg-primary transform -translate-x-full skew-x-12 group-active:translate-x-0 md:group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>

            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-100 group-active:border-black md:group-hover:border-black transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-100 group-active:border-black md:group-hover:border-black transition-colors"></div>
          </Link>
        </nav>
      </div>
    </>
  );
}

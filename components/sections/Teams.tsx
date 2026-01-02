"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Member {
    name: string;
    role: string;
    image: string; // Placeholder URL for now
}

interface Team {
    name: string;
    members: Member[];
}

const teams: Team[] = [
    {
        name: "PROGRAMMING TEAM",
        members: [
            { name: "John Doe", role: "Lead Developer", image: "/placeholder-user.jpg" },
            { name: "Jane Smith", role: "Backend Developer", image: "/placeholder-user.jpg" },
            { name: "Mike Johnson", role: "Frontend Developer", image: "/placeholder-user.jpg" },
            { name: "Sarah Williams", role: "DevOps Engineer", image: "/placeholder-user.jpg" },
            { name: "David Brown", role: "Full Stack", image: "/placeholder-user.jpg" },
            { name: "Emily Davis", role: "UI/UX Engineer", image: "/placeholder-user.jpg" },
        ],
    },
    {
        name: "DESIGN TEAM",
        members: [
            { name: "Alex Turner", role: "Lead Designer", image: "/placeholder-user.jpg" },
            { name: "Olivia Wilson", role: "Graphic Designer", image: "/placeholder-user.jpg" },
            { name: "Daniel Martinez", role: "Motion Designer", image: "/placeholder-user.jpg" },
            { name: "Sophia Anderson", role: "Illustrator", image: "/placeholder-user.jpg" },
        ],
    },
    {
        name: "MARKETING TEAM",
        members: [
            { name: "James White", role: "Marketing Head", image: "/placeholder-user.jpg" },
            { name: "Isabella Thomas", role: "Content Strategist", image: "/placeholder-user.jpg" },
            { name: "William Harris", role: "Social Media Manager", image: "/placeholder-user.jpg" },
            { name: "Mia Clark", role: "SEO Specialist", image: "/placeholder-user.jpg" },
        ],
    },
];

const Teams = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const teamRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            // Animate the main header
            gsap.from(".teams-header", {
                opacity: 0,
                y: -50,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });

            // Animate each team section
            teamRefs.current.forEach((team, index) => {
                if (!team) return;

                gsap.from(team, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    delay: index * 0.2, // Stagger effect between teams
                    scrollTrigger: {
                        trigger: team,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="min-h-screen bg-black py-20 px-4 md:px-10 overflow-hidden relative">
            {/* Main Header */}
            <h2 className="teams-header text-5xl md:text-7xl font-bold text-white text-center mb-16 tracking-tighter">
                OUR TEAMS
            </h2>

            <div className="max-w-7xl mx-auto space-y-24">
                {teams.map((team, teamIndex) => (
                    <div
                        key={team.name}
                        ref={(el) => { if (el) teamRefs.current[teamIndex] = el; }}
                        className="team-section"
                    >
                        {/* Team Name - Neon Green */}
                        <h3 className="text-3xl md:text-5xl font-bold text-[#ccff00] uppercase mb-10 text-center md:text-left tracking-wide">
                            {team.name}
                        </h3>

                        {/* Members Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                            {team.members.map((member, i) => (
                                <div key={i} className="group flex flex-col items-center">
                                    {/* Member Image Placeholder */}
                                    <div className="w-full aspect-square bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 group-hover:border-[#ccff00] transition-colors duration-300 relative">
                                        {/* Replace src with actual member images later */}
                                        <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                                            <span className="text-4xl">?</span>
                                        </div>
                                        {/* <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                     /> */}
                                    </div>

                                    {/* Member Details */}
                                    <div className="mt-4 text-center">
                                        <h4 className="text-white text-lg md:text-xl font-semibold uppercase tracking-wider group-hover:text-[#ccff00] transition-colors duration-300">
                                            {member.name}
                                        </h4>
                                        <p className="text-neutral-500 text-sm md:text-base font-light">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Divider lines for aesthetics (optional based on "frame" request) */}
                        <div className="w-full h-px bg-neutral-900 mt-16" />
                    </div>
                ))}
            </div>

            {/* Bottom decoration */}
            <div className="flex justify-center mt-20">
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
                </div>
            </div>

        </section>
    );
};

export default Teams;

"use client";

import React, { useRef } from "react";
// import Image from "next/image";
import { useSectionAnimations } from "@/hooks/useSectionAnimations";

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
    useSectionAnimations(containerRef);

    return (
        <section id="teams" ref={containerRef} className="page-container py-20 min-h-screen bg-black text-white relative overflow-hidden">

            {/* Main Header */}
            <div className="w-full mb-24 flex justify-center">
                <div className="overflow-hidden">
                    <h2 className="animate-title text-5xl md:text-7xl font-bold text-center tracking-wider uppercase transform translate-y-full opacity-0">
                        OUR TEAMS
                    </h2>
                </div>
            </div>

            <div className="space-y-32">
                {teams.map((team) => (
                    <div
                        key={team.name}
                        className="team-section relative"
                    >
                        {/* Team Name - Styled with Neon Green */}
                        <div className="overflow-hidden mb-12">
                            <h3 className="animate-title text-3xl md:text-5xl font-bold text-[#ccff00] uppercase tracking-wide border-l-4 border-[#ccff00] pl-6 transform translate-y-full opacity-0">
                                {team.name}
                            </h3>
                        </div>

                        {/* Members Grid - Centered and Smaller Cards */}
                        <div className="animate-grid flex flex-wrap justify-center gap-6 md:gap-8 px-4">
                            {team.members.map((member, i) => (
                                <div key={i} className="member-card group flex flex-col items-center w-36 md:w-48">

                                    {/* Member Image Container */}
                                    <div className="w-full aspect-4/5 relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-[#ccff00]/50 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(204,255,0,0.15)]">

                                        {/* Placeholder Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center text-neutral-800 transition-opacity duration-300 group-hover:opacity-0">
                                            <span className="text-4xl md:text-5xl font-thin opacity-20">?</span>
                                        </div>

                                        {/* Image (Uncomment when ready) */}
                                        {/* <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    /> */}

                                        {/* Overlay Gradient on Hover */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Member Details */}
                                    <div className="mt-4 text-center w-full">
                                        <h4 className="text-white text-sm md:text-base font-bold uppercase tracking-wider group-hover:text-[#ccff00] transition-colors duration-300 truncate">
                                            {member.name}
                                        </h4>
                                        {/* Role - Always visible and distinct */}
                                        <p className="text-[#ccff00]/80 text-xs font-medium tracking-wide mt-1 uppercase">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Teams;

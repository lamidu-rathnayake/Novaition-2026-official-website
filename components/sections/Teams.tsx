"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useSectionAnimations } from "@/hooks/useSectionAnimations";

interface Member {
    name: string;
    role: string;
    image: string;
}

interface Team {
    name: string;
    id: string;
    members: Member[];
}

const teams: Team[] = [
    {
        name: "PROGRAMMING TEAM",
        id: "DEV_OPS_01",
        members: [
            { name: "John Doe", role: "Lead Developer", image: "/lamidu-avatar.png" },
            { name: "Jane Smith", role: "Backend Developer", image: "/lamidu-avatar.png" },
            { name: "Mike Johnson", role: "Frontend Developer", image: "" },
            { name: "Sarah Williams", role: "DevOps Engineer", image: "/lamidu-avatar.png" },
        ],
    },
    {
        name: "DESIGN TEAM",
        id: "CREATIVE_02",
        members: [
            { name: "Alex Turner", role: "Lead Designer", image: "/lamidu-avatar.png" },
            { name: "Olivia Wilson", role: "Graphic Designer", image: "/lamidu-avatar.png" },
            { name: "Daniel Martinez", role: "Motion Designer", image: "/lamidu-avatar.png" },
        ],
    },
    {
        name: "MARKETING TEAM",
        id: "GROWTH_03",
        members: [
            { name: "James White", role: "Marketing Head", image: "/lamidu-avatar.png" },
            { name: "Isabella Thomas", role: "Content Strategist", image: "/lamidu-avatar.png" },
            { name: "William Harris", role: "Social Media Manager", image: "/lamidu-avatar.png" },
        ],
    },
];

const Teams = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    useSectionAnimations(containerRef);

    return (
        <section id="teams" ref={containerRef} className="page-container py-16 md:py-20 min-h-screen bg-black text-white relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] opacity-10" />
            </div>

            {/* Header */}
            <div className="w-full mb-24 flex flex-col items-center">
                <div className="overflow-hidden mb-1">
                    <h2 className="animate-title text-6xl md:text-8xl font-sans font-bold text-center tracking-widest text-white uppercase transform translate-y-full opacity-0">
                        OUR TEAMS
                    </h2>
                </div>
                <div className="flex flex-col items-center gap-02 animate-box opacity-0">
                    <div className="animate-box text-primary font-display text-xs tracking-[0.1em] uppercase text-cente">Hard workers behind the scene</div>
                </div>
            </div>

            <div className="space-y-32 relative z-10 w-full max-w-7xl mx-auto">
                {teams.map((team, idx) => (
                    <div
                        key={team.name}
                        className="team-section relative"
                    >
                        {/* Team Header */}
                        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12 border-b border-white/10 pb-4">
                            <div className="overflow-hidden">
                                <h3 className="animate-title text-3xl md:text-4xl font-sans font-bold text-white uppercase tracking-wider transform translate-y-full opacity-0">
                                    {team.name}
                                </h3>
                            </div>
                        </div>

                        {/* Members Grid */}
                        <div className="animate-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {team.members.map((member, i) => (
                                <div key={i} className="group relative">

                                    {/* Holographic Card Frame */}
                                    <div className="absolute inset-0 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg clip-path-card opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(191,237,7,0.1)]"></div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-primary transition-colors duration-500" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-primary transition-colors duration-500" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-primary transition-colors duration-500" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-primary transition-colors duration-500" />

                                    <div className="relative p-6 flex flex-col items-center">

                                        {/* Avatar Hexagon */}
                                        <div className="relative w-24 h-24 mb-6">
                                            <div className="rounded-full absolute inset-0 bg-neutral-900 clip-path-hex border border-x-white/10 border-y-white/0 group-hover:border-x-primary/50 transition-colors duration-500 flex items-center justify-center overflow-hidden">
                                                { 
                                                    member.image === "" 
                                                        ?   <div className="text-4xl text-neutral-800 font-thin select-none">:|</div>
                                                        :   <Image src={member.image} alt={member.name} fill className="object-cover" />
                                                }

                                                {/* Scanline overlay */}
                                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size[100%_4px] opacity-20 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="text-center w-full">
                                            <h4 className="font-display text-white text-lg tracking-wide group-hover:text-primary transition-colors duration-300">
                                                {member.name}
                                            </h4>
                                            <p className="font-mono text-xs text-neutral-500 mt-2 uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                                                {member.role}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .clip-path-hex {
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                }
                .clip-path-card {
                     clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);
                }
            `}</style>

        </section>
    );
};

export default Teams;

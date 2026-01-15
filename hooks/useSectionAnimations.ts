"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useSectionAnimations = (containerRef: RefObject<HTMLElement | null>) => {
    useGSAP(
        () => {
            const titles = containerRef.current?.querySelectorAll(".animate-title");
            const texts = containerRef.current?.querySelectorAll(".animate-text");
            const boxes = containerRef.current?.querySelectorAll(".animate-box");
            const boxwithdelay1 = containerRef.current?.querySelectorAll(".animate-boxWithDelay1");
            const boxwithdelay2 = containerRef.current?.querySelectorAll(".animate-boxWithDelay2");

            // Box Reveal Animation for Titles/Subtitles
            // (Requires a wrapper div with overflow-hidden and a specific class structure)
            // Implementation: Slide the text up from hidden
            titles?.forEach((title) => {
                gsap.fromTo(
                    title,
                    { y: "100%", opacity: 0 },
                    {
                        y: "0%",
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: title,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Staggered Text Reveal for Descriptions
            texts?.forEach((text) => {
                // Split text by lines or words if possible, but for now simple stagger
                gsap.fromTo(
                    text,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: text,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        }
                    }
                )
            });

            // Simple Box Fade In for Containers/Images
            boxes?.forEach((box) => {
                gsap.fromTo(
                    box,
                    { scale: 0.95, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: box,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        }
                    }
                )
            })

            //this is for count down mainly
            boxwithdelay1?.forEach((box) => {
                gsap.fromTo(
                    box,
                    { scale: 0.95, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        delay: 4.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: box,
                            start: "bottom bottom",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            //this is for count down mainly
            boxwithdelay2?.forEach((box) => {
                gsap.fromTo(
                    box,
                    { scale: 0.95, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        delay: 4.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: box,
                            start: "bottom bottom",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });


            // Staggered Grid/Children Animation
            const grids = containerRef.current?.querySelectorAll(".animate-grid");
            grids?.forEach((grid) => {
                const children = grid.children;
                if (children.length === 0) return;

                gsap.fromTo(
                    children,
                    { y: 30, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: grid,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        }
                    }
                )
            });

        },
        { scope: containerRef }
    );
};

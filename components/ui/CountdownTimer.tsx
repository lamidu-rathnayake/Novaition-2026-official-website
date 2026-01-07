"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ----------------------------------------------------------------------
// 1. DIGIT COMPONENT
// ----------------------------------------------------------------------
interface DigitProps {
    value: number;
    limit: number;
    height?: number;
    width?: number;
    fontSize?: string;
    color?: string;
}

const Digit = ({
    value,
    limit,
    height = 40,
    width = 24,
    fontSize = "text-xl",
    color = "text-white"
}: DigitProps) => {
    // Array: [limit, limit-1, ..., 0, limit]
    // Example limit=9: [9, 8, ..., 0, 9]
    // Indices:          0  1       9  10
    const numbers = [
        ...Array.from({ length: limit + 1 }, (_, i) => limit - i),
        limit,
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const prevValue = useRef(value);

    useGSAP(() => {
        const targetIndex = limit - value; // Value 9 -> Index 0. Value 0 -> Index 9.

        // Check for wrap-around condition: 0 -> limit (e.g., 00 -> 59 or 0 -> 9)
        // This means we were at bottom (0) and want to go to "next" bottom (clone 9)
        if (prevValue.current === 0 && value === limit) {
            const cloneIndex = limit + 1;

            // Animate to the clone (Index 10)
            gsap.to(containerRef.current, {
                y: -(cloneIndex * height),
                duration: 0.5,
                ease: "power2.inOut", // smooth transition
                onComplete: () => {
                    // Instantly jump back to the top (Index 0, which is also 'limit')
                    gsap.set(containerRef.current, { y: 0 });
                }
            });
        } else {
            // Normal transition
            gsap.to(containerRef.current, {
                y: -(targetIndex * height),
                duration: 0.5,
                ease: "power2.inOut"
            });
        }

        prevValue.current = value;
    }, { dependencies: [value, limit, height], scope: containerRef });

    return (
        <div
            style={{ height, width }}
            className="relative overflow-hidden"
        >
            <div
                ref={containerRef}
                className="absolute w-full top-0 flex flex-col items-center"
                // Initial position
                style={{ transform: `translateY(${-(limit - value) * height}px)` }}
            >
                {numbers.map((num, i) => (
                    <div
                        key={i}
                        style={{ height }}
                        className={`flex items-center justify-center font-bold font-mono ${color} ${fontSize} w-full flex-shrink-0 leading-none`}
                    >
                        {num}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 2. HELPER: Groups Digits
// ----------------------------------------------------------------------
const TimeGroup = ({
    label,
    value,
    maxValue = 59,
    color = "text-white",
    scale = 1
}: {
    label: string,
    value: number,
    maxValue?: number,
    color?: string,
    scale?: number
}) => {
    const limitTens = maxValue === 59 ? 5 : 9; // For 59 (secs/mins), tens limit is 5. For 23 (hrs) or 99 (days), check logic.
    // Days could be > 99. The Digit logic assumes single digit 'limit'.
    // If days > 99, we might need 3 digits. But 'limitTens' implies 2 digits.
    // Assuming 2 digits for uniformity as per original code.

    // Fix for days > 99? Original code: `maxValue={99}` -> `limitTens` = 9.
    // tens = floor(value / 10). If value = 100, tens = 10. Digit limit 9.
    // Digit component creates array based on limit. If we pass 10, it makes 11 items.
    // So 'limitTens' should be dynamic if we want > 99 support, but assuming 2 digits is fine for now/original scope.

    // Just ensure tens doesn't exceed limit passed to Digit if we hardcode logic.
    // Actually Digit uses 'limit' to build array. If we pass actual tens value, we need array to cover it.
    // safely:
    const tens = Math.floor(value / 10);
    const ones = value % 10;

    // For tens digit, if value can be anything (like Days), we should probably use a simpler logic or set limit to 9.
    // But original code hardcoded limits. I will respect 'limitTens'.

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <Digit value={tens} limit={Math.max(limitTens, tens)} color={color} height={Math.floor(40 * scale)} width={Math.floor(24 * scale)} fontSize={scale < 0.8 ? "text-sm" : scale < 1 ? "text-lg" : "text-xl"} />
                <Digit value={ones} limit={9} color={color} height={Math.floor(40 * scale)} width={Math.floor(24 * scale)} fontSize={scale < 0.8 ? "text-sm" : scale < 1 ? "text-lg" : "text-xl"} />
            </div>
            <span className={`text-[8px] md:text-[10px] uppercase tracking-wider ${color} mt-1`}>{label}</span>
        </div>
    );
};

// ----------------------------------------------------------------------
// 3. MAIN COMPONENT
// ----------------------------------------------------------------------
interface CountdownTimerProps {
    targetDate?: string;
    scaleMobile?: number;
    scaleDesktop?: number;
}

export default function CountdownTimer({ targetDate = "2026-04-18T00:00:00", scaleMobile = 0.6, scaleDesktop = 1 }: CountdownTimerProps) {

    // Helper to calculate time
    const calculateTime = useCallback(() => {
        const difference = new Date(targetDate).getTime() - new Date().getTime();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }, [targetDate]);

    // Initialize directly since we are now client-only via dynamic import
    // Initialize with zeros to avoid hydration mismatch
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [currentScale, setCurrentScale] = useState(scaleDesktop);
    const container = useRef(null);

    // Responsive scale handler
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCurrentScale(scaleMobile);
            } else {
                setCurrentScale(scaleDesktop);
            }
        };

        handleResize(); // Set initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [scaleMobile, scaleDesktop]);

    // Timer Logic - Interval only
    useEffect(() => {
        setTimeLeft(calculateTime()); // Update immediately on client
        const timer = setInterval(() => {
            setTimeLeft(calculateTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, calculateTime]);

    return (
        <div className="flex items-start justify-center gap-1 md:gap-3" ref={container}>
            {/* Used text-primary instead of text-accent */}
            <TimeGroup label="Days" value={timeLeft.days} maxValue={99} color="text-primary" scale={currentScale} />

            <div className="h-[40px] flex items-center" style={{ height: Math.floor(40 * currentScale) }}>
                <span className={`font-bold text-white/50 ${currentScale < 0.8 ? 'text-sm' : 'text-xl'}`}>:</span>
            </div>

            <TimeGroup label="Hours" value={timeLeft.hours} maxValue={23} color="text-white/50" scale={currentScale} />

            <div className="h-[40px] flex items-center" style={{ height: Math.floor(40 * currentScale) }}>
                <span className={`font-bold text-white/50 ${currentScale < 0.8 ? 'text-sm' : 'text-xl'}`}>:</span>
            </div>

            <TimeGroup label="Min" value={timeLeft.minutes} maxValue={59} color="text-white/50" scale={currentScale} />

            <div className="h-[40px] flex items-center" style={{ height: Math.floor(40 * currentScale) }}>
                <span className={`font-bold text-white/50 ${currentScale < 0.8 ? 'text-sm' : 'text-xl'}`}>:</span>
            </div>

            <TimeGroup label="Sec" value={timeLeft.seconds} maxValue={59} color='text-primary' scale={currentScale} />
        </div>
    );
}

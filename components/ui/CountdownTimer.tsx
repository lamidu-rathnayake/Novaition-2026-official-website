"use client";
import { useEffect, useRef, useState } from 'react';

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
    const numbers = [
        ...Array.from({ length: limit + 1 }, (_, i) => limit - i),
        limit,
    ];

    const [y, setY] = useState(0);
    const [transition, setTransition] = useState('transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)');
    const prevValue = useRef(value);

    useEffect(() => {
        const targetIndex = limit - value;

        if (prevValue.current === 0 && value === limit) {
            const cloneIndex = limit + 1;
            setTransition('transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)');
            setY(-(cloneIndex * height));

            const timeout = setTimeout(() => {
                setTransition('none');
                setY(0);
            }, 500);

            return () => clearTimeout(timeout);
        } else {
            setTransition('transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)');
            setY(-(targetIndex * height));
        }

        prevValue.current = value;
    }, [value, limit, height]);

    return (
        <div
            style={{ height, width }}
            className="relative overflow-hidden"
        >
            <div
                className="absolute w-full top-0 flex flex-col items-center"
                style={{
                    transform: `translateY(${y}px)`,
                    transition: transition
                }}
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
    const limitTens = maxValue === 59 ? 5 : 9;
    const tens = Math.floor(value / 10);
    const ones = value % 10;

    // Calculate scaled dimensions
    const h = Math.floor(40 * scale);
    const w = Math.floor(24 * scale);
    // Responsive font size logic
    const fontSize = scale < 0.8 ? "text-sm" : scale < 1 ? "text-lg" : "text-xl";

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <Digit value={tens} limit={limitTens} color={color} height={h} width={w} fontSize={fontSize} />
                <Digit value={ones} limit={9} color={color} height={h} width={w} fontSize={fontSize} />
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
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMounted, setIsMounted] = useState(false);
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

    useEffect(() => {
        setIsMounted(true);

        const calculateTime = () => {
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
        };

        setTimeLeft(calculateTime());

        const timer = setInterval(() => {
            setTimeLeft(calculateTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    // Removed useGSAP entrance animation for instant appearance

    if (!isMounted) return null;

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

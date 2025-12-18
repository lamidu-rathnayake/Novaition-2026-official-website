import Image from 'next/image';
import Navbar from '../layout/Navbar';
import CountdownTimer from '../ui/CountdownTimer';

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-100 ">
                <Image
                    src="/hero-background.png"
                    alt="Background"
                    fill
                    className="object-cover grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90" />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col items-center justify-center relative z-10 w-full h-full pointer-events-none">

                {/* Container for Centered Logo and Bottom-Aligned Character */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pb-[10vh]">

                    {/* Logo Layer - Centered and Larger */}
                    {/* Centered but moved down slightly to group with character */}
                    <div className="relative w-[80vw] md:w-[60vw] lg:w-[50vw] z-10 opacity-90 translate-y-0">
                        <Image
                            src="/hero-logo.png"
                            alt="Logo"
                            width={800}
                            height={400}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Character Layer - Bottom Aligned to Viewport and Bigger */}
                {/* "make the character little bit bigger and bring it more front that bottom that the bottom of the character image perfectly align with the bottom of the hero section" */}
                {/* We use absolute bottom-0 and height relative to viewport to ensure it sits on the edge. */}

            </div>

            {/* Bottom Bar */}
            <div className="w-full py-8 flex flex-col md:flex-row justify-between items-end relative z-30 mt-auto bg-transparent" style={{ paddingLeft: 'var(--page-padding)', paddingRight: 'var(--page-padding)' }}>
                <div className="text-white/70 font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 md:mb-0 hidden md:block">
                    IEEE Industry Applications Society
                </div>
                <CountdownTimer targetDate="2026-02-01T00:00:00" scaleMobile={0.5} scaleDesktop={0.8} />
            </div>

            {/* Character Layer - Pushed Down to overlapping hide state */}
            {/* bottom-[-5vh] ensures it sits lower, and section overflow-hidden clips the excess */}
            <div className="absolute bottom-[0vh] md:bottom-[-15vh] z-20 w-full flex justify-center items-end pointer-events-none">
                <div className="relative w-auto h-[100vh] md:h-[90vh] lg:h-[95vh]">
                    <Image
                        src="/hero-character.png"
                        alt="Novaition Hero Character"
                        width={1200}
                        height={1400}
                        className="w-auto h-full object-contain object-bottom drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}

'use client';

export default function Contact() {
    return (
        <section className="page-container py-4 w-full bg-background text-foreground flex flex-col items-center justify-start h-auto md:h-screen">

            {/* Title */}
            <h2 className="flex-1 text-5xl md:text-6xl font-bold text-center py-12 tracking-wider text-white uppercase">
                CONTACT US
            </h2>

            <div className="w-full flex-8 mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0 relative">

                {/* Left Column: Hotlines */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:items-start gap-2 md:pl-0 text-center md:text-left">
                    <h3 className="text-3xl md:text-5xl font-bold uppercase text-white mb-2">
                        OUR HOTLINES
                    </h3>
                    <p className="text-xl md:text-2xl font-bold text-primary tracking-wide">011 2365 455</p>
                    <p className="text-xl md:text-2xl font-bold text-primary tracking-wide">011 2365 455</p>
                    <p className="text-xl md:text-2xl font-bold text-primary tracking-wide">011 2365 455</p>
                    <p className="text-xl md:text-2xl font-bold text-primary tracking-wide">011 2365 455</p>
                </div>

                {/* Vertical Splitter (Desktop Only) */}
                <div className="hidden md:block w-1 bg-white absolute left-1/2 top-0 bottom-0 -translate-x-1/2"></div>

                {/* Right Column: Email & Location */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-end gap-12 md:pr-0 text-center md:text-right">

                    {/* Email */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <h3 className="text-3xl md:text-5xl font-bold uppercase text-white mb-2">
                            OUR EMAIL
                        </h3>
                        <p className="text-lg md:text-2xl font-bold text-primary tracking-wide uppercase">
                            NOVAITION2026@GMAIL.COM
                        </p>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <h3 className="text-3xl md:text-5xl font-bold uppercase text-white mb-2">
                            LOCATION
                        </h3>
                        <p className="text-lg md:text-2xl font-bold text-primary tracking-wide uppercase max-w-md">
                            SRI LANKA TECHNOLOGY CAMPUS, PADUKKA
                        </p>
                    </div>

                </div>

            </div>

            {/* Bottom Padding */}
            <div className="h-16 md:h-24"></div>

        </section>
    );
}

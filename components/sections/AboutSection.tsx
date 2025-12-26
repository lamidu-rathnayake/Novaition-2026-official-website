export default function AboutSection() {
    // NOTE: For the 'font-display-tech' class to work, you must configure a custom font 
    // (e.g., Oswald, Bebas Neue) in your tailwind.config.js file.

    return (
        // Main Section: Ensures padding scales (py-12 -> lg:py-20) and content is centered vertically.
        <section className="page-container w-full min-h-screen bg-black text-white py-12 md:py-16 lg:py-20 flex flex-col justify-center">

            {/* Main Title: Always centered (text-center). */}
            <div className="w-full mb-10 md:mb-12 lg:mb-16 xl:mb-20">
                <h1 className="font-display-tech text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-center leading-none">
                    ABOUT NOV<span className="text-primary">AI</span>TTION 2026
                </h1>
            </div>

            {/* First Row: Switches from 1 column (mobile) to 2 columns (lg:grid-cols-2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 md:mb-10 lg:mb-12 xl:mb-16">

                {/* Left Column: Tagline. Centered on mobile, LEFT on large screens (lg:text-left). */}
                <div className="flex flex-col justify-start">
                    <h2 className="font-display-tech text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase leading-tight text-primary tracking-tight text-center lg:text-left">
                        WHERE INNOVATION MEETS INDUSTRY.
                    </h2>
                </div>

                {/* Right Column: Description. Centered on mobile, RIGHT on large screens (lg:text-right). */}
                <div className="flex flex-col justify-start lg:justify-center">
                    <p className="font-sans text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-white text-center lg:text-right">
                        AN OPEN INITIATIVE BY THE SLTC IEEE IAS STUDENT BRANCH,<br />
                        "SRI LANKA'S PREMIER STUDENT FORUM ON<br />
                        ARTIFICIAL INTELLIGENCE AND MODERN BUSINESS TRENDS.
                    </p>
                </div>
            </div>

            {/* Second Row: Switches from 1 column (mobile) to 2 columns (lg:grid-cols-2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">

                {/* Left Column: Description. Centered on mobile, LEFT on large screens (lg:text-left). */}
                <div className="flex flex-col justify-start lg:justify-center">
                    <p className="font-sans text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-white text-center lg:text-left">
                        AN OPEN INITIATIVE BY THE SLTC IEEE IAS STUDENT BRANCH,<br />
                        "SRI LANKA'S PREMIER STUDENT FORUM ON<br />
                        ARTIFICIAL INTELLIGENCE AND MODERN BUSINESS TRENDS.
                    </p>
                </div>

                {/* Right Column: Future Statement. Centered on mobile, RIGHT on large screens (lg:text-right). */}
                <div className="flex flex-col justify-start lg:justify-end lg:items-end">
                    {/* Note: The h2 already had lg:text-right, but now also has text-center */}
                    <h2 className="font-display-tech text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase leading-tight text-primary text-center lg:text-right tracking-tight">
                        DEFINING THE FUTURE OF AI & BUSINESS.
                    </h2>
                </div>
            </div>

            {/* Footer Logos: Already centered. */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10 mt-10 md:mt-12 lg:mt-16 opacity-60">
                <div className="text-white/70 font-sans text-[10px] md:text-xs tracking-widest uppercase">
                    IAS
                </div>
                <div className="text-white/70 font-sans text-[10px] md:text-xs tracking-widest uppercase">
                    IEEE Student Branch
                </div>
                <div className="text-white/70 font-sans text-[10px] md:text-xs tracking-widest uppercase">
                    SLTC
                </div>
                <div className="text-white/70 font-sans text-[10px] md:text-xs tracking-widest uppercase">
                    IEEE Student Branch
                </div>
            </div>
        </section>
    );
}
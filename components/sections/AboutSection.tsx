import Image from 'next/image';

export default function AboutSection() {
    // NOTE: For the 'font-display-tech' class to work, you must configure a custom font 
    // (e.g., Oswald, Bebas Neue) in your tailwind.config.js file.

    return (
        // Main Section: Ensures padding scales (py-12 -> lg:py-20) and content is centered vertically.
        <section className="page-container w-full min-h-screen bg-black text-white py-4 md:py-4 lg:py-4 flex flex-col justify-start items-start">

            {/* Main Title: Always centered (text-center). */}
            <div className="w-full py-4 mb-10 md:mb-12 lg:mb-16 xl:mb-20">
                
                <h1 className="text-5xl md:text-6xl font-bold text-center py-4 tracking-wider">
                    ABOUT NOV<span className="text-primary">AI</span>TTION 2026
                </h1>
            </div>

            <div className="content w-full flex-2 flex flex-col justify-around items-center">
                {/* First Row: Switches from 1 column (mobile) to 2 columns (lg:grid-cols-2) */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 md:mb-10 lg:mb-12 xl:mb-16">

                    {/* Left Column: Tagline. Always centered. */}
                    <div className="flex flex-col justify-start">
                        {/* make the tagline full width */}
                        <h2 className="w-full h-fit text-3xl md:text-5xl font-bold uppercase mb-2 leading-tight text-primary tracking-wider text-left">
                            WHERE INNOVATION MEETS <br />INDUSTRY.
                        </h2>
                    </div>

                    {/* Right Column: Description. Always centered. */}
                    <div className="flex flex-row justify-start"> 
                        <p className="w-2/3 font-sans text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-white text-left">
                            AN OPEN INITIATIVE BY THE SLTC IEEE IAS STUDENT BRANCH,<br />
                            "SRI LANKA'S PREMIER STUDENT FORUM ON<br />
                            ARTIFICIAL INTELLIGENCE AND MODERN BUSINESS TRENDS.
                            AN OPEN INITIATIVE BY THE SLTC IEEE IAS STUDENT BRANCH,<br />
                            "SRI LANKA'S PREMIER STUDENT FORUM ON<br />
                            ARTIFICIAL INTELLIGENCE AND MODERN BUSINESS TRENDS.
                        </p>
                    </div>
                </div>

                {/* Second Row: Switches from 1 column (mobile) to 2 columns (lg:grid-cols-2) */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">

                    {/* Left Column: Description. Always centered. */}
                    <div className="flex flex-row justify-end">
                        <p className="w-2/3 font-sans text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-white text-right">
                            AN OPEN INITIATIVE BY THE SLTC IEEE IAS STUDENT BRANCH,<br />
                            "SRI LANKA'S PREMIER STUDENT FORUM ON<br />
                            ARTIFICIAL INTELLIGENCE AND MODERN BUSINESS TRENDS.
                            AN OPEN INITIATIVE BY THE SLTC IEEE IAS STUDENT BRANCH,<br />
                            "SRI LANKA'S PREMIER STUDENT FORUM ON<br />
                            ARTIFICIAL INTELLIGENCE AND MODERN BUSINESS TRENDS.
                        </p>
                    </div>

                    {/* Right Column: Future Statement. Always centered. */}
                    <div className="flex flex-col justify-end">
                        <h2 className="w-full h-fit text-3xl md:text-5xl font-bold uppercase mb-2 leading-tight text-primary tracking-wider text-right">
                            DEFINING THE FUTURE OF AI <br />& BUSINESS.
                        </h2>
                    </div>
                </div>

            </div>

            {/* Footer Logos */}
            <div className="w-full flex-1 hidden md:flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10 mt-10 md:mt-12 lg:mt-16 opacity-0 md:opacity-80">
                <div className="relative w-16 h-8 md:w-32 md:h-16">
                    <Image
                        src="/sb-logo-white.png"
                        alt="SLTC Student Branch"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-px h-12 bg-white/50"></div>
                <div className="relative w-16 h-8 md:w-32 md:h-16">
                    <Image
                        src="/IAS New Logo 2024 White.png"
                        alt="IAS Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

        </section>
    );
}
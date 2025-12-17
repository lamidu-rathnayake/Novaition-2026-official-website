export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="page-container py-20 md:py-28">
        <h1 className="max-w-4xl">
          Novaition
          <span className="text-primary"> 2026</span>
        </h1>

        <p className="mt-6 max-w-xl">
          Novaition is a university-level AI event bringing together students,
          researchers, and industry leaders to explore the future of artificial
          intelligence.
        </p>
      </section>

      {/* ABOUT / INFO SECTION */}
      <section className="page-container py-16 md:py-20 bg-muted text-foreground">
        <h2>About the Event</h2>

        <p className="mt-4 max-w-2xl">
          Hosted at SLTC, Novaition 2026 creates a space for learning,
          collaboration, and innovation through expert talks, workshops,
          and hands-on sessions led by public figures in AI.
        </p>
      </section>

      {/* CALL TO ACTION */}
      <section className="page-container py-20 md:py-28">
        <h2>Join Us</h2>

        <p className="mt-4 max-w-xl">
          Registration is open for university students across Sri Lanka.
          Limited seats available.
        </p>

        <div className="mt-8">
          <button className="bg-primary text-black px-8 py-4 rounded-xl font-medium transition hover:opacity-90">
            Register Now
          </button>
        </div>
      </section>
    </main>
  );
}


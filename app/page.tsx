import HeroSection from '@/components/sections/HeroSection';
import Speakers from '@/components/sections/Speakers';
import Contact from '@/components/sections/Contact';
import University from '@/components/sections/University';
import Sponsers from '@/components/sections/Sponsers';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Speakers />
      <University />
      <Sponsers />
      <Contact />
    </main>
  );
}


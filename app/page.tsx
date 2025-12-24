import HeroSection from '@/components/sections/HeroSection';
import Speakers from '@/components/sections/Speakers';
import Contact from '@/components/sections/Contact';
import University from '@/components/sections/University';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Speakers />
      <University />
      <Contact />
    </main>
  );
}


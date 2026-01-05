import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import Speakers from '@/components/sections/Speakers';
import Clothing from '@/components/sections/Clothing';
import Contact from '@/components/sections/Contact';
import University from '@/components/sections/University';
import Sponsers from '@/components/sections/Sponsers';
import Teams from '@/components/sections/Teams';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <Speakers />
      <Clothing />
      <University />
      <Sponsers />
      <Teams />
      <Contact />
    </main>
  );
}


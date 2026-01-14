import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import Speakers from '@/components/sections/Speakers';
import Clothing from '@/components/sections/Clothing';
import Contact from '@/components/sections/Contact';
import University from '@/components/sections/University';
import Sponsers from '@/components/sections/Sponsers';
import Registration from '@/components/sections/Registration';
import TeamsTeaser from '@/components/sections/TeamsTeaser';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <Registration />
      <Speakers />
      <TeamsTeaser />
      <Clothing />
      <University />
      <Sponsers />
      <Contact />
    </main>
  );
}


import { Nav } from '@/components/Nav';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/home/About';
import { WorkIndex } from '@/components/home/WorkIndex';
import { Experience } from '@/components/home/Experience';
import { Numbers } from '@/components/home/Numbers';
import { Archive } from '@/components/home/Archive';
import { Leadership } from '@/components/home/Leadership';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <WorkIndex />
        <Experience />
        <Numbers />
        <Archive />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

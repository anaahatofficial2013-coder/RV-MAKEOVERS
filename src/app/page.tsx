'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Bridal from '@/components/Bridal';
import BeforeAfter from '@/components/BeforeAfter';
import Academy from '@/components/Academy';
import Courses from '@/components/Courses';
import Founder from '@/components/Founder';
import StudentExperience from '@/components/StudentExperience';
import Gallery from '@/components/Gallery';
import Instagram from '@/components/Instagram';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <main style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Bridal />
        <BeforeAfter />
        <Academy />
        <Courses />
        <Founder />
        <StudentExperience />
        <Gallery />
        <Instagram />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

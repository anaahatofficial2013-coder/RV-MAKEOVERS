'use client';

import { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const r = (delay: string) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  const line = (delay: string) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left' as const,
    transition: `opacity 0.6s ease ${delay}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ background: '#faf8f5' }}
    >
      <div className="mx-auto max-w-[1400px] flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

        {/* Left — Image Column */}
        <div
          className="w-full lg:w-[45%] relative self-start lg:self-auto lg:mt-12"
          style={r('0.3s')}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden" style={{
            background: 'linear-gradient(160deg, #ede6da 0%, #e8d5cc 100%)',
            border: '1px solid rgba(184,149,106,0.15)',
          }}>
            <span className="absolute bottom-4 left-0 w-full text-center font-sans text-[9px] tracking-[0.35em] uppercase" style={{ color: '#9a8e80' }}>
              RV MAKEOVERS
            </span>
          </div>
          {/* Overlapping location card */}
          <div
            className="absolute -bottom-4 right-0 md:bottom-6 md:-right-6 px-5 py-3"
            style={{
              background: '#1a1612',
              transform: 'rotate(3deg)',
            }}
          >
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: '#faf8f5' }}>
              NABHA, PUNJAB
            </span>
          </div>
        </div>

        {/* Right — Text Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          {/* Label */}
          <div className="mb-8 flex items-center gap-4" style={r('0.1s')}>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: '#b8956a' }}>
              OUR STORY
            </span>
            <span className="h-px w-[30px]" style={{ background: '#b8956a', opacity: 0.4 }} />
          </div>

          {/* Headline */}
          <h2 className="font-serif font-light leading-[1.15] tracking-[0.02em] text-4xl md:text-5xl lg:text-6xl" style={{ color: '#1a1612', ...r('0.25s') }}>
            Beauty isn&rsquo;t just
            <br />
            our profession.
            <br />
            <span className="text-gradient-gold">It&rsquo;s our craft.</span>
          </h2>

          {/* Body paragraphs */}
          <p className="mt-8 max-w-[540px] font-sans text-sm md:text-base leading-relaxed" style={{ color: '#6b5e50', ...r('0.45s') }}>
            RV Makeovers is where professional beauty services meet creative education.
            Founded and led by Simran, a professional makeup artist and educator, we&rsquo;ve
            built a space where clients experience premium transformations and aspiring
            beauty professionals receive hands-on training.
          </p>

          <p className="mt-5 max-w-[540px] font-sans text-sm md:text-base leading-relaxed" style={{ color: '#6b5e50', ...r('0.55s') }}>
            Every face we touch, every student we teach, every bride we prepare — carries
            our commitment to the art of beauty. From luxury salon services to professional
            certification programs, RV Makeovers is Nabha&rsquo;s premier destination for
            beauty and education.
          </p>

          {/* Decorative gold line */}
          <div className="mt-10 h-px" style={{ width: 40, background: '#b8956a', ...line('0.7s') }} />
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

export default function Founder() {
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: string) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  const line = (delay: string) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
    transition: `opacity 0.6s ease ${delay}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  const slideLeft = (delay: string) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateX(0)' : 'translateX(-40px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  const slideRight = (delay: string) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateX(0)' : 'translateX(40px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ background: '#1a1612' }}
    >
      <div className="mx-auto max-w-[1400px] flex flex-col items-center">

        {/* Label */}
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: '#b8956a', ...fade('0.1s') }}>
          THE ARTIST
        </span>

        {/* Name */}
        <h2
          className="mt-5 font-serif font-light tracking-[0.12em] leading-none text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] break-words"
          style={{ color: '#faf8f5', ...fade('0.2s') }}
        >
          SIMRAN
        </h2>

        {/* Gold line */}
        <div className="mt-6 h-px w-[80px]" style={{ background: '#b8956a', ...line('0.4s') }} />

        {/* Two-column content */}
        <div className="mt-16 flex w-full flex-col items-center gap-12 lg:mt-20 lg:flex-row lg:items-start lg:gap-16">

          {/* Left — Portrait */}
          <div className="w-full lg:w-[45%] flex justify-center" style={slideLeft('0.45s')}>
            <div
              className="relative aspect-[2/3] w-full max-w-sm overflow-hidden"
              style={{
                background: 'linear-gradient(170deg, #2d2822 0%, #1a1612 100%)',
                border: '1px solid rgba(184,149,106,0.2)',
                transform: 'rotate(-2deg)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              }}
            />
          </div>

          {/* Right — Bio */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center" style={slideRight('0.55s')}>

            {/* Title */}
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase" style={{ color: '#9a8e80' }}>
              MAKEUP ARTIST &nbsp;&middot;&nbsp; EDUCATOR &nbsp;&middot;&nbsp; FOUNDER
            </p>

            {/* Bio paragraphs */}
            <p className="mt-8 max-w-[520px] font-sans text-sm leading-relaxed" style={{ color: 'rgba(250,248,245,0.7)' }}>
              As the founder and creative force behind RV Makeovers, Simran combines her
              expertise as a professional makeup artist with her passion for education. She
              has built RV Makeovers into Nabha&rsquo;s premier beauty destination while
              simultaneously creating an academy that nurtures the next generation of beauty
              professionals.
            </p>

            <p className="mt-5 max-w-[520px] font-sans text-sm leading-relaxed" style={{ color: 'rgba(250,248,245,0.7)' }}>
              Her vision bridges the gap between client service and professional education —
              ensuring that every student learns through real salon experience and every
              client receives artistry-level attention.
            </p>

            {/* Quote */}
            <blockquote className="mt-10 pl-6" style={{ borderLeft: '2px solid #b8956a', ...fade('0.75s') }}>
              <p className="font-serif text-xl italic leading-relaxed" style={{ color: '#faf8f5' }}>
                &ldquo;Beauty is not about perfection.
                <br />
                It&rsquo;s about transformation.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

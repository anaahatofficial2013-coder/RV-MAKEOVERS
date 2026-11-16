'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = sectionRef.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * 8;
        const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * 8;
        setMousePos({ x: offsetX, y: offsetY });
      });
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const dot1Style = {
    transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
  };
  const dot2Style = {
    transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * 0.6}px)`,
  };
  const dot3Style = {
    transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * -0.9}px)`,
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden bg-[#faf8f5] flex items-center"
    >
      {/* Decorative radial gradient — warm gold wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 75% 50%, rgba(184,149,106,0.06) 0%, transparent 55%)',
        }}
      />

      {/* Floating decorative dots — hollow gold rings */}
      <div
        className="animate-float absolute rounded-full"
        style={{
          width: 6,
          height: 6,
          top: '22%',
          left: '14%',
          border: '1px solid #b8956a',
          background: 'transparent',
          animationDelay: '0s',
          animationDuration: '5s',
          ...dot1Style,
        }}
      />
      <div
        className="animate-float absolute rounded-full"
        style={{
          width: 5,
          height: 5,
          bottom: '28%',
          left: '22%',
          border: '1px solid #b8956a',
          background: 'transparent',
          animationDelay: '1.5s',
          animationDuration: '7s',
          ...dot2Style,
        }}
      />
      <div
        className="animate-float absolute rounded-full"
        style={{
          width: 4,
          height: 4,
          top: '40%',
          right: '30%',
          border: '1px solid #d4b896',
          background: 'transparent',
          animationDelay: '3s',
          animationDuration: '6s',
          ...dot3Style,
        }}
      />

      {/* ─── Main Content Grid ─── */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-0">
          {/* ─── Left Column (55%) ─── */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center lg:pr-12">
            {/* Thin gold accent line */}
            <div
              className="mb-8 h-px w-[40px]"
              style={{
                background: '#b8956a',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition:
                  'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.2s',
              }}
            />

            {/* Brand name */}
            <h1
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-[0.08em] leading-[0.95] text-[#1a1612]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition:
                  'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.35s',
              }}
            >
              RV
              <br />
              MAKEOVERS
            </h1>

            {/* Gold divider */}
            <div
              className="my-6 lg:my-8 h-px w-[60px]"
              style={{
                background: '#b8956a',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition:
                  'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.65s',
              }}
            />

            {/* Tagline */}
            <p
              className="font-serif text-2xl md:text-4xl font-light tracking-[0.04em] text-[#1a1612]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition:
                  'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.75s',
              }}
            >
              Where Beauty
            </p>
            <p
              className="text-gradient-gold font-serif text-2xl md:text-4xl font-light tracking-[0.04em]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition:
                  'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0.85s',
              }}
            >
              Becomes Art.
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-8 lg:mt-10 flex flex-col items-start gap-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition:
                  'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '1s',
              }}
            >
              {/* Primary CTA */}
              <a
                href="#contact"
                className="inline-block bg-[#1a1612] text-[#faf8f5] py-3.5 px-8 text-[11px] tracking-[0.2em] uppercase font-medium font-sans hover:bg-[#b8956a] transition-all duration-400"
              >
                BOOK YOUR MAKEOVER
              </a>

              {/* Secondary CTA */}
              <a
                href="#academy"
                className="group relative inline-block py-1 text-[11px] tracking-[0.2em] uppercase font-medium font-sans text-[#1a1612] hover:text-[#b8956a] transition-colors duration-300"
              >
                EXPLORE THE ACADEMY
                <span className="absolute bottom-0 left-0 h-px w-full bg-[#b8956a] origin-left scale-x-100 transition-transform duration-400 group-hover:scale-x-0" />
              </a>
            </div>

            {/* Location */}
            <p
              className="mt-10 lg:mt-16 text-[10px] tracking-[0.3em] uppercase font-sans font-medium text-[#9a8e80]"
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 1s ease',
                transitionDelay: '1.3s',
              }}
            >
              NABHA &nbsp;·&nbsp; PUNJAB
            </p>
          </div>

          {/* ─── Right Column (45%) — Image Area ─── */}
          <div
            className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'scale(1)' : 'scale(1.05)',
              filter: loaded ? 'blur(0px)' : 'blur(6px)',
              transition:
                'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1), filter 1.1s cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '0.4s',
            }}
          >
            <div className="relative w-full max-w-[420px]">
              {/* Image placeholder */}
              <div
                className="aspect-[3/4] w-full"
                style={{
                  background:
                    'linear-gradient(160deg, #ede6da 0%, #e8d5cc 60%, #d4b896 100%)',
                  border: '1px solid rgba(184,149,106,0.2)',
                }}
              />

              {/* Overlapping gold-bordered box */}
              <div
                className="absolute -bottom-5 left-0 md:-left-5 bg-[#faf8f5] px-5 py-3"
                style={{
                  border: '1px solid #b8956a',
                }}
              >
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-medium text-[#1a1612]">
                  EST. 2024 &nbsp;•&nbsp; NABHA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator (bottom center) ─── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:bottom-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
          transitionDelay: '1.5s',
        }}
      >
        <div
          className="w-px h-[30px] bg-[#1a1612]"
          style={{
            opacity: 0.2,
            animation: 'gentlePulse 2.5s ease-in-out infinite',
          }}
        />
        <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-[#9a8e80]">
          SCROLL
        </span>
      </div>
    </section>
  );
}

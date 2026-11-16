'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const categories = [
  { name: 'MAKEUP', icon: '✦' },
  { name: 'HAIR', icon: '✦' },
  { name: 'SKIN', icon: '✦' },
  { name: 'NAIL ART', icon: '✦' },
];

const programs = [
  'Professional Certification Tracks',
  'Beginner Training Programs',
  'Crash Courses',
  'Hands-on Masterclasses',
  'Practical Workshops',
  'Student Bridal Days',
];

const journeySteps = ['Learn', 'Practice', 'Create', 'Build Your Career'];

export default function Academy() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const programsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState({
    label: false,
    headline: false,
    desc: false,
    categories: [false, false, false, false],
    programs: false,
    journey: false,
    cta: false,
  });

  const setCategoryRef = useCallback((el: HTMLDivElement | null, idx: number) => {
    categoryRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;

        if (target === labelRef.current) {
          setVisible((v) => ({ ...v, label: true }));
        } else if (target === headlineRef.current) {
          setVisible((v) => ({ ...v, headline: true }));
        } else if (target === descRef.current) {
          setVisible((v) => ({ ...v, desc: true }));
        } else if (target === programsRef.current) {
          setVisible((v) => ({ ...v, programs: true }));
        } else if (target === journeyRef.current) {
          setVisible((v) => ({ ...v, journey: true }));
        } else if (target === ctaRef.current) {
          setVisible((v) => ({ ...v, cta: true }));
        } else {
          const idx = categoryRefs.current.indexOf(target as HTMLDivElement);
          if (idx !== -1) {
            setVisible((v) => {
              const cats = [...v.categories];
              cats[idx] = true;
              return { ...v, categories: cats };
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (labelRef.current) observer.observe(labelRef.current);
    if (headlineRef.current) observer.observe(headlineRef.current);
    if (descRef.current) observer.observe(descRef.current);
    if (programsRef.current) observer.observe(programsRef.current);
    if (journeyRef.current) observer.observe(journeyRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    categoryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="academy"
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: '#1a1612' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <span
          ref={labelRef}
          className="inline-block text-[10px] tracking-[0.3em] uppercase mb-8 font-sans transition-all duration-700 ease-out"
          style={{
            color: '#b8956a',
            opacity: visible.label ? 1 : 0,
            transform: visible.label ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          Academy
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-serif text-4xl md:text-6xl font-light leading-[1.1] mb-8 transition-all duration-700 ease-out"
          style={{
            color: '#faf8f5',
            opacity: visible.headline ? 1 : 0,
            transform: visible.headline ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          Turn your
          <br />
          passion into
          <br />
          <span className="text-gradient-gold">a profession.</span>
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-2xl text-sm leading-relaxed mb-20 font-sans transition-all duration-700 ease-out"
          style={{
            color: 'rgba(250,248,245,0.6)',
            opacity: visible.desc ? 1 : 0,
            transform: visible.desc ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          RV Makeovers Academy provides professional beauty education under Simran&apos;s
          expert guidance. From beginner training to advanced masterclasses, our programs
          are designed to transform your passion into a thriving career.
        </p>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              ref={(el) => setCategoryRef(el, i)}
              className="group border p-6 text-center cursor-pointer transition-all duration-500 ease-out"
              style={{
                borderColor: 'rgba(184,149,106,0.15)',
                backgroundColor: 'rgba(250,248,245,0.03)',
                opacity: visible.categories[i] ? 1 : 0,
                transform: visible.categories[i]
                  ? 'translateY(0)'
                  : 'translateY(24px)',
                transitionDelay: `${i * 100}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#b8956a';
                el.style.backgroundColor = 'rgba(184,149,106,0.05)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(184,149,106,0.15)';
                el.style.backgroundColor = 'rgba(250,248,245,0.03)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <span className="block text-xl mb-4" style={{ color: '#b8956a' }}>
                {cat.icon}
              </span>
              <span
                className="font-serif text-xl tracking-wide"
                style={{ color: '#faf8f5' }}
              >
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Program Highlights */}
        <div
          ref={programsRef}
          className="mb-24 transition-all duration-700 ease-out"
          style={{
            opacity: visible.programs ? 1 : 0,
            transform: visible.programs ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {programs.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="text-xs" style={{ color: '#b8956a' }}>◆</span>
                <span
                  className="text-sm font-sans"
                  style={{ color: 'rgba(250,248,245,0.5)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Pills */}
        <div
          ref={journeyRef}
          className="mb-20 transition-all duration-700 ease-out"
          style={{
            opacity: visible.journey ? 1 : 0,
            transform: visible.journey ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            {journeySteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span
                  className="inline-flex items-center border rounded-full px-4 py-2 text-[11px] tracking-wider uppercase font-sans"
                  style={{
                    borderColor: 'rgba(184,149,106,0.3)',
                    color: '#faf8f5',
                  }}
                >
                  {step}
                </span>
                {i < journeySteps.length - 1 && (
                  <span className="text-sm" style={{ color: '#b8956a' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="transition-all duration-700 ease-out"
          style={{
            opacity: visible.cta ? 1 : 0,
            transform: visible.cta ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <button
            className="magnetic-btn py-3 px-8 text-[11px] tracking-[0.2em] uppercase font-semibold font-sans rounded-full transition-all duration-300"
            style={{
              backgroundColor: '#b8956a',
              color: '#1a1612',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4b896';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#b8956a';
            }}
          >
            Join the Academy
          </button>
        </div>
      </div>
    </section>
  );
}

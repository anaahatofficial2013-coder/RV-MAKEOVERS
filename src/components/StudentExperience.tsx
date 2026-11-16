'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '01',
    title: 'LEARN',
    desc: 'Master the fundamentals through structured curriculum and expert guidance',
  },
  {
    num: '02',
    title: 'PRACTICE',
    desc: 'Apply your skills in our live salon environment with real clients',
  },
  {
    num: '03',
    title: 'TRANSFORM',
    desc: 'Witness the power of professional beauty artistry through real results',
  },
  {
    num: '04',
    title: 'CREATE',
    desc: 'Build your portfolio and launch your beauty career with confidence',
  },
];

export default function StudentExperience() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [visible, setVisible] = useState({
    label: false,
    headline: false,
    desc: false,
    steps: [false, false, false, false],
    images: [false, false, false],
  });

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
        } else {
          const stepIdx = stepsRef.current.indexOf(target as HTMLDivElement);
          if (stepIdx !== -1) {
            setTimeout(() => {
              setVisible((v) => {
                const steps = [...v.steps];
                steps[stepIdx] = true;
                return { ...v, steps };
              });
            }, stepIdx * 180);
          } else {
            const imgIdx = imagesRef.current.indexOf(target as HTMLDivElement);
            if (imgIdx !== -1) {
              setTimeout(() => {
                setVisible((v) => {
                  const images = [...v.images];
                  images[imgIdx] = true;
                  return { ...v, images };
                });
              }, imgIdx * 120);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (labelRef.current) observer.observe(labelRef.current);
    if (headlineRef.current) observer.observe(headlineRef.current);
    if (descRef.current) observer.observe(descRef.current);
    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    imagesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: '#ede6da' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span
            ref={labelRef}
            className="inline-block text-[10px] tracking-[0.3em] uppercase mb-8 font-sans transition-all duration-700 ease-out"
            style={{
              color: '#b8956a',
              opacity: visible.label ? 1 : 0,
              transform: visible.label ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            The Journey
          </span>

          <h2
            ref={headlineRef}
            className="font-serif text-4xl md:text-6xl font-light leading-[1.1] mb-6 transition-all duration-700 ease-out"
            style={{
              color: '#1a1612',
              opacity: visible.headline ? 1 : 0,
              transform: visible.headline ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            From learner
            <br />
            <span className="text-gradient-gold">to artist</span>
          </h2>

          <p
            ref={descRef}
            className="max-w-2xl text-sm leading-relaxed font-sans transition-all duration-700 ease-out"
            style={{
              color: '#6b5e50',
              opacity: visible.desc ? 1 : 0,
              transform: visible.desc ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Our students don&apos;t just learn theory — they practice on real clients,
            build real skills, and graduate ready to launch their careers.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mb-24">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 w-[2px]"
            style={{
              left: '5px',
              backgroundColor: 'rgba(184,149,106,0.2)',
            }}
          />

          {steps.map((step, i) => {
            const isStepVisible = visible.steps[i];

            return (
              <div
                key={step.num}
                ref={(el) => {
                  stepsRef.current[i] = el;
                }}
                className="relative pl-10 pb-12 last:pb-0"
              >
                {/* Gold circle node */}
                <div
                  className="absolute top-0 rounded-full transition-all duration-500"
                  style={{
                    left: '0px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#b8956a',
                  }}
                />

                {/* Content */}
                <div
                  className="transition-all duration-700 ease-out"
                  style={{
                    opacity: isStepVisible ? 1 : 0,
                    transform: isStepVisible ? 'translateX(0)' : 'translateX(-32px)',
                  }}
                >
                  <span className="block text-xs tracking-widest mb-1 font-sans" style={{ color: '#b8956a' }}>
                    {step.num}
                  </span>
                  <h3
                    className="font-serif text-2xl tracking-wide mb-2"
                    style={{ color: '#1a1612' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed font-sans max-w-md"
                    style={{ color: '#6b5e50' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Work Image Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => {
            const isVisible = visible.images[i];

            return (
              <div
                key={i}
                ref={(el) => {
                  imagesRef.current[i] = el;
                }}
                className="aspect-[4/3] border cursor-pointer transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, #e8d5cc, #d4b896)',
                  borderColor: 'rgba(184,149,106,0.15)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${i * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.filter = 'brightness(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif text-sm tracking-[0.2em] uppercase select-none" style={{ color: 'rgba(250,248,245,0.5)' }}>
                    Student Work
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

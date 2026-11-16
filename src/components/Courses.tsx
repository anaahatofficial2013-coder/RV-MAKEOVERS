'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Course {
  number: string;
  title: string;
  description: string;
  tags: string;
}

const courses: Course[] = [
  {
    number: '01',
    title: 'Pro Makeup',
    description:
      'Professional makeup fundamentals and advanced techniques. Master HD bridal, party, and editorial looks.',
    tags: 'Certification · 8 Weeks · Hands-on',
  },
  {
    number: '02',
    title: 'Hair Mastery',
    description:
      'Cutting, styling, colouring and professional hair treatments. From basics to advanced techniques.',
    tags: 'Certification · 6 Weeks · Practical',
  },
  {
    number: '03',
    title: 'Skin Specialist',
    description:
      'Facials, skincare routines, and professional skin treatments. Learn HydraFacial and advanced protocols.',
    tags: 'Certification · 5 Weeks · Clinical',
  },
  {
    number: '04',
    title: 'Nail Art',
    description:
      'Extensions, overlays, gel techniques and creative nail artistry. Build your portfolio.',
    tags: 'Certification · 4 Weeks · Creative',
  },
];

export default function Courses() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const noteRef = useRef<HTMLParagraphElement>(null);

  const [visible, setVisible] = useState({
    label: false,
    headline: false,
    cards: [false, false, false, false],
    note: false,
  });

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const setCardRef = useCallback((el: HTMLDivElement | null, idx: number) => {
    cardRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.12,
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
        } else if (target === noteRef.current) {
          setVisible((v) => ({ ...v, note: true }));
        } else {
          const idx = cardRefs.current.indexOf(target as HTMLDivElement);
          if (idx !== -1) {
            setVisible((v) => {
              const cards = [...v.cards];
              cards[idx] = true;
              return { ...v, cards };
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (labelRef.current) observer.observe(labelRef.current);
    if (headlineRef.current) observer.observe(headlineRef.current);
    if (noteRef.current) observer.observe(noteRef.current);
    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-5xl mx-auto">
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
          Courses
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-serif text-4xl md:text-6xl leading-[1.1] mb-16 transition-all duration-700 ease-out"
          style={{
            color: '#1a1612',
            opacity: visible.headline ? 1 : 0,
            transform: visible.headline ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          Invest in
          <br />
          <span className="text-gradient-gold">your craft</span>
        </h2>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {courses.map((course, i) => {
            const isHovered = hoveredCard === i;
            return (
              <div
                key={course.number}
                ref={(el) => setCardRef(el, i)}
                className="relative overflow-hidden p-8 md:p-10 cursor-pointer transition-all duration-500 ease-out"
                style={{
                  backgroundColor: '#f0ebe3',
                  border: `1px solid ${isHovered ? '#b8956a' : 'rgba(184,149,106,0.1)'}`,
                  transform: visible.cards[i]
                    ? isHovered
                      ? 'translateY(-3px)'
                      : 'translateY(0)'
                    : 'translateY(32px)',
                  opacity: visible.cards[i] ? 1 : 0,
                  boxShadow: isHovered
                    ? '0 12px 40px rgba(184,149,106,0.08)'
                    : 'none',
                  transitionDelay: visible.cards[i] ? '0ms' : `${i * 120}ms`,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gold line at top */}
                <div
                  className="absolute top-0 left-0 h-[1px] origin-left transition-all duration-500 ease-out"
                  style={{
                    backgroundColor: '#b8956a',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    width: '100%',
                  }}
                />

                {/* Number */}
                <span
                  className="block font-serif text-5xl mb-6 leading-none transition-colors duration-300"
                  style={{
                    color: '#ede6da',
                  }}
                >
                  {course.number}
                </span>

                {/* Title */}
                <h3
                  className="font-serif text-2xl mb-4 tracking-wide"
                  style={{ color: '#1a1612' }}
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-8 font-sans"
                  style={{ color: '#6b5e50' }}
                >
                  {course.description}
                </p>

                {/* Tags */}
                <span
                  className="text-[10px] tracking-wider uppercase font-sans"
                  style={{ color: '#b8956a' }}
                >
                  {course.tags}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p
          ref={noteRef}
          className="text-center text-xs font-sans transition-all duration-700 ease-out"
          style={{
            color: '#9a8e80',
            opacity: visible.note ? 1 : 0,
            transform: visible.note ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          All courses include hands-on training under professional guidance.
        </p>
      </div>
    </section>
  );
}

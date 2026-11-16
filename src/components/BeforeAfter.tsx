'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { capture: true });
    window.addEventListener('mouseup', handleEnd, { capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd, { capture: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, { capture: true });
      window.removeEventListener('mouseup', handleEnd, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd, { capture: true });
    };
  }, [isDragging, updatePosition]);

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: '#f0ebe3' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-medium"
            style={{ color: '#b8956a' }}
          >
            Transformations
          </span>
          <h2 className="mt-6">
            <span className="font-serif text-4xl md:text-6xl font-light block" style={{ color: '#1a1612' }}>
              Transformation,
            </span>
            <span className="font-serif text-4xl md:text-6xl font-light text-gradient-gold">
              made personal.
            </span>
          </h2>
        </div>

        {/* Slider */}
        <div
          className={`max-w-[800px] mx-auto transition-all duration-1000 delay-200 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-sm select-none cursor-ew-resize"
            style={{
              aspectRatio: '16 / 10',
            }}
          >
            {/* Mobile aspect ratio override */}
            <style jsx global>{`
              @media (max-width: 768px) {
                .ba-slider-container {
                  aspect-ratio: 4 / 3 !important;
                }
              }
            `}</style>

            {/* Before (Background) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, #d6ccbc 0%, #c4b8a6 100%)',
              }}
            />

            {/* After (Foreground) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, #e8d5cc 0%, #d4b896 100%)',
                clipPath: `inset(0 ${100 - position}% 0 0)`,
                transition: isDragging ? 'none' : 'clip-path 0.1s ease-out',
              }}
            />

            {/* Drag Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{
                left: `${position}%`,
                width: '2px',
                backgroundColor: '#b8956a',
                transform: 'translateX(-50%)',
              }}
            />

            {/* Drag Handle Circle */}
            <div
              className="absolute z-20 flex items-center justify-center"
              style={{
                left: `${position}%`,
                top: '50%',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#b8956a',
                color: '#faf8f5',
                transform: 'translate(-50%, -50%)',
                fontSize: '14px',
                letterSpacing: '2px',
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              ◂ ▸
            </div>

            {/* Labels */}
            <div
              className="absolute bottom-4 left-4 z-10 text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(26,22,18,0.6)' }}
            >
              Before
            </div>
            <div
              className="absolute bottom-4 right-4 z-10 text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(26,22,18,0.6)' }}
            >
              After
            </div>
          </div>

          {/* Caption */}
          <p
            className={`text-center mt-6 transition-all duration-1000 delay-400 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ color: '#9a8e80' }}
          >
            <em className="font-serif text-sm italic">
              See the difference professional artistry makes.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
}

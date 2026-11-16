'use client';

import { useRef, useEffect, useState } from 'react';

const features = [
  'HD Bridal Makeup',
  'Customized Hairstyling',
  'Saree Draping & Pre-Pleating',
  'Long-lasting Professional Makeup',
  'Customized Bridal Looks',
];

export default function Bridal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="bridal"
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            {/* Label */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium"
                style={{ color: '#b8956a' }}
              >
                Bridal
              </span>
            </div>

            {/* Headline */}
            <div
              className={`mt-6 transition-all duration-1000 delay-100 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-light leading-snug">
                <span style={{ color: '#1a1612' }}>Your biggest day</span>
                <br />
                <span style={{ color: '#1a1612' }}>deserves your best</span>
                <br />
                <span className="text-gradient-gold">look.</span>
              </h2>
            </div>

            {/* Gold Line */}
            <div
              className={`mt-8 transition-all duration-1000 delay-200 ease-out ${
                isVisible
                  ? 'opacity-100 scale-x-100'
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                width: '40px',
                height: '1px',
                backgroundColor: '#b8956a',
                transformOrigin: 'left',
              }}
            />

            {/* Feature List */}
            <div
              className={`mt-10 transition-all duration-1000 delay-300 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 mb-2.5"
                  style={{
                    animation: isVisible
                      ? `fadeSlideIn 0.4s ease-out ${0.4 + index * 0.08}s both`
                      : 'none',
                  }}
                >
                  <span
                    className="text-[8px] flex-shrink-0"
                    style={{ color: '#b8956a' }}
                  >
                    ◆
                  </span>
                  <span
                    className="text-sm tracking-wide"
                    style={{ color: '#6b5e50' }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`mt-10 transition-all duration-1000 delay-500 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                className="magnetic-btn py-3.5 px-8 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: '#1a1612',
                  color: '#faf8f5',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b8956a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a1612';
                }}
              >
                Plan My Bridal Look
              </button>
            </div>
          </div>

          {/* Right: Image Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main Image Area */}
            <div
              className="aspect-[3/4] rounded-sm border relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, #ede6da 0%, #e8d5cc 100%)',
                borderColor: 'rgba(184,149,106,0.15)',
              }}
            >
              {/* Subtle inner texture */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 40%, rgba(184,149,106,0.1) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Floating Gold Circle */}
            <div
              className="animate-float absolute -top-4 right-0 md:-top-6 md:-right-6"
              style={{
                width: '64px',
                height: '64px',
                border: '1px solid rgba(184,149,106,0.3)',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

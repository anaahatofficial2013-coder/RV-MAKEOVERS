'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const categories = [
  {
    name: 'Makeup',
    services: [
      'HD Bridal Makeup',
      'Engagement Makeup',
      'Reception Makeup',
      'Pre-Wedding Makeup',
      'HD Party Makeup',
    ],
  },
  {
    name: 'Hair',
    services: [
      'Precision Haircuts',
      'Blowouts',
      'Global Hair Colour',
      'Hair Spa',
      'Kerasmooth',
      'Keratin',
      'Straightening',
      'Professional Hairstyling',
    ],
  },
  {
    name: 'Skin & Body',
    services: [
      'HydraFacial',
      'Advanced Skin Treatments',
      'Body Polishing',
      'Waxing',
      'Manicure',
      'Pedicure',
    ],
  },
  {
    name: 'Nails',
    services: [
      'Nail Extensions',
      'Gel Extensions',
      'Custom Nail Art',
      'Nail Overlays',
    ],
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const currentCategory = categories[activeCategory];

  const handleCategoryInteraction = useCallback(
    (index: number) => {
      setActiveCategory(index);
      setMobileOpen(index);
    },
    []
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: '#f0ebe3' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`mb-16 md:mb-24 transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-medium"
            style={{ color: '#b8956a' }}
          >
            Services
          </span>
          <h2 className="mt-6">
            <span
              className="font-serif text-4xl md:text-6xl font-light block"
              style={{ color: '#1a1612' }}
            >
              The Art of
            </span>
            <span className="font-serif text-4xl md:text-6xl font-light text-gradient-gold">
              Transformation
            </span>
          </h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-[2fr_3fr] gap-12 lg:gap-20">
          {/* Left: Category Tabs */}
          <div
            className={`transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {categories.map((category, index) => {
              const isActive = activeCategory === index;
              const isHovered = hoveredCategory === index;

              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(index)}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="w-full text-left py-6 border-b border-[rgba(184,149,106,0.15)] transition-all duration-300 group"
                  style={{
                    borderBottomColor: isActive
                      ? '#b8956a'
                      : 'rgba(184,149,106,0.15)',
                    opacity: isActive || isHovered ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-xs tracking-widest transition-colors duration-300"
                      style={{
                        color: isActive ? '#b8956a' : '#6b5e50',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-serif text-2xl md:text-3xl transition-colors duration-300 ${
                        isActive ? 'font-medium' : ''
                      }`}
                      style={{
                        color: isActive ? '#1a1612' : '#6b5e50',
                      }}
                    >
                      {category.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Services List + Visual */}
          <div
            className={`transition-all duration-1000 delay-400 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Services List */}
            <div className="mb-10">
              {currentCategory.services.map((service, i) => (
                <div
                  key={`${activeCategory}-${service}`}
                  className="py-2 flex items-center gap-3 cursor-default transition-all duration-300 hover:translate-x-1 group"
                  style={{
                    animation: isVisible
                      ? `fadeSlideIn 0.4s ease-out ${i * 0.07}s both`
                      : 'none',
                    color: '#6b5e50',
                  }}
                >
                  <span
                    className="text-[8px] transition-colors duration-300 group-hover:text-[#1a1612]"
                    style={{ color: '#b8956a' }}
                  >
                    ◆
                  </span>
                  <span className="text-sm tracking-wide transition-colors duration-300 group-hover:text-[#1a1612]">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            {/* Decorative Visual */}
            <div
              className="aspect-[16/10] rounded-sm border"
              style={{
                background: 'linear-gradient(135deg, #ede6da 0%, #e8d5cc 100%)',
                borderColor: 'rgba(184,149,106,0.2)',
              }}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div
          className={`md:hidden transition-all duration-1000 delay-200 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((category, index) => {
            const isOpen = mobileOpen === index;

            return (
              <div
                key={category.name}
                className="border-b border-[rgba(184,149,106,0.15)]"
              >
                <button
                  onClick={() => setMobileOpen(isOpen ? null : index)}
                  className="w-full text-left py-6 flex items-baseline gap-4"
                >
                  <span
                    className="text-xs tracking-widest"
                    style={{
                      color: isOpen ? '#b8956a' : '#6b5e50',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-serif text-2xl"
                    style={{
                      color: isOpen ? '#1a1612' : '#6b5e50',
                      fontWeight: isOpen ? 500 : 400,
                    }}
                  >
                    {category.name}
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-400 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '400px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-6 pl-8">
                    {category.services.map((service) => (
                      <div
                        key={service}
                        className="py-1.5 flex items-center gap-3"
                        style={{ color: '#6b5e50' }}
                      >
                        <span
                          className="text-[8px]"
                          style={{ color: '#b8956a' }}
                        >
                          ◆
                        </span>
                        <span className="text-sm tracking-wide">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Decorative Visual */}
          <div
            className="aspect-[16/10] rounded-sm border mt-10"
            style={{
              background: 'linear-gradient(135deg, #ede6da 0%, #e8d5cc 100%)',
              borderColor: 'rgba(184,149,106,0.2)',
            }}
          />
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

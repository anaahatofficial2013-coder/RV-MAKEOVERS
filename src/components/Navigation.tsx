'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'HOME', id: 'home' },
  { label: 'SERVICES', id: 'services' },
  { label: 'BRIDAL', id: 'bridal' },
  { label: 'ACADEMY', id: 'academy' },
  { label: 'ABOUT', id: 'about' },
  { label: 'GALLERY', id: 'gallery' },
  { label: 'CONTACT', id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(250,248,245,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(184,149,106,0.15)'
            : '1px solid transparent',
        }}
      >
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 md:px-12 h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="font-serif text-xl tracking-wider text-[#1a1612] hover:text-[#b8956a] transition-colors duration-300"
          >
            RV
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[10px] tracking-[0.25em] uppercase font-medium text-[#1a1612] hover:text-[#b8956a] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden lg:block text-[10px] tracking-[0.2em] uppercase font-medium px-6 py-2.5 border border-[#1a1612] bg-transparent text-[#1a1612] hover:bg-[#1a1612] hover:text-[#faf8f5] transition-all duration-300"
          >
            BOOK NOW
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1px] bg-[#1a1612] transition-all duration-300 origin-center ${
                mobileOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-[#1a1612] transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-[#1a1612] transition-all duration-300 origin-center ${
                mobileOpen ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#faf8f5] flex flex-col items-center justify-center gap-10 transition-all duration-500 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="font-serif text-2xl tracking-[0.15em] font-light text-[#1a1612] hover:text-[#b8956a] transition-all duration-300"
            style={{
              transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          className="mt-4 text-[10px] tracking-[0.2em] uppercase font-medium px-8 py-3 border border-[#1a1612] text-[#1a1612] hover:bg-[#1a1612] hover:text-[#faf8f5] transition-all duration-300"
          style={{
            transitionDelay: mobileOpen
              ? `${NAV_LINKS.length * 60}ms`
              : '0ms',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          BOOK NOW
        </button>
      </div>
    </>
  );
}

'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24 bg-[#1a1612]"
    >
      <div
        ref={sectionRef}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        {/* CTA Area */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#b8956a]">
            GET IN TOUCH
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#faf8f5] mt-6">
            Ready for your<br />
            <span className="text-gradient-gold">transformation?</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button className="bg-[#b8956a] text-[#1a1612] py-3.5 px-8 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#d4b896] transition-colors duration-300">
              BOOK AN APPOINTMENT
            </button>
            <button
              onClick={() => window.open('tel:+917508533429')}
              className="border border-[rgba(250,248,245,0.3)] text-[#faf8f5] bg-transparent py-3.5 px-8 text-[11px] tracking-[0.2em] uppercase font-semibold hover:border-[#b8956a] hover:text-[#b8956a] transition-colors duration-300"
            >
              CALL NOW
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Location */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8956a]">
              VISIT US
            </p>
            <p className="text-sm text-[rgba(250,248,245,0.6)] leading-relaxed mt-4">
              RV Makeovers Salon &amp; Academy<br />
              Bouran Gate, Bhawanigarh Road<br />
              Near Hungry Hunter Cafe<br />
              Rani Bagh, Nabha, Punjab 147201
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8956a]">
              REACH US
            </p>
            <div className="text-sm text-[rgba(250,248,245,0.6)] mt-4 space-y-2">
              <p>
                <a
                  href="tel:+917508533429"
                  className="hover:text-[#b8956a] transition-colors duration-300"
                >
                  +91 75085 33429
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/rv_makeovers_nabha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#b8956a] transition-colors duration-300"
                >
                  @rv_makeovers_nabha
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8956a]">
              HOURS
            </p>
            <p className="text-sm text-[rgba(250,248,245,0.6)] mt-4">
              Daily · 9:00 AM – 7:00 PM
            </p>
            <p className="text-xs text-[rgba(250,248,245,0.35)] mt-2">
              Walk-ins welcome. Appointments recommended.
            </p>
          </div>
        </div>

        {/* Live Google Map */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="aspect-[21/9] md:aspect-video overflow-hidden border border-[rgba(184,149,106,0.15)] rounded-sm bg-[#2d2822]">
            <iframe
              title="RV Makeovers Salon & Academy — Bouran Gate, Bhawanigarh Road, Nabha"
              src="https://maps.google.com/maps?q=RV%20Makeovers%20Salon%20%26%20Academy%2C%20Bouran%20Gate%2C%20Bhawanigarh%20Road%2C%20Near%20Hungry%20Hunter%20Cafe%2C%20Rani%20Bagh%2C%20Nabha%2C%20Punjab%20147201&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="text-[10px] text-[rgba(250,248,245,0.25)] text-center mt-3">
            Find us at Bouran Gate, Bhawanigarh Road, Nabha
          </p>
        </div>
      </div>
    </section>
  );
}
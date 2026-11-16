'use client'

import { useEffect, useRef, useState } from 'react'

const JUSTDIAL_URL =
  'https://www.justdial.com/Nabha/RV-Makeovers-Salon-Academy-Nabha-Rani-Bagh/9999PX175-X175-240811000259-W5W6_BZDET'

const featured = {
  quote:
    'I had a wonderful experience at RV Makeovers! From the moment I walked in, I was warmly welcomed by the owner, whose kind and cheerful nature immediately made me feel at ease. The entire staff is incredibly professional, friendly, and attentive — they genuinely care about their clients. The salon itself is clean, beautifully set up, and has a calming vibe. You can tell they take pride in maintaining high standards of service and hygiene. I left feeling pampered, refreshed, and already looking forward to my next visit. Highly recommended to anyone looking for top-notch service with a personal touch!',
  name: 'Navreet Kaur',
}

const reviews = [
  {
    quote:
      "It's really one of the best salon in Nabha with such a professional, trained and humble staff. I suggest all to always go there and have a feel of comfort and satisfaction. I also loved Simran mam's lovable nature.",
    name: 'Ravina Thind',
  },
  {
    quote:
      'I visited RV Makeovers for my hair treatment — Nanoplastia. My hair was so dry and damaged, but after treatment it feels so smooth. Overall services by staff are so good and professional, and I feel like I am one of them. I did not feel awkward as I visited for the first time. I advise everyone to visit once and feel their services.',
    name: 'Aman Sharma',
  },
  {
    quote:
      "I think I don't have words to explain my experience with Simran mam. I can just say — I got my dream makeup.",
    name: 'Jogita Sabharwal',
  },
  {
    quote:
      'You have such a gift for bringing out the best in people. I am so grateful for your skills. You give me more than my expectations. Your staff is very good and polite. Your way of treating customers is very good. Once again thank you so much to RV Makeovers.',
    name: 'Navneet Kaur',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
    transitionDelay: `${delay}s`,
  })

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 bg-[#faf8f5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#b8956a] mb-5"
            style={reveal(0.1)}
          >
            Kind Words
          </p>

          <h2 className="font-serif text-4xl md:text-6xl text-[#1a1612]" style={reveal(0.2)}>
            What our clients{' '}
            <span className="text-gradient-gold">say</span>
          </h2>

          {/* Real rating badge */}
          <a
            href={JUSTDIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-7 px-5 py-2.5 bg-[#f0ebe3] border border-[rgba(184,149,106,0.2)] hover:border-[#b8956a] transition-colors duration-300"
            style={reveal(0.3)}
          >
            <span className="text-sm tracking-[0.15em] text-[#b8956a]" aria-hidden="true">
              ★★★★★
            </span>
            <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#6b5e50]">
              5.0 · 45+ reviews
            </span>
          </a>
        </div>

        {/* Featured Testimonial */}
        <div
          className="relative mx-auto max-w-3xl p-8 sm:p-12 bg-[#f0ebe3]"
          style={{
            border: '1px solid rgba(184,149,106,0.12)',
            ...reveal(0.4),
          }}
        >
          {/* Decorative quote mark */}
          <span className="font-serif text-8xl leading-none select-none absolute top-2 left-6 text-[#e3dbcd]">
            &ldquo;
          </span>

          <blockquote className="relative z-10 mt-10">
            <p className="font-serif text-lg md:text-2xl italic text-[#1a1612] leading-relaxed">
              {featured.quote}
            </p>
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="text-xs text-[#b8956a]" aria-hidden="true">
              ★★★★★
            </span>
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#6b5e50]">
              {featured.name}
            </span>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className="relative p-8 bg-[#f0ebe3]"
              style={{
                border: '1px solid rgba(184,149,106,0.12)',
                ...reveal(0.6 + i * 0.15),
              }}
            >
              <span className="font-serif text-5xl leading-none select-none absolute top-3 left-4 text-[#e3dbcd]">
                &ldquo;
              </span>

              <blockquote className="relative z-10 mt-4">
                <p className="font-serif text-base md:text-lg italic text-[#1a1612]/80 leading-relaxed">
                  {review.quote}
                </p>
              </blockquote>

              <div className="mt-5 h-px w-8 bg-[#b8956a]/40" />

              <div className="mt-4 flex items-center gap-3">
                <span className="text-[11px] text-[#b8956a]" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6b5e50]">
                  {review.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="mt-12 text-center font-sans text-xs text-[#9a8e80]"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease',
            transitionDelay: '1.2s',
          }}
        >
          Verified client reviews ·{' '}
          <a
            href={JUSTDIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#b8956a] transition-colors duration-300"
          >
            See all 45+ reviews
          </a>
        </p>
      </div>
    </section>
  )
}

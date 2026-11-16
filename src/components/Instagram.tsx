'use client'

import { useEffect, useRef, useState } from 'react'

const posts = [
  {
    url: 'https://www.instagram.com/reel/Dev_Q1KSwY1/',
    fallback: 'Hair Transformation — 441 likes on Instagram',
  },
  {
    url: 'https://www.instagram.com/reel/Db0cUzgJO5q/',
    fallback: 'Before to After Party Makeup by Simran — 138 likes on Instagram',
  },
  {
    url: 'https://www.instagram.com/reel/DfUWp43JP2C/',
    fallback: 'Bridal Nails at RV Makeovers — 39 likes on Instagram',
  },
]

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

export default function Instagram() {
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
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Load Instagram's official embed script once, then process the post embeds
  useEffect(() => {
    const processEmbeds = () => window.instgrm?.Embeds.process()

    if (window.instgrm) {
      processEmbeds()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = processEmbeds
    document.body.appendChild(script)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 bg-[#f0ebe3]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#b8956a] mb-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '0.1s',
            }}
          >
            Follow Us
          </p>

          <h2
            className="font-serif text-2xl sm:text-3xl md:text-5xl tracking-wide text-[#1a1612] break-words"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '0.2s',
            }}
          >
            @rv_makeovers_nabha
          </h2>

          <p
            className="mt-5 max-w-lg mx-auto font-sans text-sm text-[#6b5e50]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '0.35s',
            }}
          >
            Follow our journey and witness daily transformations on Instagram.
          </p>
        </div>

        {/* Real Instagram post embeds */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-20 max-w-6xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '0.4s',
          }}
        >
          {posts.map((post) => (
            <div key={post.url} className="flex justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={post.url}
                data-instgrm-version="14"
                style={{
                  width: '100%',
                  minWidth: 0,
                  maxWidth: 540,
                  margin: '0 auto',
                  background: '#fff',
                  border: '1px solid rgba(184,149,106,0.15)',
                  borderRadius: 0,
                }}
              >
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.fallback}
                </a>
              </blockquote>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '0.6s',
          }}
        >
          <button
            onClick={() => window.open('https://instagram.com/rv_makeovers_nabha', '_blank')}
            className="py-3 px-8 font-sans text-[11px] tracking-[0.2em] uppercase border text-[#1a1612] hover:bg-[#1a1612] hover:text-[#faf8f5] transition-all duration-400"
            style={{ borderWidth: '1px' }}
          >
            Follow the Transformations
          </button>
        </div>
      </div>
    </section>
  )
}

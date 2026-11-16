'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type Category = 'ALL' | 'BRIDAL' | 'MAKEUP' | 'HAIR' | 'NAILS' | 'ACADEMY' | 'TRANSFORMATIONS'

const categories: Category[] = ['ALL', 'BRIDAL', 'MAKEUP', 'HAIR', 'NAILS', 'ACADEMY', 'TRANSFORMATIONS']

interface GalleryItem {
  id: number
  category: Category
  aspect: string
  gradient: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: 'BRIDAL', aspect: 'aspect-[3/4]', gradient: 'linear-gradient(135deg, #ede6da 0%, #e8d5cc 100%)' },
  { id: 2, category: 'MAKEUP', aspect: 'aspect-square', gradient: 'linear-gradient(160deg, #e8d5cc 0%, #d4b896 100%)' },
  { id: 3, category: 'HAIR', aspect: 'aspect-square', gradient: 'linear-gradient(145deg, #f0ebe3 0%, #ede6da 100%)' },
  { id: 4, category: 'BRIDAL', aspect: 'aspect-[3/4]', gradient: 'linear-gradient(170deg, #d4b896 0%, #c4b8a6 100%)' },
  { id: 5, category: 'NAILS', aspect: 'aspect-square', gradient: 'linear-gradient(140deg, #ede6da 0%, #e8d5cc 100%)' },
  { id: 6, category: 'ACADEMY', aspect: 'aspect-[3/4]', gradient: 'linear-gradient(155deg, #e8d5cc 0%, #d4b896 100%)' },
  { id: 7, category: 'TRANSFORMATIONS', aspect: 'aspect-square', gradient: 'linear-gradient(135deg, #f0ebe3 0%, #ede6da 100%)' },
  { id: 8, category: 'MAKEUP', aspect: 'aspect-[3/4]', gradient: 'linear-gradient(165deg, #c4b8a6 0%, #e8d5cc 100%)' },
  { id: 9, category: 'HAIR', aspect: 'aspect-square', gradient: 'linear-gradient(150deg, #ede6da 0%, #d4b896 100%)' },
  { id: 10, category: 'BRIDAL', aspect: 'aspect-square', gradient: 'linear-gradient(140deg, #e8d5cc 0%, #ede6da 100%)' },
  { id: 11, category: 'TRANSFORMATIONS', aspect: 'aspect-[3/4]', gradient: 'linear-gradient(158deg, #d4b896 0%, #e8d5cc 100%)' },
  { id: 12, category: 'NAILS', aspect: 'aspect-square', gradient: 'linear-gradient(145deg, #f0ebe3 0%, #e8d5cc 100%)' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isLightboxVisible, setIsLightboxVisible] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const filteredItems =
    activeCategory === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsLightboxVisible(true))
    })
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxVisible(false)
    setTimeout(() => setLightboxIndex(null), 300)
  }, [])

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return
      const next = lightboxIndex + dir
      if (next >= 0 && next < filteredItems.length) {
        setLightboxIndex(next)
      }
    },
    [lightboxIndex, filteredItems.length]
  )

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, closeLightbox, navigate])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === lightboxRef.current) closeLightbox()
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 bg-[#faf8f5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#b8956a] mb-5">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#1a1612]">
            Our work{' '}
            <span className="text-gradient-gold">speaks for itself</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative font-sans text-[10px] tracking-[0.2em] uppercase font-medium pb-2 transition-colors duration-300"
              style={{
                color: activeCategory === cat ? '#1a1612' : '#9a8e80',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) e.currentTarget.style.color = '#1a1612'
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) e.currentTarget.style.color = '#9a8e80'
              }}
            >
              {cat}
              <span
                className="absolute bottom-0 left-0 h-[2px] bg-[#b8956a] transition-all duration-300"
                style={{ width: activeCategory === cat ? '100%' : '0%' }}
              />
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => openLightbox(i)}
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`,
                transitionDelay: `${0.15 + i * 0.06}s`,
              }}
            >
              <div
                className={`${item.aspect} relative overflow-hidden cursor-pointer`}
                style={{
                  background: item.gradient,
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'rgba(26,22,18,0.4)',
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  <span className="text-[#faf8f5] text-sm tracking-wider uppercase">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          ref={lightboxRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(250,248,245,0.97)',
            opacity: isLightboxVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 text-[#1a1612] text-2xl cursor-pointer hover:opacity-60 transition-opacity duration-200"
          >
            ✕
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 text-[#1a1612]/40 hover:text-[#1a1612] transition-colors duration-200"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next */}
          {lightboxIndex < filteredItems.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 text-[#1a1612]/40 hover:text-[#1a1612] transition-colors duration-200"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[80vh]"
            style={{
              transform: isLightboxVisible ? 'scale(1)' : 'scale(0.95)',
              opacity: isLightboxVisible ? 1 : 0,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
            }}
          >
            <div
              className="aspect-[3/4] w-[70vw] md:w-[50vw] lg:w-[40vw]"
              style={{ background: filteredItems[lightboxIndex].gradient }}
            />
            <div className="mt-5 text-center">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9a8e80]">
                {filteredItems[lightboxIndex].category}
              </span>
              <p className="font-sans text-[#9a8e80] text-xs mt-1">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

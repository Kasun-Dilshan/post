import { useEffect, useMemo, useRef, useState } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
}

export function HomeHeroCarousel({ slides = [] }) {
  const safeSlides = useMemo(() => (Array.isArray(slides) ? slides.filter(Boolean) : []), [slides])
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(0)

  const count = safeSlides.length

  useEffect(() => {
    if (count <= 1) return
    if (paused) return
    if (prefersReducedMotion()) return
    intervalRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % count)
    }, 5200)
    return () => window.clearInterval(intervalRef.current)
  }, [count, paused])

  useEffect(() => {
    if (idx >= count) setIdx(0)
  }, [idx, count])

  useEffect(() => {
    if (count <= 1) return
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + count) % count)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % count)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count])

  if (count === 0) return null

  return (
    <div
      className="home-hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-label="Homepage carousel"
    >
      <div className="home-hero-bg" aria-hidden="true">
        {safeSlides.map((s, i) => (
          <div
            key={s.id ?? `${s.bgSrc}-${i}`}
            className={`home-hero-bg-slide ${i === idx ? 'is-active' : ''}`}
            style={{
              '--bg-url': `url(${s.bgSrc})`,
            }}
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="home-hero-nav home-hero-nav-prev"
            onClick={() => setIdx((i) => (i - 1 + count) % count)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="home-hero-nav home-hero-nav-next"
            onClick={() => setIdx((i) => (i + 1) % count)}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="home-hero-dots" role="tablist" aria-label="Carousel slides">
            {safeSlides.map((s, i) => (
              <button
                key={s.id ?? `${s.bgSrc}-${i}-dot`}
                type="button"
                className={`home-hero-dot ${i === idx ? 'is-active' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === idx}
                role="tab"
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}


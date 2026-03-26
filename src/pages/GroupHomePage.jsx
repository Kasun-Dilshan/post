import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import '../styles/group.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

function useThreeBackground() {
  const animationRef = useRef(0)

  useEffect(() => {
    const canvas = document.getElementById('bg-canvas')
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 40

    const starCount = 2800
    const starGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    const palette = [
      new THREE.Color('#16a34a'),
      new THREE.Color('#22c55e'),
      new THREE.Color('#10b981'),
      new THREE.Color('#059669'),
      new THREE.Color('#047857'),
    ]
    for (let i = 0; i < starCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 300
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3 + 0] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const starMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    const ambientLight = new THREE.AmbientLight(0xaaaaaa, 1.5)
    scene.add(ambientLight)
    const light1 = new THREE.PointLight(0x16a34a, 3, 60)
    light1.position.set(10, 10, 20)
    scene.add(light1)
    const light2 = new THREE.PointLight(0x10b981, 2, 60)
    light2.position.set(-10, -10, 20)
    scene.add(light2)

    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let scrollY = 0
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const clock = new THREE.Clock()
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      stars.rotation.y = t * 0.012
      stars.rotation.x = t * 0.005
      camera.position.y = -scrollY * 0.012
      camera.position.x = mouse.x * 1.5
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationRef.current)
      renderer.dispose()
      starGeo.dispose()
      starMat.dispose()
    }
  }, [])
}

function useGroupInteractions() {
  useEffect(() => {
    const navbar = document.getElementById('navbar')
    const hamburger = document.getElementById('hamburger')
    const links = document.getElementById('nav-links')

    const onScroll = () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const onHamburger = () => links?.classList.toggle('open')
    hamburger?.addEventListener('click', onHamburger)

    const closeOnClick = []
    links?.querySelectorAll('a').forEach((a) => {
      const handler = () => links.classList.remove('open')
      closeOnClick.push([a, handler])
      a.addEventListener('click', handler)
    })

    // Reveals
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-up').forEach((el) => {
        const delay = parseFloat(el.style.getPropertyValue('--delay')) || 0
        gsap.fromTo(
          el,
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      gsap.utils.toArray('.reveal-left').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -55 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      gsap.utils.toArray('.reveal-right').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 55 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      // Parallax
      gsap.to('#about', {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from('#companies .section-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#companies', start: 'top 80%' },
      })
    })

    // Counters
    const counters = document.querySelectorAll('.stat-number')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.__counting) {
            entry.target.__counting = true
            const el = entry.target
            const target = parseInt(el.dataset.target, 10)
            const duration = 2000
            const step = target / (duration / 16)
            let current = 0
            const tick = () => {
              current = Math.min(current + step, target)
              el.textContent = Math.floor(current)
              if (current < target) requestAnimationFrame(tick)
              else el.textContent = target
            }
            tick()
          }
        })
      },
      { threshold: 0.3 },
    )
    counters.forEach((c) => observer.observe(c))

    // Carousel
    const inner = document.getElementById('companies-inner')
    const prevBtn = document.getElementById('cnav-prev')
    const nextBtn = document.getElementById('cnav-next')
    const dots = document.querySelectorAll('.cnav-dot')

    let current = 0
    let autoTimer = 0

    const cards = inner?.querySelectorAll('.company-card') ?? []
    const totalCards = cards.length

    const getCardWidth = () => {
      if (cards[0]) {
        const style = getComputedStyle(inner)
        const gap = parseFloat(style.gap) || 24
        return cards[0].offsetWidth + gap
      }
      return 384
    }

    const goTo = (idx) => {
      if (!inner || totalCards === 0) return
      current = Math.max(0, Math.min(idx, totalCards - 1))
      const offset = current * getCardWidth()
      inner.style.transform = `translateX(-${offset}px)`
      dots.forEach((d, i) => d.classList.toggle('active', i === current))
    }

    const onPrev = () => goTo(current - 1)
    const onNext = () => goTo(current + 1)
    prevBtn?.addEventListener('click', onPrev)
    nextBtn?.addEventListener('click', onNext)
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)))

    // Always keep the first (Plantation) card visible when the user scrolls the page.
    // This prevents the carousel from "remembering" a later card when revisiting the section.
    goTo(0)
    const companiesSection = document.getElementById('companies')
    const onCompaniesScrollSnap = () => {
      if (!companiesSection) return
      const rect = companiesSection.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2
      if (inView) goTo(0)
    }
    window.addEventListener('scroll', onCompaniesScrollSnap, { passive: true })
    onCompaniesScrollSnap()

    // Autoplay disabled to keep Plantation card first.

    let startX = 0
    const onTouchStart = (e) => {
      startX = e.touches[0].clientX
    }
    const onTouchEnd = (e) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
    }
    inner?.addEventListener('touchstart', onTouchStart, { passive: true })
    inner?.addEventListener('touchend', onTouchEnd)

    const tiltHandlers = []
    cards.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const rx = ((e.clientY - cy) / (rect.height / 2)) * 6
        const ry = ((e.clientX - cx) / (rect.width / 2)) * -6
        card.style.transform = `translateY(-10px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
      }
      const onLeaveCard = () => {
        card.style.transform = ''
      }
      tiltHandlers.push([card, onMove, onLeaveCard])
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeaveCard)
    })

    // Active nav link
    const sections = document.querySelectorAll('section[id]')
    const navAs = document.querySelectorAll('.nav-links a')
    const onActiveScroll = () => {
      let active = ''
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 140) active = sec.id
      })
      navAs.forEach((a) => {
        a.style.color = ''
        if (a.getAttribute('href') === `#${active}`) a.style.color = 'var(--accent-1)'
      })
    }
    window.addEventListener('scroll', onActiveScroll, { passive: true })
    onActiveScroll()

    // World map canvas animation (from original main.js)
    const mapCanvas = document.getElementById('map-canvas')
    const mapCtx = mapCanvas?.getContext?.('2d')
    let mapAnimFrame = 0
    let mapTick = 0
    if (mapCanvas && mapCtx) {
      const W = mapCanvas.width
      const H = mapCanvas.height
      const COLS = 70
      const ROWS = 40
      const dw = W / COLS
      const dh = H / ROWS

      const continents = [
        { c: [6, 18], r: [4, 18], color: '#10b981' }, // North America
        { c: [10, 20], r: [18, 36], color: '#10b981' }, // South America
        { c: [27, 40], r: [4, 16], color: '#22c55e' }, // Europe
        { c: [28, 42], r: [16, 34], color: '#10b981' }, // Africa
        { c: [40, 68], r: [3, 22], color: '#059669' }, // Asia
        { c: [54, 65], r: [24, 34], color: '#059669' }, // Australia
        { c: [14, 22], r: [1, 7], color: '#10b981' }, // Greenland
        { c: [39, 48], r: [14, 22], color: '#10b981' }, // Middle East
        { c: [46, 54], r: [16, 26], color: '#059669' }, // India
        { c: [60, 70], r: [14, 24], color: '#059669' }, // Japan / SE Asia
      ]

      const colorMap = {}
      continents.forEach((cont) => {
        for (let c = cont.c[0]; c < cont.c[1]; c++) {
          for (let r = cont.r[0]; r < cont.r[1]; r++) {
            if (Math.random() > 0.18) colorMap[`${c},${r}`] = cont.color
          }
        }
      })

      const drawMap = () => {
        mapAnimFrame = requestAnimationFrame(drawMap)
        mapCtx.clearRect(0, 0, W, H)
        mapTick++

        for (let c = 0; c < COLS; c++) {
          for (let r = 0; r < ROWS; r++) {
            const key = `${c},${r}`
            const baseColor = colorMap[key]
            if (!baseColor) continue

            const x = c * dw + dw / 2
            const y = r * dh + dh / 2
            const isPulsing = (c + r + mapTick) % 120 < 10
            const radius = isPulsing ? dw * 0.45 : dw * 0.28
            const alpha = isPulsing ? 1 : 0.55

            mapCtx.globalAlpha = alpha
            mapCtx.beginPath()
            mapCtx.arc(x, y, radius, 0, Math.PI * 2)
            mapCtx.fillStyle = baseColor
            mapCtx.fill()

            if (isPulsing) {
              mapCtx.globalAlpha = 0.15
              mapCtx.beginPath()
              mapCtx.arc(x, y, dw * 1.1, 0, Math.PI * 2)
              mapCtx.fillStyle = baseColor
              mapCtx.fill()
            }
          }
        }
        mapCtx.globalAlpha = 1

        const hubs = [
          { c: 10, r: 10 },
          { c: 33, r: 10 },
          { c: 50, r: 10 },
          { c: 40, r: 20 },
          { c: 58, r: 29 },
        ]
        mapCtx.strokeStyle = 'rgba(22,163,74,0.3)'
        mapCtx.lineWidth = 0.8
        for (let i = 0; i < hubs.length - 1; i++) {
          const a = hubs[i]
          const b = hubs[i + 1]
          mapCtx.beginPath()
          mapCtx.moveTo(a.c * dw + dw / 2, a.r * dh + dh / 2)
          const mx = ((a.c + b.c) / 2) * dw
          const my = Math.min(a.r, b.r) * dh - dh * 3
          mapCtx.quadraticCurveTo(mx, my, b.c * dw + dw / 2, b.r * dh + dh / 2)
          mapCtx.stroke()
        }
      }
      drawMap()
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onActiveScroll)
      hamburger?.removeEventListener('click', onHamburger)
      closeOnClick.forEach(([a, handler]) => a.removeEventListener('click', handler))
      observer.disconnect()
      ctx.revert()
      prevBtn?.removeEventListener('click', onPrev)
      nextBtn?.removeEventListener('click', onNext)
      if (autoTimer) clearInterval(autoTimer)
      window.removeEventListener('scroll', onCompaniesScrollSnap)
      inner?.removeEventListener('touchstart', onTouchStart)
      inner?.removeEventListener('touchend', onTouchEnd)
      tiltHandlers.forEach(([card, onMove, onLeaveCard]) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeaveCard)
      })
      if (mapAnimFrame) cancelAnimationFrame(mapAnimFrame)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

export function GroupHomePage() {
  useThreeBackground()
  useGroupInteractions()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onOpenPlantation = useCallback(() => {
    setLoading(true)
    setTimeout(() => navigate('/plantation'), 700)
  }, [navigate])

  const companies = useMemo(
    () => [
      {
        idx: 0,
        glow: '#16a34a',
        img: '/site-assets/plantation.png',
        alt: 'Serendib Green Plantation',
        tag: 'Agriculture',
        title: 'Serendib Green Plantation',
        desc: 'Sustainable cultivation and export Vanilla.',
        stats: ['Est. 1998', 'Organic Certified'],
        onClick: onOpenPlantation,
      },
      {
        idx: 1,
        glow: '#10b981',
        img: '/site-assets/travel (2).png',
        alt: 'Serendib Travel and Tours',
        tag: 'Tourism',
        title: 'Serendib Travel & Tours',
        desc: 'Curated luxury travel experiences.',
        stats: ['Global Network', 'Award Winning'],
      },
      {
        idx: 2,
        glow: '#22c55e',
        img: '/site-assets/auto.png',
        alt: 'Serendib Auto Trading',
        tag: 'Automotives',
        title: 'Serendib Auto Trading',
        desc: 'Importers and specialized distributors of high-quality vehicles and genuine automotive parts.',
        stats: ['Premium Imports', 'Island-wide'],
      },
      {
        idx: 3,
        glow: '#059669',
        img: '/site-assets/Investment.png',
        alt: 'Serendib Investment and Developers',
        tag: 'Real Estate & Finance',
        title: 'Serendib Investment & Developers',
        desc: 'Strategic property investments and premium real estate development shaping modern landscapes.',
        stats: ['Prime Locations', 'High Yield'],
      },
      {
        idx: 4,
        glow: '#047857',
        img: '/site-assets/builders.png',
        alt: 'Serendib Green Builders',
        tag: 'Construction',
        title: 'Serendib Green Builders',
        desc: 'Pioneer constructors focusing on eco-friendly building practices and sustainable infrastructure.',
        stats: ['Eco-Friendly', 'ISO Certified'],
      },
      {
        idx: 5,
        glow: '#4ade80',
        img: '/site-assets/Investment.png',
        alt: 'Serendib Micro Finance',
        tag: 'Financial Services',
        title: 'Serendib Micro Finance',
        desc: 'Empowering local communities and small businesses with accessible, ethical financial solutions.',
        stats: ['Community Trust', 'Low Interest'],
      },
      {
        idx: 6,
        glow: '#84cc16',
        img: '/site-assets/spices.png',
        alt: 'Diwya Spices',
        tag: 'Export & FMCG',
        title: 'Diwya Spices',
        desc: 'Premium grade authentic Ceylon spices sourced directly from local organic farming communities.',
        stats: ['Export Quality', 'Fair Trade'],
      },
    ],
    [onOpenPlantation],
  )

  return (
    <>
      <canvas id="bg-canvas" />

      <nav id="navbar">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            <span style={{ fontWeight: 800, letterSpacing: '0.08em', color: 'var(--accent-1)' }}>
              SERENDIB GREEN PLANTATION
            </span>
          </a>
          <ul className="nav-links" id="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#companies">Companies</a>
            </li>
            <li>
              <a href="#presence">Global</a>
            </li>
           
          </ul>
          <button className="hamburger" id="hamburger" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-content">
          <div className="hero-tag reveal-up" />
          <h1 className="hero-title reveal-up">
            Sustainable
            <br />
            <span className="gradient-text">Cultivation</span>
            <br />
            Tomorrow
          </h1>
          <p className="hero-sub reveal-up">
            “To cultivate sustainable growth and innovative solutions by strategically investing in
            high-potential opportunities, fostering long-term success, and delivering exceptional
            value to our stakeholders.”
          </p>
          <div className="hero-actions reveal-up">
            <a href="#companies" className="btn-primary">
              Explore Our Companies
            </a>
            <a href="#about" className="btn-ghost">
              Learn More ↓
            </a>
          </div>
        </div>
        <div className="hero-logo-wrapper">
          <img
            src="/site-assets/serendib_main_logo.png"
            alt="Serendib Group Logo"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <div className="scroll-hint">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section id="about">
        <div className="section-inner">
          <div className="about-text">
            <div className="section-tag reveal-left">WHO WE ARE</div>
            <h2 className="section-title reveal-left">
              A Legacy of
              <br />
              <span className="gradient-text">Innovation</span>
            </h2>
            <p className="reveal-left">
              Serendib Green Plantation (Pvt) Ltd, a premier entity within the prestigious Serendib
              Group, is at the forefront of sustainable cultivation and green plantation practices.
              With a deep-rooted commitment to environmental stewardship and innovative agricultural
              techniques, we specialize in transforming land into flourishing, eco-friendly
              plantations. Our focus on sustainability not only enhances the health of our planet
              but also delivers superior quality products and services to our clients.
            </p>
            <a
              href="#companies"
              className="btn-primary reveal-left"
              style={{ marginTop: '2rem', display: 'inline-block' }}
            >
              Our Portfolio →
            </a>
          </div>
          <div className="stats-grid reveal-right">
            <div className="stat-card">
              <div className="stat-number" data-target="300">
                0
              </div>
              <div className="stat-plus">+</div>
              <div className="stat-label">Employees</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" data-target="6">
                0
              </div>
              <div className="stat-plus" />
              <div className="stat-label">Subsidiaries</div>
            </div>
          </div>
        </div>
      </section>

      <section id="companies">
        <div className="section-header">
          <div className="section-tag">OUR PORTFOLIO</div>
          <h2 className="section-title">
            Seven Companies.
            <br />
            <span className="gradient-text">One Vision.</span>
          </h2>
          <p className="section-desc">
            Each subsidiary operates with full autonomy, backed by Serendib Group of Companies's
            shared infrastructure, capital, and global network.
          </p>
        </div>

        <div className="companies-track" id="companies-track">
          <div className="companies-inner" id="companies-inner">
            {companies.map((c) => (
              <article
                key={c.idx}
                className="company-card"
                data-index={c.idx}
                tabIndex={0}
                role={c.onClick ? 'link' : undefined}
                aria-label={c.onClick ? `Open ${c.title} details` : undefined}
                onClick={c.onClick}
                onKeyDown={(e) => {
                  if (!c.onClick) return
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    c.onClick()
                  }
                }}
              >
                <div className="card-glow" style={{ '--glow': c.glow }} />
                <img className="card-photo" src={c.img} alt={c.alt} loading="lazy" decoding="async" />
                <div className="card-tag">{c.tag}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="card-stats">
                  {c.stats.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="card-arrow">→</div>
              </article>
            ))}
          </div>
        </div>

        <div className="companies-nav">
          <button className="cnav-btn" id="cnav-prev" aria-label="Previous">
            ←
          </button>
          <div className="cnav-dots" id="cnav-dots">
            {companies.map((_, i) => (
              <span key={i} className={`cnav-dot ${i === 0 ? 'active' : ''}`} />
            ))}
          </div>
          <button className="cnav-btn" id="cnav-next" aria-label="Next">
            →
          </button>
        </div>
      </section>

      <section id="team">
        <div className="section-header">
          <div className="section-tag">OUR LEADERSHIP</div>
          <h2 className="section-title">
            The Faces Behind Our
            <br />
            <span className="gradient-text">Success</span>
          </h2>
          <p className="section-desc">
            Meet our amazing team driving innovation and growth across the group.
          </p>
        </div>

        <div className="team-inner">
          <article className="team-card reveal-up">
            <div className="team-avatar photo">
              <img
                src="/site-assets/MERVYN.jpg"
                alt="Hons. Dr. Mervyn Rexter"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="team-meta">
              <h3>Hons.Dr.MERVYN REXTER</h3>
              <div className="team-role">Founder &amp; Group Chairman</div>
              <p>
                Mervyn Rexter, the Group Chairman of Serendib Group, has over 30 years of experience
                in finance and is known for his visionary approach, collaboration, innovation, and
                sustainability. Under his leadership, the company has expanded its operations,
                establishing a strong presence in sustainable cultivation, travel, agriculture, and
                beverage production. Rexter’s skillful management and commitment to excellence
                inspire the team and stakeholders, fostering a culture of integrity and shared
                success. With a deep passion for sustainable practices and community development,
                Rexter remains focused on creating lasting value for Serendib Group and its
                partners.
              </p>
              <h4>Core Expertise</h4>
              <div className="team-tags">
                <span>Finance</span>
                <span>Leadership</span>
                <span>Sustainability</span>
                <span>Innovation</span>
              </div>
              <h4>Notable Achievements</h4>
              <div className="team-badges">
                <span>30+ Years Experience</span>
                <span>Expanded Group Operations</span>
                <span>Culture of Integrity</span>
                <span>Community Development Focus</span>
              </div>
             
            </div>
          </article>

          <article className="team-card reveal-up">
            <div className="team-avatar photo">
              <img
                src="/site-assets/Hashini.jpg"
                alt="Hashini Dilshani"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="team-meta">
              <h3>HASHINI DILSHANI</h3>
              <div className="team-role">CEO - Director</div>
              <p>
                Hashini Dilshani, CEO of Serendib Green Plantation (Pvt) Ltd., is a seasoned
                entrepreneur with extensive experience in tourism, hospitality management, airline
                reservation, and marketing management. She has also founded Serendib Travels &amp;
                Tours and Serendib Beverages, showcasing her innovative approach to business. With a
                positive mindset and a passion for developing new business models, Hashini inspires
                her teams and clients. She is a visionary in the tourism, hospitality, and
                plantation industries, reshaping the landscape and making a significant impact in
                the business community. Her dedication to innovation and growth continues to make a
                significant impact.
              </p>
              <h4>Core Expertise</h4>
              <div className="team-tags">
                <span>Tourism</span>
                <span>Hospitality Management</span>
                <span>Marketing Management</span>
                <span>Airline Reservation</span>
              </div>
              <h4>Notable Achievements</h4>
              <div className="team-badges">
                <span>Founder — Serendib Travels &amp; Tours</span>
                <span>Founder — Serendib Beverages</span>
                <span>New Business Models</span>
                <span>Innovation &amp; Growth</span>
              </div>
            
            </div>
          </article>

          <article className="team-card reveal-up">
            <div className="team-avatar photo">
              <img
                src="/site-assets/Shameen.jpg"
                alt="Shameen Chandrasekara"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="team-meta">
              <h3>SHAMEEN CHANDRASEKARA</h3>
              <div className="team-role">Director - Sales &amp; Marketing</div>
              <p>
                Shameen Chandrasekare, a 14-years sales and marketing director, has a proven track
                record of driving growth and success in both national and international companies.
                He has navigated complex market landscapes and led initiatives that have resulted
                in substantial business growth. At Serendib Green Plantation (Pvt) Ltd, Shameen is
                committed to fostering a dynamic environment that enhances staff well-being and
                client satisfaction. His leadership philosophy revolves around leveraging team
                talents and encouraging collaboration to achieve exceptional results. He sees this
                opportunity as a chance to positively impact society, contribute to the economy,
                and champion environmentally friendly practices.
              </p>
              <h4>Core Expertise</h4>
              <div className="team-tags">
                <span>Sales Leadership</span>
                <span>Marketing Strategy</span>
                <span>Growth Initiatives</span>
                <span>Market Analysis</span>
              </div>
              <h4>Notable Achievements</h4>
              <div className="team-badges">
                <span>14+ Years Experience</span>
                <span>National &amp; International Growth</span>
                <span>Staff Well-being Focus</span>
                <span>Eco-Friendly Practices</span>
              </div>
              
            </div>
          </article>

          <article className="team-card reveal-up">
            <div className="team-avatar photo">
              <img
                src="/site-assets/thilan.jpg"
                alt="Thilan Kuruppuarachchi"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="team-meta">
              <h3>THILAN KURUPPUARACHCHI</h3>
              <div className="team-role">Director - Travel &amp; Tours</div>
              <p>
                Thilan Kuruppuarachchi is a visionary director at Serendib Group, where he primarily
                oversees the operations of Serendib Travels. With over 15 years of experience in the
                aviation and travel industries, Thilan has developed a deep understanding of the
                global travel landscape. A proud graduate of St. Joseph’s College, he is
                IATA-qualified, further strengthening his expertise in the field. Throughout his
                career, Thilan has demonstrated exceptional proficiency in sales and marketing,
                which has played a key role in the growth and success of Serendib Travels.
              </p>
              <h4>Core Expertise</h4>
              <div className="team-tags">
                <span>Aviation &amp; Travel</span>
                <span>Operations</span>
                <span>Sales &amp; Marketing</span>
                <span>Market Trends</span>
              </div>
              <h4>Notable Achievements</h4>
              <div className="team-badges">
                <span>15+ Years Experience</span>
                <span>IATA Qualified</span>
                <span>Led Travel Growth</span>
                <span>Competitive Sector Leadership</span>
              </div>
             
            </div>
          </article>

          
        </div>

        <div className="team-impact reveal-up">
          <h3>Collective Leadership Impact</h3>
          <p>
            Our executive team combines diverse expertise with a shared vision to drive innovation,
            growth, and sustainable value creation across all group companies.
          </p>
          <div className="team-impact-stats">
            <div>
              <span>10+</span>
              <small>Total Years Experience</small>
            </div>
            <div>
              <span>100%</span>
              <small>Client Satisfaction</small>
            </div>
            <div>
              <span>Global</span>
              <small>Industry Reach</small>
            </div>
            <div>
              <span>6</span>
              <small>Companies</small>
            </div>
          </div>
        </div>
      </section>

     

      <footer id="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo">
              <img
                src="/site-assets/serendib_main_logo.png"
                alt="Serendib Group"
                style={{ height: 44, width: 'auto', objectFit: 'contain' }}
              />
            </a>
            <p>Building tomorrow's world, today.</p>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Hotline</span>
                <a className="footer-contact-value" href="tel:0112863703">
                  0112 863 703
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">E-Mail</span>
                <a className="footer-contact-value" href="mailto:info@serendibgroups.com">
                  info@serendibgroups.com
                </a>
              </div>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="Twitter">
                𝕏
              </a>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Companies</h5>
              <ul>
                <li>
                  <a href="#">Serendib Green Plantation</a>
                </li>
                <li>
                  <a href="#">Serendib Travel & Tours</a>
                </li>
                <li>
                  <a href="#">Serendib Auto Trading</a>
                </li>
                <li>
                  <a href="#">Serendib Investment & Dev</a>
                </li>
                <li>
                  <a href="#">Serendib Green Builders</a>
                </li>
                <li>
                  <a href="#">Serendib Micro Finance</a>
                </li>
                <li>
                  <a href="#">Diwya Spices</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#presence">Global Presence</a>
                </li>
                <li>
                  <a href="#">Investor Relations</a>
                </li>
                <li>
                  <a href="#">Newsroom</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Join Us</h5>
              <ul>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Serendib Academy</a>
                </li>
                <li>
                  <a href="#">Internships</a>
                </li>
                <li>
                  <a href="#">Partnerships</a>
                </li>
              </ul>
            </div>
            <div className="footer-col footer-map-col">
              <h5>Our Locations</h5>
              <p>Head Office and company network across Sri Lanka.</p>
              <div className="footer-map">
                <iframe
                  title="Serendib Group Locations Map"
                  src="https://www.google.com/maps/d/embed?mid=1e77U-8IfdaBO_1mMcOh22Fcl-SGhTTQ&ehbc=2E312F"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Serendib Group of Companies. All rights reserved.</span>
          <span>
            <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Cookies</a>
          </span>
        </div>
      </footer>

      <div className={`page-loader ${loading ? 'show' : ''}`} id="page-loader" aria-hidden={!loading}>
        <div className="loader-center">
          <div className="loader-ring" />
          <p>Welcome To Serendib Green Plantation (Pvt) Ltd...</p>
        </div>
      </div>
    </>
  )
}


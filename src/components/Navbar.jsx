import { useState, useEffect } from 'react'
import { FiGithub } from 'react-icons/fi'

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Update active section on scroll
  useEffect(() => {
    const ids = ['home','about','stats','repos','languages','contact']
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: 0.4 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const links = [
    { id: 'home',      label: 'Home' },
    { id: 'about',     label: 'About' },
    { id: 'stats',     label: 'Stats' },
    { id: 'repos',     label: 'Repos' },
    { id: 'languages', label: 'Stack' },
    { id: 'contact',   label: 'Contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      padding: scrolled ? '0.6rem 2rem' : '1rem 2rem',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        ...(scrolled ? {
          background: 'rgba(4,6,15,0.7)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          borderRadius: '16px',
          padding: '0.55rem 1.25rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        } : { padding: '0.4rem 0' }),
      }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: 34, height: 34, borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--c1), var(--c2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', color: '#04060f', fontWeight: 700, fontSize: '0.78rem',
            boxShadow: '0 4px 16px rgba(56,189,248,0.35)',
          }}>
            {(USERNAME || 'SP').slice(0,2).toUpperCase()}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>
            ~/{USERNAME}
          </span>
        </a>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {links.map(link => (
            <a key={link.id} href={`#${link.id}`}
              onClick={() => setActive(link.id)}
              style={{
                textDecoration: 'none',
                padding: '0.38rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.8rem', fontWeight: 500,
                letterSpacing: '0.01em',
                color: active === link.id ? 'var(--c1)' : 'var(--muted2)',
                background: active === link.id
                  ? 'rgba(56,189,248,0.1)'
                  : 'transparent',
                border: active === link.id
                  ? '1px solid rgba(56,189,248,0.2)'
                  : '1px solid transparent',
                backdropFilter: active === link.id ? 'blur(8px)' : 'none',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                if (active !== link.id) {
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={e => {
                if (active !== link.id) {
                  e.currentTarget.style.color = 'var(--muted2)'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                }
              }}
            >
              {link.label}
            </a>
          ))}

          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer"
            style={{
              marginLeft: '0.5rem',
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              textDecoration: 'none',
              padding: '0.38rem 0.9rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(56,189,248,0.14), rgba(167,139,250,0.14))',
              border: '1px solid rgba(56,189,248,0.22)',
              backdropFilter: 'blur(12px)',
              color: 'var(--c1)', fontSize: '0.78rem', fontWeight: 600,
              transition: 'all 0.22s ease',
              boxShadow: '0 2px 12px rgba(56,189,248,0.12)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg,rgba(56,189,248,0.22),rgba(167,139,250,0.22))'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(56,189,248,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg,rgba(56,189,248,0.14),rgba(167,139,250,0.14))'
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(56,189,248,0.12)'
            }}
          >
            <FiGithub size={13} /> GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}

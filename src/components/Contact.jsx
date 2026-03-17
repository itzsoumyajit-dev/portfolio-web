import { useState, useRef, useEffect } from 'react'
import { FiGithub, FiMail, FiSend, FiExternalLink, FiUser, FiMessageSquare } from 'react-icons/fi'
import { SectionTitle } from './GitHubStats'

/* X (Twitter) SVG icon */
const XIcon = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

/* LinkedIn SVG icon */
const LinkedInIcon = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

/* Instagram SVG icon */
const InstagramIcon = ({ size=18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const SOCIALS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@ItzSoumyajit-dev',
    href: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`,
    icon: FiGithub,
    color: '#e2e8f0',
    glow: 'rgba(226,232,240,0.15)',
    desc: 'Check out my code & projects',
    gradient: 'linear-gradient(135deg, rgba(226,232,240,0.1), rgba(100,116,139,0.05))',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    handle: '@ItzSoumyajit',
    href: 'https://x.com/ItzSoumyajit',
    IconComponent: XIcon,
    color: '#e2e8f0',
    glow: 'rgba(226,232,240,0.15)',
    desc: 'Follow me on X for updates',
    gradient: 'linear-gradient(135deg, rgba(226,232,240,0.1), rgba(15,20,25,0.1))',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Soumyajit Saha',
    href: 'https://www.linkedin.com/in/itz-soumyajit-soumyajit-saha-413a79337',
    IconComponent: LinkedInIcon,
    color: '#0a66c2',
    glow: 'rgba(10,102,194,0.25)',
    desc: "Let's connect professionally",
    gradient: 'linear-gradient(135deg, rgba(10,102,194,0.15), rgba(10,102,194,0.05))',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@soumyajit.saha07',
    href: 'https://www.instagram.com/soumyajit.saha07/',
    IconComponent: InstagramIcon,
    color: '#e1306c',
    glow: 'rgba(225,48,108,0.25)',
    desc: 'Follow my life & moments',
    gradient: 'linear-gradient(135deg, rgba(225,48,108,0.12), rgba(255,149,0,0.08))',
  },
]

function useInView(t=0.12){
  const ref=useRef(null); const [v,setV]=useState(false)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t})
    if(ref.current)obs.observe(ref.current)
    return()=>obs.disconnect()
  },[])
  return [ref,v]
}

function SocialCard({ id, label, handle, href, icon: Icon, IconComponent, color, glow, desc, gradient, delay, inView }) {
  const [hov, setHov] = useState(false)
  const Ic = IconComponent || Icon

  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="lg"
      style={{
        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1.1rem',
        borderRadius: '18px', padding: '1.35rem 1.4rem',
        border: hov ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.11)',
        background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.038)',
        boxShadow: hov ? `0 20px 60px ${glow}, var(--lg-inset-top)` : 'var(--lg-shadow)',
        transform: hov ? 'translateY(-5px) scale(1.01)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${delay}s` : '0s',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Gradient bg sweep on hover */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        background: gradient,
        opacity: hov ? 1 : 0, transition: 'opacity 0.35s',
        pointerEvents: 'none',
      }}/>

      {/* Icon bubble */}
      <div style={{
        width: 48, height: 48, borderRadius: '14px', flexShrink: 0,
        background: hov ? `${glow}` : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hov ? color + '40' : 'rgba(255,255,255,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? color : 'var(--muted2)',
        transition: 'all 0.3s', position: 'relative',
        boxShadow: hov ? `0 8px 24px ${glow}` : 'none',
      }}>
        <Ic size={20}/>
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
          <span style={{ fontWeight: 800, fontSize: '0.92rem',
            color: hov ? '#fff' : 'var(--text)', transition: 'color 0.2s' }}>
            {label}
          </span>
          <FiExternalLink size={13} style={{
            color: hov ? color : 'var(--muted)', flexShrink: 0, marginLeft: '0.5rem',
            transform: hov ? 'translate(2px,-2px)' : 'none', transition: 'all 0.2s',
          }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.73rem',
          color: hov ? color : 'var(--muted)', marginBottom: '0.25rem', transition: 'color 0.2s' }}>
          {handle}
        </p>
        <p style={{ fontSize: '0.77rem', color: 'var(--muted)', lineHeight: 1.4 }}>{desc}</p>
      </div>
    </a>
  )
}

export default function Contact({ profile }) {
  const [secRef, secV] = useInView()

  return (
    <section id="contact" style={{ padding: '4rem 2rem 7rem', maxWidth: '1100px', margin: '0 auto' }}>
      <SectionTitle tag="// contact" title="Get In Touch"
        subtitle="Feel free to reach out — I'm always open to new opportunities and conversations." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
        className="two-col-lg">

        {/* Left — big CTA card */}
        <div ref={secRef} className="lg" style={{
          borderRadius: '24px', padding: '2.5rem',
          opacity: secV ? 1 : 0,
          transform: secV ? 'none' : 'translateY(30px)',
          transition: 'all 0.75s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative gradient */}
          <div style={{
            position: 'absolute', top: -60, right: -60, width: 220, height: 220,
            background: 'radial-gradient(circle, rgba(56,189,248,0.12), transparent 65%)',
            pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', bottom: -40, left: -40, width: 180, height: 180,
            background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent 65%)',
            pointerEvents: 'none',
          }}/>

          {/* Avatar + status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <img src={profile.avatar_url} alt="avatar" style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '2px solid rgba(56,189,248,0.3)',
                boxShadow: '0 8px 24px rgba(56,189,248,0.2)',
              }}/>
              {/* Online dot */}
              <div style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 14, height: 14, borderRadius: '50%',
                background: '#34d399', border: '2px solid var(--bg)',
                animation: 'pulse-glow 2.5s ease infinite',
              }}/>
            </div>
            <div>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                {profile.name || profile.login}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399' }}/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  color: '#34d399', letterSpacing: '0.06em' }}>AVAILABLE FOR WORK</span>
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 900, color: '#fff',
            lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1rem', position: 'relative' }}>
            Let's Build
            <br/>
            <span className="grad-text">Something Great</span>
          </h2>

          <p style={{ color: 'var(--muted2)', fontSize: '0.9rem', lineHeight: 1.8,
            marginBottom: '2rem', position: 'relative' }}>
            Whether it's a cool project, a freelance opportunity, or just a chat about tech — my inbox is always open.
          </p>

          {/* Email CTA */}
          <a href={`mailto:${profile.email || 'soumyajitsaha@example.com'}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              textDecoration: 'none', padding: '0.8rem 1.75rem',
              background: 'linear-gradient(135deg, var(--c1), var(--c2))',
              color: '#04060f', borderRadius: '14px', fontWeight: 800, fontSize: '0.88rem',
              boxShadow: '0 8px 32px rgba(56,189,248,0.28)',
              transition: 'all 0.28s ease', position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(56,189,248,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 32px rgba(56,189,248,0.28)' }}
          >
            <FiSend size={15}/>
            Say Hello ↗
          </a>
        </div>

        {/* Right — social links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {SOCIALS.map((s, i) => (
            <SocialCard key={s.id} {...s} delay={0.1 + i * 0.1} inView={secV}/>
          ))}

          {/* Fun quote card */}
          <div className="lg" style={{
            borderRadius: '18px', padding: '1.4rem',
            opacity: secV ? 1 : 0,
            transform: secV ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              color: 'var(--muted2)', fontSize: '0.92rem', lineHeight: 1.75,
              marginBottom: '0.75rem' }}>
              "Code is like humor. When you have to explain it, it's bad."
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: 'var(--muted)', letterSpacing: '0.06em' }}>— Cory House</p>
          </div>
        </div>
      </div>
    </section>
  )
}

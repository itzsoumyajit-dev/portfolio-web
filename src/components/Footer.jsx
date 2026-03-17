import { FiGithub, FiHeart } from 'react-icons/fi'

const XIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const LIIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const IGIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME

export default function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), rgba(167,139,250,0.4), transparent)',
      }}/>
      <div style={{
        position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 120,
        background: 'radial-gradient(ellipse, rgba(56,189,248,0.06), transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Left — logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--c1), var(--c2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', color: '#04060f', fontWeight: 700, fontSize: '0.78rem',
              boxShadow: '0 4px 16px rgba(56,189,248,0.3)',
            }}>
              {(USERNAME || 'SP').slice(0,2).toUpperCase()}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontSize: '0.72rem' }}>
              Built with <FiHeart size={10} style={{ color:'#f472b6', display:'inline', verticalAlign:'middle' }}/> by {USERNAME}
            </span>
          </div>

          {/* Right — socials */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {[
              { href: `https://github.com/${USERNAME}`, icon: <FiGithub size={13}/>, label: 'GitHub', hoverColor: '#e2e8f0' },
              { href: 'https://x.com/ItzSoumyajit', icon: <XIcon/>, label: 'X', hoverColor: '#e2e8f0' },
              { href: 'https://www.linkedin.com/in/itz-soumyajit-soumyajit-saha-413a79337', icon: <LIIcon/>, label: 'LinkedIn', hoverColor: '#0a66c2' },
              { href: 'https://www.instagram.com/soumyajit.saha07/', icon: <IGIcon/>, label: 'Instagram', hoverColor: '#e1306c' },
            ].map(({ href, icon, label, hoverColor }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                title={label}
                className="lg-pill"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 34, height: 34, borderRadius: '10px',
                  color: 'var(--muted)', textDecoration: 'none',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.transform='none' }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(90,106,138,0.6)' }}>
            Powered by GitHub API · React + Vite · Data refreshes on every visit
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(90,106,138,0.45)' }}>
            © {new Date().getFullYear()} {USERNAME}
          </p>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { FiMapPin, FiUsers, FiBookOpen, FiArrowDown, FiLink } from 'react-icons/fi'

export default function Hero({ profile }) {
  const [typed, setTyped] = useState('')
  const [vis, setVis]     = useState(false)

  useEffect(() => {
    setTimeout(() => setVis(true), 80)
    let i = 0
    const txt = '> Crafting beautiful things on the web.'
    const iv  = setInterval(() => {
      setTyped(txt.slice(0, ++i))
      if (i >= txt.length) clearInterval(iv)
    }, 55)
    return () => clearInterval(iv)
  }, [])

  if (!profile) return null

  const fade = (delay) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(28px)',
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  })

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '7rem 2rem 5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid */}
      <div className="grid-bg" style={{ position:'absolute', inset:0, pointerEvents:'none' }} />

      {/* Center glow */}
      <div style={{
        position:'absolute', top:'38%', left:'50%', transform:'translate(-50%,-50%)',
        width:560, height:560,
        background:'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 68%)',
        pointerEvents:'none',
      }}/>

      <div style={{ maxWidth:'940px', width:'100%', position:'relative' }}>
        {/* Badge */}
        <div style={{ ...fade(0), display:'inline-flex', alignItems:'center', gap:'0.55rem',
          marginBottom:'2.2rem' }}>
          <div className="lg lg-pill" style={{ borderRadius:'100px', padding:'0.38rem 1.1rem',
            display:'flex', alignItems:'center', gap:'0.55rem' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--c4)',
              animation:'pulse-glow 2.2s ease infinite', flexShrink:0 }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--c4)',
              letterSpacing:'0.1em' }}>OPEN TO WORK</span>
          </div>
        </div>

        {/* Layout */}
        <div style={{ display:'flex', gap:'2.5rem', alignItems:'center',
          flexWrap:'wrap-reverse', marginBottom:'2rem' }}>

          {/* Text */}
          <div style={{ flex:1, minWidth:'260px' }}>
            <p style={{ ...fade(0.08), fontFamily:'var(--font-mono)', color:'var(--muted)',
              fontSize:'0.73rem', letterSpacing:'0.04em', marginBottom:'0.85rem' }}>
              {typed}<span style={{ animation:'blink 1s infinite', color:'var(--c1)', marginLeft:1 }}>|</span>
            </p>

            <h1 style={{ ...fade(0.18), fontSize:'clamp(2.8rem,8.5vw,5.8rem)', fontWeight:900,
              lineHeight:0.95, letterSpacing:'-0.03em', color:'#fff', marginBottom:'0.5rem' }}>
              {(() => {
                const fullName = profile.name || profile.login
                const parts = fullName.trim().split(' ')
                if (parts.length >= 2) {
                  return <>
                    {parts[0]}
                    <br/>
                    <span className="grad-text">{parts.slice(1).join(' ')}</span>
                  </>
                }
                // Single word — show only once as gradient
                return <span className="grad-text">{fullName}</span>
              })()}
            </h1>

            <p style={{ ...fade(0.26), fontFamily:'var(--font-mono)', color:'var(--muted)',
              fontSize:'0.78rem', marginBottom:'1.5rem' }}>
              @{profile.login}
            </p>

            {profile.bio && (
              <p style={{ ...fade(0.33), color:'var(--muted2)', fontSize:'1rem', lineHeight:1.78,
                maxWidth:'480px', marginBottom:'2rem' }}>
                {profile.bio}
              </p>
            )}

            {/* Meta */}
            <div style={{ ...fade(0.40), display:'flex', flexWrap:'wrap', gap:'1rem',
              marginBottom:'2.5rem' }}>
              {[
                profile.location && { icon: FiMapPin, text: profile.location },
                { icon: FiUsers,    text: `${profile.followers} followers` },
                { icon: FiBookOpen, text: `${profile.public_repos} repos` },
                profile.blog && { icon: FiLink, text: 'Website', href: profile.blog },
              ].filter(Boolean).map(({ icon: Icon, text, href }) => (
                href
                  ? <a key={text} href={href} target="_blank" rel="noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:'0.4rem',
                        color:'var(--c1)', fontSize:'0.8rem', fontFamily:'var(--font-mono)',
                        textDecoration:'none' }}>
                      <Icon size={12}/> {text}
                    </a>
                  : <span key={text} style={{ display:'flex', alignItems:'center', gap:'0.4rem',
                      color:'var(--muted)', fontSize:'0.8rem', fontFamily:'var(--font-mono)' }}>
                      <Icon size={12} style={{ color:'var(--c1)' }}/> {text}
                    </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ ...fade(0.48), display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <a href={`https://github.com/${profile.login}`} target="_blank" rel="noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'0.5rem',
                  textDecoration:'none', padding:'0.8rem 1.9rem',
                  background:'linear-gradient(135deg, var(--c1), var(--c2))',
                  color:'#04060f', borderRadius:'14px', fontWeight:800, fontSize:'0.88rem',
                  boxShadow:'0 8px 32px rgba(56,189,248,0.25)',
                  transition:'all 0.28s ease', letterSpacing:'0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(56,189,248,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 32px rgba(56,189,248,0.25)' }}
              >
                View GitHub ↗
              </a>
              <a href="#contact"
                className="lg lg-hover"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'0.5rem',
                  textDecoration:'none', padding:'0.8rem 1.9rem',
                  borderRadius:'14px', fontWeight:600, fontSize:'0.88rem', color:'var(--text)',
                  transition:'all 0.28s ease',
                }}
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div style={{ ...fade(0.35), position:'relative', flexShrink:0 }}>
            {/* Outer orbit ring */}
            <div style={{
              position:'absolute', inset:'-28px', borderRadius:'50%',
              border:'1px dashed rgba(56,189,248,0.18)',
              animation:'spin-slow 25s linear infinite',
            }}/>
            {/* Liquid glass ring */}
            <div style={{
              position:'absolute', inset:'-10px', borderRadius:'50%',
              background:'transparent',
              border:'2px solid transparent',
              backgroundImage:'linear-gradient(var(--bg),var(--bg)), linear-gradient(135deg,var(--c1),var(--c2),var(--c3))',
              backgroundOrigin:'border-box', backgroundClip:'padding-box, border-box',
            }}/>
            <div className="lg" style={{
              borderRadius:'50%', padding:4, width:192, height:192,
              background:'rgba(255,255,255,0.06)',
            }}>
              <img src={profile.avatar_url} alt="avatar" style={{
                width:184, height:184, borderRadius:'50%',
                display:'block', objectFit:'cover',
              }}/>
            </div>
            {/* Glow */}
            <div style={{
              position:'absolute', bottom:-20, left:'50%', transform:'translateX(-50%)',
              width:120, height:24,
              background:'radial-gradient(ellipse, rgba(56,189,248,0.35), transparent 70%)',
              filter:'blur(8px)', pointerEvents:'none',
            }}/>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ textAlign:'center', paddingTop:'1rem', opacity: vis ? 0.5 : 0, transition:'opacity 1.2s 1.2s' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.12em',
            color:'var(--muted)', marginBottom:'0.4rem' }}>SCROLL</p>
          <FiArrowDown size={13} style={{ color:'var(--muted)', animation:'float 2s ease-in-out infinite' }}/>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { FiStar, FiGitBranch, FiEye, FiCode, FiUsers, FiGitCommit } from 'react-icons/fi'

export function SectionTitle({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <p className="section-tag">{tag}</p>
      <h2 style={{ fontSize:'clamp(1.9rem,4vw,2.9rem)', fontWeight:900, color:'#fff',
        letterSpacing:'-0.025em', lineHeight:1.05, marginBottom:'0.8rem' }}>
        {title}
      </h2>
      {subtitle && <p style={{ color:'var(--muted)', fontSize:'0.93rem', lineHeight:1.65 }}>{subtitle}</p>}
      <div style={{ marginTop:'1.5rem', height:'1px',
        background:'linear-gradient(90deg,var(--c1),rgba(167,139,250,0.5),transparent)' }}/>
    </div>
  )
}

function AnimatedNumber({ value }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0, step = value / 45
        const t = setInterval(() => {
          start += step
          if (start >= value) { setN(value); clearInterval(t) }
          else setN(Math.floor(start))
        }, 28)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])
  return <span ref={ref}>{n.toLocaleString()}</span>
}

export default function GitHubStats({ profile, repos }) {
  const totalStars    = repos.reduce((s,r) => s + r.stargazers_count, 0)
  const totalForks    = repos.reduce((s,r) => s + r.forks_count, 0)
  const totalWatchers = repos.reduce((s,r) => s + r.watchers_count, 0)
  const totalIssues   = repos.reduce((s,r) => s + r.open_issues_count, 0)

  const stats = [
    { icon:FiCode,      label:'Public Repos',  value:profile?.public_repos ?? 0, color:'#38bdf8', glow:'rgba(56,189,248,0.22)' },
    { icon:FiStar,      label:'Total Stars',   value:totalStars,                 color:'#fbbf24', glow:'rgba(251,191,36,0.22)' },
    { icon:FiGitBranch, label:'Total Forks',   value:totalForks,                 color:'#a78bfa', glow:'rgba(167,139,250,0.22)' },
    { icon:FiUsers,     label:'Followers',     value:profile?.followers ?? 0,    color:'#f472b6', glow:'rgba(244,114,182,0.22)' },
    { icon:FiEye,       label:'Watchers',      value:totalWatchers,              color:'#34d399', glow:'rgba(52,211,153,0.22)' },
    { icon:FiGitCommit, label:'Open Issues',   value:totalIssues,                color:'#fb923c', glow:'rgba(251,146,60,0.22)' },
  ]

  return (
    <section id="stats" style={{ padding:'5rem 2rem', maxWidth:'1100px', margin:'0 auto' }}>
      <SectionTitle tag="// analytics" title="By the Numbers" subtitle="Live stats pulled from GitHub API on every visit." />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(162px,1fr))', gap:'1rem' }}>
        {stats.map(({ icon:Icon, label, value, color, glow }, i) => (
          <StatCard key={label} Icon={Icon} label={label} value={value} color={color} glow={glow} delay={i*0.07}/>
        ))}
      </div>

      {/* Contribution chart */}
      <div className="lg" style={{
        marginTop:'1.75rem', borderRadius:'20px', padding:'1.75rem', textAlign:'center',
      }}>
        <p style={{ fontFamily:'var(--font-mono)', color:'var(--muted)', fontSize:'0.68rem',
          letterSpacing:'0.1em', marginBottom:'1.25rem', textTransform:'uppercase' }}>
          Contribution Activity
        </p>
        <img
          src={`https://ghchart.rshah.org/38bdf8/${import.meta.env.VITE_GITHUB_USERNAME}`}
          alt="Contribution Chart"
          style={{ width:'100%', maxWidth:'820px', borderRadius:'10px',
            filter:'saturate(1.3) brightness(1.05)', display:'block', margin:'0 auto' }}
          onError={e => { e.target.style.display='none' }}
        />
      </div>
    </section>
  )
}

function StatCard({ Icon, label, value, color, glow, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="lg lg-hover"
      style={{
        borderRadius:'20px', padding:'1.6rem 1.2rem',
        border: hov ? `1px solid ${color}45` : '1px solid rgba(255,255,255,0.11)',
        boxShadow: hov ? `0 24px 60px ${glow}, var(--lg-inset-top)` : 'var(--lg-shadow)',
        transform: hov ? 'translateY(-7px) scale(1.02)' : 'none',
        animation: `fadeUp 0.55s ${delay}s cubic-bezier(0.16,1,0.3,1) both`,
        cursor:'default', textAlign:'center',
      }}
    >
      {/* Glow bg on hover */}
      <div style={{
        position:'absolute', inset:0, borderRadius:'inherit',
        background: hov ? `radial-gradient(circle at 50% 0%, ${glow}, transparent 65%)` : 'none',
        transition:'all 0.35s', pointerEvents:'none',
      }}/>
      <div style={{
        width:44, height:44, borderRadius:'12px', margin:'0 auto 1rem',
        background:`linear-gradient(135deg, ${glow}, rgba(255,255,255,0.04))`,
        border:`1px solid ${color}30`,
        display:'flex', alignItems:'center', justifyContent:'center', color,
        position:'relative',
      }}>
        <Icon size={18}/>
      </div>
      <div style={{ fontSize:'2.1rem', fontWeight:900, color:'#fff',
        fontFamily:'var(--font-mono)', lineHeight:1, marginBottom:'0.45rem',
        letterSpacing:'-0.02em', position:'relative' }}>
        <AnimatedNumber value={value}/>
      </div>
      <div style={{ fontSize:'0.7rem', color:'var(--muted)', fontFamily:'var(--font-mono)',
        letterSpacing:'0.06em', textTransform:'uppercase', position:'relative' }}>
        {label}
      </div>
    </div>
  )
}

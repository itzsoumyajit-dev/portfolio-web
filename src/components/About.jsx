import { useState, useEffect, useRef } from 'react'
import { FiCode, FiGithub, FiAward, FiCoffee, FiZap } from 'react-icons/fi'
import { SectionTitle } from './GitHubStats'

const SKILLS = [
  { category:'Frontend', icon:'🎨', color:'#38bdf8', items:['React','TypeScript','Next.js','Tailwind','Framer'] },
  { category:'Backend',  icon:'⚙️', color:'#a78bfa', items:['Node.js','Python','Express','FastAPI','REST'] },
  { category:'Database', icon:'🗄️', color:'#fbbf24', items:['PostgreSQL','MongoDB','Redis','MySQL','Firebase'] },
  { category:'DevOps',   icon:'🚀', color:'#f472b6', items:['Docker','Git','CI/CD','Vercel','Linux'] },
]
const TIMELINE = [
  { year:'2024', title:'Open Source Contributor', desc:'Actively contributing to open source on GitHub.', icon:'🌍' },
  { year:'2023', title:'Full Stack Developer',    desc:'Built and shipped multiple full-stack products.', icon:'⚡' },
  { year:'2022', title:'Started Coding Journey',  desc:'Fell in love with programming and the web.', icon:'🌱' },
]
const FACTS = [
  { icon:FiCoffee, label:'Coffee Cups', value:'∞',    color:'#fbbf24' },
  { icon:FiCode,   label:'Lines of Code', value:'50K+', color:'#38bdf8' },
  { icon:FiGithub, label:'Commits',     value:'500+', color:'#a78bfa' },
  { icon:FiAward,  label:'Projects',    value:'20+',  color:'#f472b6' },
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

function SkillCard({ category, icon, color, items, delay }) {
  const [hov, setHov] = useState(false)
  const [ref, inV]   = useInView()
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="lg"
      style={{
        borderRadius:'18px', padding:'1.3rem',
        border: hov ? `1px solid ${color}40` : 'var(--lg-border)',
        boxShadow: hov ? `0 20px 50px ${color}18, var(--lg-inset-top)` : 'var(--lg-shadow)',
        opacity: inV ? 1 : 0,
        transform: inV ? (hov ? 'translateY(-5px)' : 'none') : 'translateY(28px)',
        transition: `all 0.38s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
        <div style={{ width:36, height:36, borderRadius:'10px', fontSize:'1rem', flexShrink:0,
          background:`linear-gradient(135deg, ${color}22, ${color}08)`,
          border:`1px solid ${color}28`,
          display:'flex', alignItems:'center', justifyContent:'center' }}>{icon}</div>
        <span style={{ fontWeight:800, fontSize:'0.88rem', color: hov ? '#fff' : 'var(--text)' }}>
          {category}
        </span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.38rem' }}>
        {items.map(item => (
          <span key={item} className="lg-pill" style={{
            padding:'0.22rem 0.65rem', borderRadius:'100px',
            fontSize:'0.71rem', fontFamily:'var(--font-mono)',
            color: hov ? color : 'var(--muted2)',
            transition:'color 0.2s',
          }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

export default function About({ profile }) {
  const [bioRef, bioV] = useInView()
  const [tlRef,  tlV]  = useInView()
  if (!profile) return null

  return (
    <>
      <style>{`
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:2rem; }
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:0.85rem; }
        @media(max-width:680px){
          .about-grid { grid-template-columns:1fr !important; }
          .skills-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:380px){ .skills-grid{ grid-template-columns:1fr !important; } }
      `}</style>

      <section id="about" style={{ padding:'5rem 2rem', maxWidth:'1100px', margin:'0 auto' }}>
        <SectionTitle tag="// about.me" title="The Person Behind the Code"
          subtitle="Who I am, what I do, and what gets me excited." />

        <div className="about-grid">
          {/* Bio */}
          <div ref={bioRef} className="lg" style={{
            borderRadius:'22px', padding:'1.75rem', minWidth:0,
            opacity: bioV?1:0, transform: bioV?'none':'translateY(28px)',
            transition:'all 0.72s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', borderRadius:'22px 22px 0 0',
              background:'linear-gradient(90deg,var(--c1),var(--c2),transparent)' }}/>
            <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1.25rem' }}>
              <img src={profile.avatar_url} alt="avatar" style={{
                width:48, height:48, borderRadius:'50%', flexShrink:0,
                border:'2px solid rgba(56,189,248,0.35)',
                boxShadow:'0 4px 16px rgba(56,189,248,0.2)',
              }}/>
              <div style={{ minWidth:0 }}>
                <p style={{ fontFamily:'var(--font-mono)', color:'var(--c1)', fontSize:'0.62rem',
                  letterSpacing:'0.1em', marginBottom:'0.15rem' }}>ABOUT ME</p>
                <h3 style={{ color:'#fff', fontWeight:800, fontSize:'1rem',
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {profile.name || profile.login}
                </h3>
              </div>
            </div>
            <p style={{ color:'var(--muted2)', lineHeight:1.82, fontSize:'0.87rem',
              marginBottom:'1rem', wordBreak:'break-word' }}>
              {profile.bio || `Hi! I'm ${profile.login}, a passionate developer who loves building things for the web. I enjoy turning complex problems into simple, beautiful and intuitive solutions.`}
            </p>
            <p style={{ color:'var(--muted)', lineHeight:1.82, fontSize:'0.84rem', marginBottom:'1.25rem' }}>
              When I'm not coding, I'm exploring new tech, contributing to open source, or diving into a juicy problem. I believe great software is built with both skill and care.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.38rem' }}>
              {['Open Source','Problem Solver','Team Player','Fast Learner'].map(t=>(
                <span key={t} className="lg-pill" style={{
                  padding:'0.2rem 0.65rem', borderRadius:'100px',
                  fontSize:'0.7rem', fontFamily:'var(--font-mono)', color:'var(--c1)',
                  whiteSpace:'nowrap',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Facts */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            {FACTS.map(({ icon:Icon, label, value, color }, i) => (
              <div key={label} className="lg" style={{
                borderRadius:'16px', padding:'1.15rem 0.9rem', textAlign:'center',
                opacity: bioV?1:0, transform: bioV?'none':'translateY(20px)',
                transition:`all 0.6s ${0.1+i*0.09}s cubic-bezier(0.16,1,0.3,1)`,
              }}>
                <div style={{ width:34, height:34, borderRadius:'10px', margin:'0 auto 0.6rem',
                  background:`${color}18`, border:`1px solid ${color}28`,
                  display:'flex', alignItems:'center', justifyContent:'center', color }}>
                  <Icon size={14}/>
                </div>
                <div style={{ fontSize:'1.5rem', fontWeight:900, color:'#fff',
                  fontFamily:'var(--font-mono)', marginBottom:'0.2rem', lineHeight:1 }}>{value}</div>
                <div style={{ fontSize:'0.62rem', color:'var(--muted)', fontFamily:'var(--font-mono)',
                  letterSpacing:'0.04em', lineHeight:1.3 }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <p className="section-tag" style={{ marginBottom:'1.1rem' }}>// tech i work with</p>
        <div className="skills-grid" style={{ marginBottom:'2rem' }}>
          {SKILLS.map((s,i) => <SkillCard key={s.category} {...s} delay={i*0.08}/>)}
        </div>

        {/* Timeline */}
        <div ref={tlRef}>
          <p className="section-tag" style={{ marginBottom:'1.1rem' }}>// my journey</p>
          <div style={{ position:'relative', paddingLeft:'1.6rem' }}>
            <div style={{
              position:'absolute', left:'6px', top:0, bottom:0, width:'1px',
              background:'linear-gradient(180deg,var(--c1),var(--c2),transparent)',
              opacity: tlV?1:0, transition:'opacity 0.8s',
            }}/>
            {TIMELINE.map(({ year,title,desc,icon },i) => (
              <div key={year} style={{
                display:'flex', gap:'1rem', marginBottom:'1rem', position:'relative',
                opacity: tlV?1:0, transform: tlV?'none':'translateX(-18px)',
                transition:`all 0.6s ${i*0.14}s cubic-bezier(0.16,1,0.3,1)`,
              }}>
                <div style={{ position:'absolute', left:'-1.3rem', top:'0.3rem',
                  width:12, height:12, borderRadius:'50%',
                  background:'var(--bg)', border:'2px solid var(--c1)',
                  boxShadow:'0 0 8px rgba(56,189,248,0.45)', zIndex:1 }}/>
                <div className="lg" style={{ borderRadius:'14px', padding:'1rem 1.2rem', flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem',
                    marginBottom:'0.35rem', flexWrap:'wrap' }}>
                    <span style={{ fontSize:'0.95rem' }}>{icon}</span>
                    <span className="lg-pill" style={{ padding:'0.1rem 0.55rem', borderRadius:'100px',
                      fontFamily:'var(--font-mono)', color:'var(--c1)', fontSize:'0.65rem',
                      whiteSpace:'nowrap' }}>{year}</span>
                    <h4 style={{ color:'#fff', fontWeight:700, fontSize:'0.86rem' }}>{title}</h4>
                  </div>
                  <p style={{ color:'var(--muted)', fontSize:'0.79rem', lineHeight:1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

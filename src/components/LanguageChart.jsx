import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { SectionTitle } from './GitHubStats'
import { useState } from 'react'

const PALETTE = [
  { color:'#38bdf8', glow:'rgba(56,189,248,0.3)' },
  { color:'#a78bfa', glow:'rgba(167,139,250,0.3)' },
  { color:'#f472b6', glow:'rgba(244,114,182,0.3)' },
  { color:'#fbbf24', glow:'rgba(251,191,36,0.3)'  },
  { color:'#34d399', glow:'rgba(52,211,153,0.3)'  },
  { color:'#fb923c', glow:'rgba(251,146,60,0.3)'  },
  { color:'#e879f9', glow:'rgba(232,121,249,0.3)' },
  { color:'#a3e635', glow:'rgba(163,230,53,0.3)'  },
]

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0].payload
  return (
    <div className="lg" style={{
      borderRadius:'12px', padding:'0.7rem 1rem',
      fontFamily:'var(--font-mono)', fontSize:'0.76rem',
    }}>
      <div style={{ color:'var(--c1)', marginBottom:'0.2rem' }}>{name}</div>
      <div style={{ color:'var(--muted)' }}>{value} repos</div>
    </div>
  )
}

export default function LanguageChart({ languages }) {
  const [activeIdx, setActiveIdx] = useState(null)

  const data = Object.entries(languages)
    .sort((a,b) => b[1]-a[1]).slice(0,8)
    .map(([name,value]) => ({ name, value }))
  const total = data.reduce((s,d) => s+d.value, 0)

  return (
    <section id="languages" style={{ padding:'4rem 2rem 6rem', maxWidth:'1100px', margin:'0 auto' }}>
      <SectionTitle tag="// tech stack" title="Languages & Tools"
        subtitle="Distribution across all public repositories." />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}
        className="two-col-lg">

        {/* Donut */}
        <div className="lg" style={{ borderRadius:'22px', padding:'2rem', position:'relative' }}>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%"
                innerRadius={72} outerRadius={108} paddingAngle={3} dataKey="value"
                onMouseEnter={(_,i) => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                strokeWidth={0}
              >
                {data.map((_,i) => (
                  <Cell key={i} fill={PALETTE[i%PALETTE.length].color}
                    opacity={activeIdx===null||activeIdx===i ? 1 : 0.35}
                    style={{ cursor:'pointer', outline:'none',
                      filter: activeIdx===i ? `drop-shadow(0 0 10px ${PALETTE[i%PALETTE.length].glow})` : 'none',
                      transition:'all 0.2s' }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)', textAlign:'center', pointerEvents:'none' }}>
            <div style={{ fontSize:'2rem', fontWeight:900, color:'#fff',
              fontFamily:'var(--font-mono)', lineHeight:1 }}>
              {activeIdx!==null ? data[activeIdx]?.value : total}
            </div>
            <div style={{ fontSize:'0.62rem', color:'var(--muted)',
              fontFamily:'var(--font-mono)', letterSpacing:'0.08em', marginTop:'0.2rem' }}>
              {activeIdx!==null ? data[activeIdx]?.name.toUpperCase() : 'TOTAL'}
            </div>
          </div>
        </div>

        {/* Bars */}
        <div className="lg" style={{ borderRadius:'22px', padding:'2rem',
          display:'flex', flexDirection:'column', gap:'1rem' }}>
          {data.map(({ name, value }, i) => {
            const pct = Math.round((value/total)*100)
            const { color } = PALETTE[i%PALETTE.length]
            return (
              <div key={name}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                style={{ cursor:'pointer' }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.35rem' }}>
                  <span style={{ fontSize:'0.81rem', fontWeight:600,
                    color: activeIdx===i ? '#fff' : 'var(--muted2)', transition:'color 0.2s',
                    display:'flex', alignItems:'center', gap:'0.45rem' }}>
                    <span style={{ width:8, height:8, borderRadius:'50%',
                      background:color, display:'inline-block', flexShrink:0 }}/>
                    {name}
                  </span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.73rem', color }}>{pct}%</span>
                </div>
                <div style={{ height:'4px', borderRadius:'100px',
                  background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:'100px', width:`${pct}%`,
                    background:`linear-gradient(90deg, ${color}, ${color}88)`,
                    transition:'width 0.65s cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: activeIdx===i ? `0 0 10px ${color}` : 'none',
                  }}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

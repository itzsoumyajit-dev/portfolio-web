import { useState } from 'react'
import { FiStar, FiGitBranch, FiExternalLink, FiCircle, FiEye } from 'react-icons/fi'
import { SectionTitle } from './GitHubStats'

const LC = {
  JavaScript:'#f7df1e',TypeScript:'#3178c6',Python:'#3572A5',Rust:'#dea584',
  Go:'#00ADD8',CSS:'#563d7c',HTML:'#e34c26',Java:'#b07219','C++':'#f34b7d',
  Ruby:'#701516',Shell:'#89e051',Vue:'#41b883',Svelte:'#ff3e00',Kotlin:'#7f52ff',
  Swift:'#f05138',Dart:'#00B4AB',PHP:'#777BB4','C#':'#178600',
}

export default function RepoGrid({ repos }) {
  const [showAll, setShowAll] = useState(false)
  const display = (showAll ? repos.slice(0,18) : repos.slice(0,6))

  return (
    <section id="repos" style={{ padding:'4rem 2rem 5rem', maxWidth:'1100px', margin:'0 auto' }}>
      <SectionTitle
        tag="// repositories"
        title="Featured Projects"
        subtitle={`${repos.length} public repositories · sorted by stars`}
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1.1rem' }}>
        {display.map((repo,i) => <RepoCard key={repo.id} repo={repo} delay={i*0.055}/>)}
      </div>
      {repos.length > 6 && (
        <div style={{ textAlign:'center', marginTop:'2.5rem' }}>
          <button onClick={() => setShowAll(!showAll)}
            className="lg lg-hover"
            style={{
              background:'transparent', cursor:'pointer',
              borderRadius:'12px', padding:'0.7rem 2rem',
              fontSize:'0.82rem', fontFamily:'var(--font-mono)', color:'var(--c1)',
              letterSpacing:'0.05em',
            }}
          >
            {showAll ? '↑ Show Less' : `↓ Show All ${repos.length} Repos`}
          </button>
        </div>
      )}
    </section>
  )
}

function RepoCard({ repo, delay }) {
  const [hov, setHov] = useState(false)
  const lc = LC[repo.language] || '#8494b8'

  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="lg"
      style={{
        textDecoration:'none', display:'flex', flexDirection:'column', gap:'0.8rem',
        borderRadius:'20px', padding:'1.4rem',
        border: hov ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.11)',
        boxShadow: hov ? 'var(--lg-shadow-h)' : 'var(--lg-shadow)',
        transform: hov ? 'translateY(-6px) scale(1.01)' : 'none',
        transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        animation:`fadeUp 0.55s ${delay}s cubic-bezier(0.16,1,0.3,1) both`,
        position:'relative', overflow:'hidden',
      }}
    >
      {/* Language color top bar */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:'2px',
        background:`linear-gradient(90deg, ${lc}, transparent)`,
        opacity: hov ? 1 : 0.5, transition:'opacity 0.3s',
      }}/>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <span style={{ fontWeight:800, color: hov ? '#fff' : 'rgba(255,255,255,0.85)',
          fontSize:'0.93rem', overflow:'hidden', textOverflow:'ellipsis',
          whiteSpace:'nowrap', flex:1, transition:'color 0.2s' }}>
          {repo.name}
        </span>
        <FiExternalLink size={13} style={{
          color: hov ? 'var(--c1)' : 'var(--muted)', flexShrink:0, marginLeft:'0.6rem',
          transform: hov ? 'translate(2px,-2px)' : 'none', transition:'all 0.2s',
        }}/>
      </div>

      <p style={{ color:'var(--muted2)', fontSize:'0.79rem', lineHeight:1.65, flexGrow:1,
        display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
        {repo.description || 'No description provided.'}
      </p>

      {repo.topics?.length > 0 && (
        <div style={{ display:'flex', gap:'0.35rem', flexWrap:'wrap' }}>
          {repo.topics.slice(0,3).map(t => (
            <span key={t} className="lg-pill" style={{
              padding:'0.18rem 0.6rem', borderRadius:'100px',
              fontSize:'0.67rem', fontFamily:'var(--font-mono)',
              color:'var(--c1)', letterSpacing:'0.02em',
            }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display:'flex', gap:'1rem', fontSize:'0.73rem', color:'var(--muted)',
        fontFamily:'var(--font-mono)', paddingTop:'0.75rem',
        borderTop:'1px solid rgba(255,255,255,0.06)', alignItems:'center' }}>
        {repo.language && (
          <span style={{ display:'flex', alignItems:'center', gap:'0.3rem', flex:1 }}>
            <FiCircle size={9} style={{ color:lc, fill:lc }}/>
            {repo.language}
          </span>
        )}
        <span style={{ display:'flex', alignItems:'center', gap:'0.28rem' }}>
          <FiStar size={11} style={{ color:'#fbbf24' }}/>{repo.stargazers_count}
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:'0.28rem' }}>
          <FiGitBranch size={11} style={{ color:'var(--c2)' }}/>{repo.forks_count}
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:'0.28rem' }}>
          <FiEye size={11} style={{ color:'var(--c4)' }}/>{repo.watchers_count}
        </span>
      </div>
    </a>
  )
}

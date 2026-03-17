import { useEffect, useRef } from 'react'
import { useGitHub } from './hooks/useGitHub'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import GitHubStats from './components/GitHubStats'
import RepoGrid from './components/RepoGrid'
import LanguageChart from './components/LanguageChart'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0,raf
    const move = (e) => {
      mx=e.clientX; my=e.clientY
      if(dot.current) dot.current.style.transform=`translate(${mx-5}px,${my-5}px)`
    }
    const animate = () => {
      rx += (mx-rx)*0.11; ry += (my-ry)*0.11
      if(ring.current) ring.current.style.transform=`translate(${rx-17}px,${ry-17}px)`
      raf=requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove',move)
    raf=requestAnimationFrame(animate)
    const grow=()=>{ if(ring.current){ring.current.style.width='52px';ring.current.style.height='52px';ring.current.style.borderColor='rgba(56,189,248,0.65)'} }
    const shrink=()=>{ if(ring.current){ring.current.style.width='34px';ring.current.style.height='34px';ring.current.style.borderColor='rgba(56,189,248,0.45)'} }
    document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',grow);el.addEventListener('mouseleave',shrink)})
    return ()=>{ window.removeEventListener('mousemove',move); cancelAnimationFrame(raf) }
  },[])
  return (<><div id="cursor" ref={dot}/><div id="cursor-ring" ref={ring}/></>)
}

function LoadingScreen() {
  return (
    <div style={{ minHeight:'100vh',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',background:'var(--bg)',gap:'2rem' }}>
      <div style={{ width:64,height:64,borderRadius:'18px',
        background:'linear-gradient(135deg,rgba(56,189,248,0.15),rgba(167,139,250,0.15))',
        border:'1px solid rgba(56,189,248,0.25)',
        backdropFilter:'blur(20px)',
        display:'flex',alignItems:'center',justifyContent:'center',
        fontSize:'1.8rem',animation:'pulse-glow 2s ease infinite' }}>⚡</div>
      <div style={{ textAlign:'center' }}>
        <p style={{ fontFamily:'var(--font-mono)',color:'var(--c1)',fontSize:'0.75rem',
          letterSpacing:'0.18em',marginBottom:'1rem' }}>FETCHING GITHUB DATA</p>
        <div style={{ width:'200px',height:'2px',background:'rgba(255,255,255,0.06)',
          borderRadius:'100px',overflow:'hidden',margin:'0 auto' }}>
          <div style={{ height:'100%',width:'40%',borderRadius:'100px',
            background:'linear-gradient(90deg,var(--c1),var(--c2))',
            animation:'load-bar 1.6s ease-in-out infinite' }}/>
        </div>
      </div>
    </div>
  )
}

function ErrorScreen({ error }) {
  return (
    <div style={{ minHeight:'100vh',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',
      background:'var(--bg)',gap:'1.5rem',padding:'2rem',textAlign:'center' }}>
      <div style={{ fontSize:'3rem' }}>⚠️</div>
      <div>
        <h2 style={{ color:'#f472b6',fontFamily:'var(--font-mono)',marginBottom:'0.75rem',fontSize:'1rem' }}>
          Failed to load GitHub data
        </h2>
        <p style={{ color:'var(--muted)',fontFamily:'var(--font-mono)',fontSize:'0.8rem',marginBottom:'0.5rem' }}>{error}</p>
        <p style={{ color:'rgba(90,106,138,0.6)',fontSize:'0.75rem',fontFamily:'var(--font-mono)' }}>
          Make sure VITE_GITHUB_USERNAME is set in your .env file
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const { profile, repos, languages, loading, error } = useGitHub()
  if (loading) return <LoadingScreen/>
  if (error)   return <ErrorScreen error={error}/>
  return (
    <>
      <Cursor/>
      <ParticleBackground/>
      <Navbar/>
      <main>
        <Hero profile={profile}/>
        <About profile={profile}/>
        <GitHubStats profile={profile} repos={repos}/>
        <RepoGrid repos={repos}/>
        <LanguageChart languages={languages}/>
        <Contact profile={profile}/>
      </main>
      <Footer/>
    </>
  )
}

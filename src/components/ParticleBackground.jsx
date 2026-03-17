import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    let animId
    let mouse = { x: W / 2, y: H / 2 }

    canvas.width  = W
    canvas.height = H

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
    }
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)

    /* ── Color palette matching the site ── */
    const COLORS = [
      '56,189,248',   // sky / c1
      '167,139,250',  // violet / c2
      '244,114,182',  // pink / c3
      '52,211,153',   // emerald / c4
      '251,191,36',   // amber
    ]

    /* ── Particle class ── */
    class Particle {
      constructor(i) {
        this.reset(true)
        this.id = i
      }

      reset(initial = false) {
        this.x  = Math.random() * W
        this.y  = initial ? Math.random() * H : H + 20
        this.baseX = this.x
        this.baseY = this.y

        this.size   = Math.random() * 2.2 + 0.4
        this.speedX = (Math.random() - 0.5) * 0.45
        this.speedY = -(Math.random() * 0.6 + 0.2)   // drift upward
        this.opacity= Math.random() * 0.65 + 0.15
        this.fade   = Math.random() * 0.008 + 0.002
        this.life   = 1
        this.colorRgb = COLORS[Math.floor(Math.random() * COLORS.length)]

        /* Sine-wave wobble */
        this.wobbleAmp   = Math.random() * 1.8 + 0.3
        this.wobbleFreq  = Math.random() * 0.02 + 0.008
        this.wobblePhase = Math.random() * Math.PI * 2
        this.tick = 0

        /* Connection radius */
        this.connectRadius = 140
      }

      update() {
        this.tick++

        /* Wobble */
        const wobble = Math.sin(this.wobblePhase + this.tick * this.wobbleFreq) * this.wobbleAmp

        /* Subtle mouse repulsion */
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        let repX = 0, repY = 0
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120
          repX = (dx / dist) * force * 1.2
          repY = (dy / dist) * force * 1.2
        }

        this.x += this.speedX + wobble * 0.04 + repX * 0.6
        this.y += this.speedY + repY * 0.6
        this.life -= this.fade

        if (this.life <= 0 || this.y < -20) this.reset(false)
      }

      draw() {
        const alpha = this.life * this.opacity
        ctx.save()
        ctx.globalAlpha = alpha

        /* Glow */
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3.5)
        grd.addColorStop(0, `rgba(${this.colorRgb}, ${alpha})`)
        grd.addColorStop(1, `rgba(${this.colorRgb}, 0)`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2)
        ctx.fill()

        /* Core dot */
        ctx.globalAlpha = Math.min(alpha * 1.8, 1)
        ctx.fillStyle = `rgba(${this.colorRgb}, 1)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    /* ── Connection lines ── */
    function drawConnections(particles) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18 * Math.min(a.life, b.life)
            ctx.save()
            ctx.globalAlpha = alpha
            ctx.strokeStyle = `rgba(${a.colorRgb}, 1)`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    /* ── Flowing streams ── */
    class Stream {
      constructor() { this.reset() }
      reset() {
        this.x     = Math.random() * W
        this.y     = Math.random() * H
        this.len   = Math.random() * 80 + 40
        this.angle = Math.random() * Math.PI * 2
        this.speed = Math.random() * 0.008 + 0.003
        this.width = Math.random() * 1.2 + 0.3
        this.alpha = Math.random() * 0.06 + 0.02
        this.colorRgb = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.life  = 1
        this.fade  = Math.random() * 0.004 + 0.001
        this.curve = (Math.random() - 0.5) * 0.03
      }
      update() {
        this.angle += this.curve
        this.x += Math.cos(this.angle) * this.speed * 50
        this.y += Math.sin(this.angle) * this.speed * 50
        this.life -= this.fade
        if (this.life <= 0 || this.x < -100 || this.x > W + 100 || this.y < -100 || this.y > H + 100)
          this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.life * this.alpha
        ctx.strokeStyle = `rgba(${this.colorRgb}, 1)`
        ctx.lineWidth = this.width
        ctx.beginPath()
        const ex = this.x + Math.cos(this.angle) * this.len
        const ey = this.y + Math.sin(this.angle) * this.len
        const cx = this.x + Math.cos(this.angle + 0.5) * this.len * 0.5
        const cy = this.y + Math.sin(this.angle + 0.5) * this.len * 0.5
        ctx.moveTo(this.x, this.y)
        ctx.quadraticCurveTo(cx, cy, ex, ey)
        ctx.stroke()
        ctx.restore()
      }
    }

    /* ── Init ── */
    const COUNT = Math.min(Math.floor((W * H) / 7000), 180)
    const particles = Array.from({ length: COUNT }, (_, i) => new Particle(i))
    const streams   = Array.from({ length: 24 }, () => new Stream())

    /* ── Render loop ── */
    function render() {
      ctx.clearRect(0, 0, W, H)

      /* Subtle vignette */
      const vign = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85)
      vign.addColorStop(0, 'rgba(4,6,15,0)')
      vign.addColorStop(1, 'rgba(4,6,15,0.55)')
      ctx.fillStyle = vign
      ctx.fillRect(0, 0, W, H)

      /* Streams */
      streams.forEach(s => { s.update(); s.draw() })

      /* Connections */
      drawConnections(particles)

      /* Particles */
      particles.forEach(p => { p.update(); p.draw() })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWebGLAvailable, canvasGL, dprClamp } from './_helpers'

type Phase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out'

const PHASE_DURATIONS: Record<Phase, number> = {
  inhale:    4,
  'hold-in': 7,
  exhale:    8,
  'hold-out':4,
}

const PHASE_LABELS: Record<Phase, string> = {
  inhale:    'Inhale',
  'hold-in': 'Hold',
  exhale:    'Exhale',
  'hold-out':'Hold',
}

const NEXT: Record<Phase, Phase> = {
  inhale:    'hold-in',
  'hold-in': 'exhale',
  exhale:    'hold-out',
  'hold-out':'inhale',
}

interface OrbState {
  phase: Phase
  /** 0..1 progress within the current phase */
  progress: number
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function Orb({
  state,
  paused,
}: {
  state: React.MutableRefObject<OrbState>
  paused: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    if (!paused) {
      const phase = state.current.phase
      state.current.progress += delta / PHASE_DURATIONS[phase]
      if (state.current.progress >= 1) {
        state.current.progress = 0
        state.current.phase = NEXT[phase]
      }
    }
    const { phase, progress } = state.current
    let scale: number
    if (phase === 'inhale') {
      scale = 1.0 + easeInOut(progress) * 0.6
    } else if (phase === 'exhale') {
      scale = 1.6 - easeInOut(progress) * 0.6
    } else if (phase === 'hold-in') {
      scale = 1.6 + Math.sin(progress * Math.PI * 2) * 0.03
    } else {
      scale = 1.0 + Math.sin(progress * Math.PI * 2) * 0.015
    }
    ref.current.scale.setScalar(scale)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#FFC9A6"
        emissive="#F97316"
        emissiveIntensity={0.2}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  )
}

export default function BreathingOrb() {
  const webgl = useWebGLAvailable()
  const stateRef = useRef<OrbState>({ phase: 'inhale', progress: 0 })
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0)

  // Re-render the label/timer overlay every ~250ms without touching the canvas
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 250)
    return () => clearInterval(id)
  }, [])

  if (webgl === false) {
    return (
      <div className="relative w-full h-[500px] rounded-2xl bg-gradient-to-br from-[#FFE4D2] to-[#FAF7F4] flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-[#FFC9A6] shadow-[0_0_80px_rgba(249,115,22,0.4)] animate-pulse" />
        <p className="absolute bottom-6 text-sm text-[#4A5260]">
          Interactive 3D requires WebGL — but the breathing exercise works in the app.
        </p>
      </div>
    )
  }
  if (webgl === null) return <div className="w-full h-[500px] rounded-2xl bg-[#FFE4D2]/30" />

  const { phase, progress } = stateRef.current
  const remaining = Math.max(0, Math.ceil(PHASE_DURATIONS[phase] * (1 - progress)))
  void tick // ensures we re-render

  return (
    <div className="relative w-full h-[500px] rounded-2xl bg-gradient-to-br from-[#FFE4D2] via-[#FAF7F4] to-[#FFE9D9] overflow-hidden">
      {/* Glow halo follows orb scale roughly */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background:
            'radial-gradient(40% 40% at 50% 45%, rgba(249,115,22,0.35) 0%, rgba(249,115,22,0) 70%)',
          opacity: phase === 'inhale' || phase === 'hold-in' ? 0.9 : 0.5,
        }}
      />
      <Canvas gl={canvasGL} dpr={dprClamp} camera={{ fov: 50, position: [0, 0, 4] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[-3, 2, 4]} intensity={1.4} color="#F97316" />
        <pointLight position={[3, -2, 4]} intensity={0.8} color="#FFFFFF" />
        <Orb state={stateRef} paused={paused} />
      </Canvas>

      {/* HTML overlay — phase label + countdown */}
      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 pointer-events-none">
        <div className="text-3xl sm:text-4xl font-bold text-[#0E1726] tracking-tight transition-opacity">
          {PHASE_LABELS[phase]}
        </div>
        <div className="text-sm text-[#4A5260] tabular-nums">{remaining}s</div>
      </div>

      {/* Pause / play */}
      <button
        type="button"
        onClick={() => setPaused(p => !p)}
        className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-sm font-medium text-[#0E1726] hover:bg-white shadow-sm pointer-events-auto"
        aria-label={paused ? 'Resume breathing exercise' : 'Pause breathing exercise'}
      >
        {paused ? '▶ Play' : '⏸ Pause'}
      </button>
    </div>
  )
}

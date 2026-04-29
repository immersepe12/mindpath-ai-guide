'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile, useWebGLAvailable, canvasGL, dprClamp } from './_helpers'

const COLORS = [
  new THREE.Color('#F97316'), // orange
  new THREE.Color('#F77268'), // coral
  new THREE.Color('#FAF7F4'), // cream
]
const COLOR_WEIGHTS = [0.3, 0.3, 0.4]

interface ParticleData {
  positions: Float32Array
  colors: Float32Array
  speeds: Float32Array     // drift speed per particle
  phases: Float32Array     // sine wave phase per particle
  amplitudes: Float32Array // y-oscillation amplitude per particle
  origins: Float32Array    // baseline y for oscillation
}

function buildParticles(count: number): ParticleData {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  const phases = new Float32Array(count)
  const amplitudes = new Float32Array(count)
  const origins = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 16
    const y = (Math.random() - 0.5) * 10
    const z = (Math.random() - 0.5) * 6
    positions[i * 3]     = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    origins[i] = y

    // Pick weighted colour
    const r = Math.random()
    const idx = r < COLOR_WEIGHTS[0]
      ? 0
      : r < COLOR_WEIGHTS[0] + COLOR_WEIGHTS[1]
        ? 1
        : 2
    const c = COLORS[idx]
    colors[i * 3]     = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b

    speeds[i] = 0.2 + Math.random() * 0.4
    phases[i] = Math.random() * Math.PI * 2
    amplitudes[i] = 0.05 + Math.random() * 0.15
  }
  return { positions, colors, speeds, phases, amplitudes, origins }
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const data = useMemo(() => buildParticles(count), [count])
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (!ref.current || !groupRef.current) return
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const phase = data.phases[i]
      const amp = data.amplitudes[i]
      const t = state.clock.elapsedTime * data.speeds[i] + phase
      // Y oscillates around origin
      positions[i * 3 + 1] = data.origins[i] + Math.sin(t) * amp
    }
    ref.current.geometry.attributes.position.needsUpdate = true

    // Mouse-follow at group level (very gentle lerp)
    const targetX = (mouse.current.x * viewport.width) / 2 * 0.05
    const targetY = (mouse.current.y * viewport.height) / 2 * 0.05
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02
  })

  // Track mouse via ThreeJS state.pointer in useFrame already gives us this;
  // keep our own ref for the lerp smoothing target.
  useFrame((state) => {
    mouse.current.x = state.pointer.x
    mouse.current.y = state.pointer.y
  })

  return (
    <group ref={groupRef}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.positions, 3]}
            count={count}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[data.colors, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

interface HeroParticlesProps {
  className?: string
}

export default function HeroParticles({ className = '' }: HeroParticlesProps) {
  const webgl = useWebGLAvailable()
  const isMobile = useIsMobile()
  // Mobile gets reduced count for fps + battery
  const count = isMobile ? 400 : 1200

  if (webgl === false) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_50%_50%,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_70%)] ${className}`}
        aria-hidden
      />
    )
  }
  if (webgl === null) return null

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      <Canvas
        gl={canvasGL}
        dpr={dprClamp}
        camera={{ fov: 60, position: [0, 0, 10] }}
      >
        <ParticleField count={count} />
      </Canvas>
    </div>
  )
}

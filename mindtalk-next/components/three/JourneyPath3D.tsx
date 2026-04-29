'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useWebGLAvailable, canvasGL, dprClamp } from './_helpers'

const NODE_COUNT = 12
const COMPLETED_COUNT = 4   // first 4 nodes are "done"
const CURRENT_INDEX  = 4    // node 5 (index 4) is the current/pulsing one

// Build a smooth winding path — control points zigzag along x with gentle z drift
const CURVE = (() => {
  const points: THREE.Vector3[] = []
  for (let i = 0; i < 8; i++) {
    const t = i / 7
    const x = (i % 2 === 0 ? -1 : 1) * (1.5 + Math.random() * 0.4)
    const z = -2 + t * 4
    const y = 0
    points.push(new THREE.Vector3(x, y, z))
  }
  return new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5)
})()

function PulsingNode({
  position,
  size = 0.4,
  color = '#F97316',
}: {
  position: [number, number, number]
  size?: number
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08
    ref.current.scale.setScalar(pulse)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.4}
      />
    </mesh>
  )
}

function PathScene() {
  // Pre-compute node positions along the curve
  const nodePositions = useMemo(() => {
    const out: [number, number, number][] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const t = i / (NODE_COUNT - 1)
      const p = CURVE.getPoint(t)
      out.push([p.x, p.y, p.z])
    }
    return out
  }, [])

  // Two tube segments: completed (orange) + locked (grey)
  const completedTube = useMemo(() => {
    const tCompleted = COMPLETED_COUNT / (NODE_COUNT - 1)
    // Sub-curve for the first segment
    const subPoints: THREE.Vector3[] = []
    for (let i = 0; i <= 30; i++) {
      const t = (i / 30) * tCompleted
      subPoints.push(CURVE.getPoint(t))
    }
    return new THREE.CatmullRomCurve3(subPoints)
  }, [])

  const lockedTube = useMemo(() => {
    const tStart = COMPLETED_COUNT / (NODE_COUNT - 1)
    const subPoints: THREE.Vector3[] = []
    for (let i = 0; i <= 30; i++) {
      const t = tStart + (i / 30) * (1 - tStart)
      subPoints.push(CURVE.getPoint(t))
    }
    return new THREE.CatmullRomCurve3(subPoints)
  }, [])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#F97316" />

      {/* Completed tube — orange */}
      <mesh>
        <tubeGeometry args={[completedTube, 60, 0.05, 8, false]} />
        <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.3} />
      </mesh>
      {/* Locked tube — grey */}
      <mesh>
        <tubeGeometry args={[lockedTube, 60, 0.05, 8, false]} />
        <meshStandardMaterial color="#C7CCD3" />
      </mesh>

      {/* Nodes */}
      {nodePositions.map((pos, i) => {
        if (i < COMPLETED_COUNT) {
          // Completed
          return (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial
                color="#F97316"
                emissive="#F97316"
                emissiveIntensity={0.55}
                roughness={0.4}
              />
            </mesh>
          )
        }
        if (i === CURRENT_INDEX) {
          return <PulsingNode key={i} position={pos} size={0.4} color="#F97316" />
        }
        // Locked
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#C7CCD3" roughness={0.7} />
          </mesh>
        )
      })}
    </>
  )
}

interface JourneyPath3DProps {
  className?: string
}

export default function JourneyPath3D({ className = '' }: JourneyPath3DProps) {
  const webgl = useWebGLAvailable()

  if (webgl === false) {
    return (
      <div className={`relative w-full h-[400px] rounded-2xl bg-[#FAF7F4] flex items-center justify-center ${className}`}>
        <div className="flex gap-2">
          {Array.from({ length: NODE_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${
                i < COMPLETED_COUNT
                  ? 'bg-[#F97316]'
                  : i === CURRENT_INDEX
                    ? 'bg-[#F97316] animate-pulse'
                    : 'bg-[#C7CCD3]'
              }`}
            />
          ))}
        </div>
      </div>
    )
  }
  if (webgl === null) return <div className={`w-full h-[400px] rounded-2xl bg-[#FAF7F4] ${className}`} />

  return (
    <div className={`w-full h-[400px] rounded-2xl bg-gradient-to-b from-[#FAF7F4] to-[#FFE4D2]/40 overflow-hidden ${className}`}>
      <Canvas
        gl={canvasGL}
        dpr={dprClamp}
        camera={{ fov: 45, position: [0, 5, 4] }}
      >
        <PathScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2.4}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}

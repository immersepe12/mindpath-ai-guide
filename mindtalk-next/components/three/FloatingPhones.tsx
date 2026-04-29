'use client'
import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useWebGLAvailable, canvasGL, dprClamp } from './_helpers'

interface PhoneProps {
  position: [number, number, number]
  rotationY: number
  scale: number
  textureUrl: string
  phaseOffset: number
}

function Phone({ position, rotationY, scale, textureUrl, phaseOffset }: PhoneProps) {
  const ref = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, textureUrl)
  // Match colour space so screenshots don't look washed out
  texture.colorSpace = THREE.SRGBColorSpace

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + phaseOffset) * 0.15
  })

  return (
    <group ref={ref} position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Phone body — dark frame */}
      <RoundedBox args={[1.2, 2.4, 0.08]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#1C2433" roughness={0.5} metalness={0.3} />
      </RoundedBox>
      {/* Screen — slightly inset, with texture */}
      <mesh position={[0, 0, 0.041]}>
        <planeGeometry args={[1.1, 2.32]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  )
}

function PhoneGroup() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const targetY = state.pointer.x * 0.08
    const targetX = -state.pointer.y * 0.04
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05
  })

  return (
    <group ref={ref}>
      <Phone
        position={[0, 0, 0]}
        rotationY={-0.1}
        scale={1}
        textureUrl="/screenshots/HomeScreenPolished.png"
        phaseOffset={0}
      />
      <Phone
        position={[-1.7, 0.2, -1]}
        rotationY={0.3}
        scale={0.85}
        textureUrl="/screenshots/JourneysLanding.png"
        phaseOffset={1.5}
      />
      <Phone
        position={[1.7, -0.1, -1]}
        rotationY={-0.3}
        scale={0.85}
        textureUrl="/screenshots/JournalActiveDashboard.png"
        phaseOffset={2.7}
      />
    </group>
  )
}

interface FloatingPhonesProps {
  className?: string
}

export default function FloatingPhones({ className = '' }: FloatingPhonesProps) {
  const webgl = useWebGLAvailable()

  if (webgl === false) {
    // Static fallback — single screenshot with shadow
    return (
      <div className={`relative ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screenshots/HomeScreenPolished.png"
          alt="MindTalk app home screen"
          className="w-full max-w-[280px] mx-auto rounded-3xl shadow-2xl"
        />
      </div>
    )
  }
  if (webgl === null) return null

  return (
    <div className={className}>
      <Canvas gl={canvasGL} dpr={dprClamp} camera={{ fov: 45, position: [0, 0, 5.5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={0.8} />
        <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#F77268" />
        <PhoneGroup />
      </Canvas>
    </div>
  )
}

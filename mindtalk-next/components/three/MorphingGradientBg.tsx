'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWebGLAvailable, canvasGL, dprClamp } from './_helpers'

const VERTEX_SHADER = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Perlin-like simplex noise (small, pragmatic). Result is in [0,1].
const FRAGMENT_SHADER = /* glsl */`
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  // Hash for cheap noise
  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7,  74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // 3D value noise — smooth gradient field
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
            dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
        mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
            dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x),
        u.y),
      mix(
        mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
            dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
        mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
            dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x),
        u.y),
      u.z) * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.06;
    float n1 = noise(vec3(uv * 2.0, t));
    float n2 = noise(vec3(uv * 3.5 + 12.34, t * 0.7));
    vec3 c = mix(uColorC, uColorA, smoothstep(0.2, 0.7, n1));
    c = mix(c, uColorB, smoothstep(0.3, 0.8, n2));
    gl_FragColor = vec4(c, 1.0);
  }
`

function GradientPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#F77268') }, // coral
      uColorB: { value: new THREE.Color('#F97316') }, // orange
      uColorC: { value: new THREE.Color('#1C2433') }, // ink
    }),
    [],
  )
  useFrame((state) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <mesh>
      <planeGeometry args={[20, 14]} />
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
      />
    </mesh>
  )
}

interface MorphingGradientBgProps {
  className?: string
  /** Multiplier for the canvas opacity (0..1). Default 0.6 per design spec. */
  opacity?: number
}

export default function MorphingGradientBg({
  className = '',
  opacity = 0.6,
}: MorphingGradientBgProps) {
  const webgl = useWebGLAvailable()

  if (webgl === false) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-[#1C2433] via-[#F77268]/40 to-[#F97316]/30 ${className}`}
        aria-hidden
      />
    )
  }
  if (webgl === null) return null

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <Canvas
        gl={canvasGL}
        dpr={dprClamp}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
      >
        <GradientPlane />
      </Canvas>
    </div>
  )
}

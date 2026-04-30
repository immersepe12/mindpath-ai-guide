// Centralised dynamic imports for all Three.js scenes.
// SSR is disabled because WebGL doesn't run on the server, and a sensible
// CSS-only fallback shows during the brief mount window so the layout
// doesn't shift when the canvas hydrates.
'use client'
import dynamic from 'next/dynamic'

export const HeroParticles = dynamic(
  () => import('./HeroParticles'),
  { ssr: false, loading: () => null },
)

export const BreathingOrb = dynamic(
  () => import('./BreathingOrb'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] rounded-2xl bg-gradient-to-br from-[#FFE4D2] to-[#FAF7F4]" />
    ),
  },
)

export const JourneyPath3D = dynamic(
  () => import('./JourneyPath3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] rounded-2xl bg-[#FAF7F4]" />
    ),
  },
)

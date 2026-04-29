'use client'
import { useEffect, useState } from 'react'

/**
 * Returns true once the component has mounted on the client. Three.js
 * components dynamic-imported with ssr:false still hydrate after the
 * initial paint — this lets us hold off the WebGL canvas for one tick
 * and avoid flashing.
 */
export function useClientReady(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  return ready
}

/** Cheap reactive viewport-size hook. */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [breakpoint])
  return isMobile
}

/** Detect WebGL availability. Returns null while detecting, then bool. */
export function useWebGLAvailable(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      setAvailable(!!gl)
    } catch {
      setAvailable(false)
    }
  }, [])
  return available
}

/** Sensible Canvas defaults for performance: clamp pixel ratio, alpha on. */
export const canvasGL = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as const,
}

export const dprClamp: [number, number] = [1, 2]

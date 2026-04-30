import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E8521A',
          'orange-light': '#F07040',
          'orange-dark': '#C43D0A',
        },
        surface: {
          cream: '#FDF8F4',
          warm: '#F9F1EA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blob-drift-1': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px,15px) scale(0.97)' },
        },
        'blob-drift-2': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(20px,30px) scale(1.08)' },
        },
        'blob-drift-3': {
          '0%, 100%': { transform: 'translate(-50%,0) scale(1)' },
          '50%': { transform: 'translate(-45%,-20px) scale(1.03)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'blob-1': 'blob-drift-1 12s ease-in-out infinite',
        'blob-2': 'blob-drift-2 16s ease-in-out infinite',
        'blob-3': 'blob-drift-3 10s ease-in-out infinite',
      },
    },
  },
  plugins: [animatePlugin],
}

export default config

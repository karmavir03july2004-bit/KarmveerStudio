import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          50: '#050505',
          100: '#080808',
          200: '#0D0D0D',
          300: '#111111',
          400: '#1a1a1a',
          500: '#222222',
        },
        accent: {
          violet: '#8b5cf6',
          blue: '#3b82f6',
          magenta: '#ec4899',
        },
        gradient: {
          start: '#0a0a0f',
          mid: '#0f0f1a',
          end: '#050508',
        },
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #050508 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 30% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        'gradient-cta': 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(236, 72, 153, 0.2) 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'gradient-x': 'gradientX 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradientX: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

export default config

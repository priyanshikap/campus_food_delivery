/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14181F',
          soft: '#1E2430',
          faint: '#4B5567',
        },
        paper: {
          DEFAULT: '#F7F5EF',
          dim: '#EFEBE0',
        },
        brass: {
          DEFAULT: '#C9A227',
          light: '#E4C255',
          dark: '#8F7318',
        },
        pine: {
          DEFAULT: '#2F6B4F',
          light: '#DCEBE2',
        },
        rust: {
          DEFAULT: '#B8522F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'ticket-fade': 'linear-gradient(135deg, #1E2430 0%, #14181F 60%)',
        'paper-glow': 'radial-gradient(120% 120% at 50% -10%, #ffffff 0%, #F7F5EF 55%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,24,31,0.04), 0 8px 24px -8px rgba(20,24,31,0.12)',
        'card-hover': '0 4px 8px rgba(20,24,31,0.06), 0 16px 32px -12px rgba(20,24,31,0.2)',
        ticket: '0 20px 50px -20px rgba(20,24,31,0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

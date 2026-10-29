/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#05060A',
          card: '#090B11',
          panel: '#0D111A',
          border: 'rgba(255, 255, 255, 0.08)',
          cyan: '#00F0FF',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E'
        }
      },
      fontFamily: {
        brand: ['Unbounded', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'glass-inner-subtle': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'cyan-glow': '0 0 35px -5px rgba(0, 240, 255, 0.35)',
        'purple-glow': '0 0 40px -5px rgba(139, 92, 246, 0.45)',
        'amber-glow': '0 0 35px -5px rgba(245, 158, 11, 0.35)',
        'neon-card': '0 20px 50px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(139, 92, 246, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};

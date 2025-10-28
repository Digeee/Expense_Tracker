/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-display': ['Playfair Display', 'serif'],
        'serif-body': ['Merriweather', 'serif'],
        'serif-heading': ['Cormorant Garamond', 'serif'],
        'serif-text': ['Crimson Text', 'serif'],
        'display': ['Playfair Display', 'serif'],
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'extrabold': '800',
        'black': '900',
      },
      colors: {
        'elegant-dark': '#1a202c',
        'elegant-darker': '#0f172a',
        'elegant-light': '#f8fafc',
        'elegant-gold': '#d4af37',
        'elegant-silver': '#c0c0c0',
        'elegant-burgundy': '#800020',
        'elegant-forest': '#228B22',
        'elegant-navy': '#000080',
        'elegant-plum': '#8e44ad',
      },
      boxShadow: {
        'elegant': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elegant-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elegant-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3d': '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
        '3d-inset': 'inset 4px 4px 8px #d9d9d9, inset -4px -4px 8px #ffffff',
        '3d-dark': '8px 8px 16px #0a0d12, -8px -8px 16px #1d232d',
        '3d-inset-dark': 'inset 4px 4px 8px #0a0d12, inset -4px -4px 8px #1d232d',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      keyframes: {
        'rotate-3d': {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)' },
        }
      },
      animation: {
        'rotate-3d': 'rotate-3d 20s linear infinite',
      },
      backgroundImage: {
        'elegant-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'elegant-gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 100%)',
        'elegant-plum-gradient': 'linear-gradient(135deg, #8e44ad 0%, #3498db 100%)',
        'neumorphic-light': 'linear-gradient(145deg, #e6e6e6, #ffffff)',
        'neumorphic-dark': 'linear-gradient(145deg, #0d1117, #1a1f27)',
      }
    },
  },
  plugins: [],
}
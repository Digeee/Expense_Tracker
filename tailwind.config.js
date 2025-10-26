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
      },
      backgroundImage: {
        'elegant-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'elegant-gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f3e5ab 100%)',
        'elegant-plum-gradient': 'linear-gradient(135deg, #8e44ad 0%, #3498db 100%)',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pure-white': '#FFFFFF',
        'rich-black': '#0B0F19',
        'dark-navy': '#111827',
        'soft-gray': '#9CA3AF',
        'accent-blue': '#3B82F6',
        'glass-white': 'rgba(255, 255, 255, 0.08)',
        'glass-hover': 'rgba(255, 255, 255, 0.12)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(59, 130, 246, 0.2)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        hover: '0 12px 48px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

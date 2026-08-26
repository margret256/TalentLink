/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B3FD4',
        secondary: '#6C4CF5',
        navy: '#101B35',
        bg: '#F7F8FC',
        maintext: '#1F2937',
        subtext: '#6B7280',
        border: '#E5E7EB',
        lightpurple: '#F1EEFF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 27, 53, 0.06), 0 1px 2px rgba(16, 27, 53, 0.04)',
        soft: '0 8px 24px rgba(91, 63, 212, 0.08)',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #5B3FD4, #6C4CF5)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

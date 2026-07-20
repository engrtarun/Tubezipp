/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0f0f11',
          surface: '#1c1c21',
          light: '#2a2a32',
        },
        primary: {
          orange: '#FF7139',
          'orange-dark': '#FF3B00',
          violet: '#9059FF',
          'violet-dark': '#6200EE',
        },
        text: {
          main: '#F9F9FB',
          muted: '#A2A2A8',
        },
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF7139, #FF3B00)',
        'gradient-violet': 'linear-gradient(135deg, #9059FF, #6200EE)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

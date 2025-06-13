/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F80ED',
        secondary: '#27AE60',
        accent: '#FFC107',
        neutral: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          800: '#424242',
        }
      },
      fontFamily: {
        'noto': ['Noto Sans JP', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem', // 72px
        '20': '5rem',   // 80px
        '14': '3.5rem', // 56px
      },
      borderRadius: {
        'DEFAULT': '8px',
      },
      boxShadow: {
        'elevation-2': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'elevation-4': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gap: {
        '5': '1.25rem', // 20px
      }
    },
  },
  plugins: [],
} 
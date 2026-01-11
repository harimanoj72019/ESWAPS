/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff41', // Matrix/Neon Green
        secondary: '#0a0a0a', // Dark Gray/Black
        accent: '#0d1117', // GitHub Dark Dimmed
        'neon-green': '#39ff14',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

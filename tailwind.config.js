/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#6366f1', // Primary purple
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      fontFamily: {
        'heebo': ['Heebo_400Regular', 'system-ui'],
        'heebo-medium': ['Heebo_500Medium', 'system-ui'],
        'heebo-bold': ['Heebo_700Bold', 'system-ui'],
      },
    },
  },
  plugins: [],
};
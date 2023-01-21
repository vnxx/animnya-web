/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#070725',
        'secondary': '#30304B',
        'secondary-hover': '#26263C',
        'main-white': '#8B8CA3',
        'main-red': '#E4182B',
        'main-red-hover': '#A81220'
      },
      minHeight: {
        'main-screen': 'calc(100vh - 127px)'
      }
    },
  },
  plugins: [],
}

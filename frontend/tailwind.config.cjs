/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {
      sm: { max: "576px" },
      md: { max: '768px' },
      lg: { max: '992px' }
    },

    extend: {
      colors: {
        primaryBg: '#F6F6F6',
        primaryText: '#331C20',
      }
    },
  },
  plugins: [],
}

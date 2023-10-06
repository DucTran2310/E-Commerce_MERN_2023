/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131'
      },
      color: {
        main: '#ee3131'
      }
    },
  },
  plugins: [],
}
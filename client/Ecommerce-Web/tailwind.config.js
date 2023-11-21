/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    }, 
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131',
        overlay: 'rgba(0,0,0,0.3)'
      },
      colors: {
        main: '#ee3131'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            transform: 'translateY(40px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'fadeIn': 'fadeIn 0.3s both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')
  ],
};
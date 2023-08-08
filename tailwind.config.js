/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',

  theme: {
    colors: {
      green: '#1FC796',
      yellow: '#F2BC53',
      blue: '#5D79CA',
      dark: '#14223C',
      red: '#FF375B',
      gray: '#ececec',
      white: '#ffffff',
      whiteInherit: '#ffffff1d',
      black: '#000',
      blueLighter: '#1d3a70',
    },
    screens: {},
    fontFamily: {
      play: ['Play', 'sans-serif'],
    },

    extend: {},
  },
  plugins: [],
};

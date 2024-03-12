/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        basic: '#004d5a',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

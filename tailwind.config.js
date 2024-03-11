/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};

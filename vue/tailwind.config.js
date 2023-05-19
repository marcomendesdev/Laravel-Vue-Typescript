/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), 
    require('@tailwindcss/forms')
  ]
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./react-frontend/src/**/*.{js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

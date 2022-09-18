/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Mono'],
        sans: ['Inter']
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- ESSA LINHA É A MAIS IMPORTANTE
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
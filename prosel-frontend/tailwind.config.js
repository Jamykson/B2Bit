/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que o Tailwind olhe seus arquivos
  ],
  theme: {
    extend: {
      colors: {
        'b2bit-blue': '#0070f3', // Exemplo de cor, ajuste se necessário
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Define 'Inter' como a fonte padrão para o projeto
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      // Suas cores customizadas
      colors: {
        'b2bit-blue': '#002D62',
        'b2bit-yellow': '#FDCF00'
      },
      // Sua sombra customizada
      boxShadow: {
        'b2bit-card': '0 30px 60px rgba(2,20,40,0.10), 0 6px 20px rgba(2,20,40,0.06)'
      },
      // Seu border-radius customizado
      borderRadius: {
        'xl-2': '18px'
      }
    }
  },
  plugins: [],
}
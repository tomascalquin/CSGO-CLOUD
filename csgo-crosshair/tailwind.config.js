/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cs: {
          yellow: '#eab308',     // Amarillo principal
          yellowHover: '#ca8a04',
          dark: '#0f172a',       // Fondo oscuro
          card: '#1e293b',       // Fondo tarjetas
          border: '#334155',     // Bordes
          text: '#f8fafc',       // Texto blanco
          muted: '#94a3b8'       // Texto gris
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
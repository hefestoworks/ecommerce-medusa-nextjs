import type { Config } from 'tailwindcss'

const config: Config = {
  // Aquí le decimos a Tailwind que escanee todos los archivos en estas carpetas
  // en busca de clases de utilidad.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Aquí puedes extender el tema de Tailwind si lo necesitas en el futuro.
    },
  },
  plugins: [],
}
export default config
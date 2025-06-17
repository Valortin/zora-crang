/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zora-bg': '#1a202c',
        'zora-accent': '#ff4d4f',
        'zora-secondary': '#4a5568',
      },
    },
  },
  plugins: [],
}
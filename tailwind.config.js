/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xss: 9,
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out 0.3s',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translate(0)'
          },
          '25%': {
            transform: 'translate(-0.5rem)'
          },
          '75%': {
            transform: 'translate(0.5rem)'
          },
          '100%': {
            transform: 'translate(0)'
          },
        }
      }
    },
  },
  plugins: [],
}
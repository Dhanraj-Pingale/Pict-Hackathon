/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customDark: '#14191F', 
        customDarker: '#0D1116',
        customGreen: '#29A080'
      },
    },
  },
  plugins: [daisyui],
}

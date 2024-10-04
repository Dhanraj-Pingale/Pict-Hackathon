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
        customGreen: '#29A080',
        customGreenHover: '#008f84'
      },
      animation: {
        'slow-spin': 'spin 2s linear infinite',  // Slow spinning
        'floating-slow': 'floating 3s ease-in-out infinite', // Floating effect
        'scale-float': 'scaleFloat 4s ease-in-out infinite', // Scaling and floating combo
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        scaleFloat: {
          '0%, 100%': { transform: 'scale(1) translateY(0px)' },
          '50%': { transform: 'scale(1.1) translateY(-10px)' },
        },
      },
    },
  },
  plugins: [daisyui],
}

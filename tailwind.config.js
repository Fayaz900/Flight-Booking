/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      animation: {
        'scroll-left': 'scrollLeft 40s linear infinite',
        scrollText: 'scrollText 10s linear infinite',
      },
       keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
         scrollText: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      colors: {
        'brand-orange': '#ff5000',
      },
       fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
    
  },
}
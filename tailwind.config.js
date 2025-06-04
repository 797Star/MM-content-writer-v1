/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#b9ddfe',
          300: '#7cc2fd',
          400: '#36a5fa',
          500: '#0c87eb',
          600: '#0068c9',
          700: '#0054a3',
          800: '#004786',
          900: '#003d70',
        },
        secondary: {
          50: '#f0fdfd',
          100: '#ccf7f6',
          200: '#99ecea',
          300: '#66e0de',
          400: '#20b2aa',
          500: '#17a19a',
          600: '#0f8f89',
          700: '#0b7a75',
          800: '#096561',
          900: '#085250',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
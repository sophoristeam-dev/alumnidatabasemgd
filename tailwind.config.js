/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#1a1512', paper: '#f3eee5', wine: '#3a0a17', gold: '#c6a560' },
      fontFamily: {
        display: ['Garamond', 'Times New Roman', 'serif'],
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

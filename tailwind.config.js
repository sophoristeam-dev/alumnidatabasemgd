/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7B1F3A',
          dk: '#4E0E22',
          lt: '#A8385A',
        },
        gold: {
          DEFAULT: '#C9922C',
          lt: '#F0C060',
          bg: '#FDF4E3',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dk: '#F0EBE2',
        },
        ink: {
          DEFAULT: '#1C1410',
          2: '#5A4A42',
          3: '#9A8880',
        },
        brand: {
          blue: '#1A5CB5',
          'blue-bg': '#E8F0FB',
          green: '#1A6B42',
          'green-bg': '#E5F4ED',
          teal: '#126B6B',
          'teal-bg': '#E4F3F3',
          amber: '#9A5B0A',
          'amber-bg': '#FEF3DC',
          red: '#A82020',
          'red-bg': '#FDEAEA',
          purple: '#5B2D8E',
          'purple-bg': '#EEE8F8',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(78,14,34,0.08), 0 1px 2px rgba(78,14,34,0.04)',
      },
    },
  },
  plugins: [],
};

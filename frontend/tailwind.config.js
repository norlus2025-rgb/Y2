module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fdf8f5',
          100: '#faf0ec',
          200: '#f5e1d8',
          300: '#efc9bd',
          400: '#e8a891',
          500: '#d67c3e',
          600: '#c66730',
          700: '#a24b1f',
          800: '#7d361a',
          900: '#5a2515',
        },
        warm: {
          50: '#fffbf5',
          100: '#fef7eb',
          200: '#fde5c9',
          300: '#fcd0a3',
          400: '#f9b373',
          500: '#f59840',
          600: '#e6812a',
          700: '#c96e1a',
          800: '#a55915',
          900: '#7d4410',
        },
      },
    },
  },
  plugins: [],
};

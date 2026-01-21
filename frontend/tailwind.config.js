/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fef6f1',
          100: '#fde9dd',
          200: '#fad0ba',
          300: '#f6ad8d',
          400: '#f1845e',
          500: '#ed663a',
          600: '#de4d28',
          700: '#b93b1f',
          800: '#943320',
          900: '#772d1e',
        },
        warm: {
          50: '#fffbf5',
          100: '#fef5e7',
          200: '#fde8c4',
          300: '#fbd89d',
          400: '#f9c574',
          500: '#f7b24d',
          600: '#f59840',
          700: '#e17b2a',
          800: '#c86525',
          900: '#a95421',
        },
      },
    },
  },
  plugins: [],
};

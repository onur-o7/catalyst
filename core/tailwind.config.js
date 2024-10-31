/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '!./node_modules/**', // Exclude everything in node_modules to speed up builds
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        body: 'hsl(var(--color-body))',
        primary: 'hsl(var(--color-primary))',
        secondary: 'hsl(var(--color-secondary))',
        white: '#FFFFFF',
        error: {
          DEFAULT: '#ab3030',
          secondary: '#C62828',
        },
        success: {
          DEFAULT: '#146622',
          secondary: '#388E3C',
        },
        turq: {
          dark: '#348d8b',
          DEFAULT: '#61c5c3',
        },
        gray: {
          100: '#f7f7f7',
          200: '#f2f3f8',
          300: '#AFBAC5',
          400: '#90A4AE',
          500: '#546E7A',
          600: '#091D45',
        },
      },
      fontFamily: {
        sans: ['var(--ff-gotham)'],
        display: ['var(--ff-butler)'],
      },
      borderColor: {
        DEFAULT: '#CFD8DC',
      },
      keyframes: {
        revealVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        revealVertical: 'revealVertical 400ms forwards cubic-bezier(0, 1, 0.25, 1)',
      },
      gridTemplateColumns: {
        avatar: '48px auto',
      },
    },
  },

  plugins: [
    // @ts-ignore

    require('tailwindcss-radix')(),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
};

module.exports = config;

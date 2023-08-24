/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      colors: {
        pizza: '#123456'
      },
      fontSize: {
        huge: ["8rem", {lineHeight: '2'}]
      },
      height: {
        screen: '100dvh',
      }

    },
  },
  plugins: [],
};

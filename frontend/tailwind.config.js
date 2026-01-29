/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FC602E',
        secondary: '#FF7A4D',
        accent: '#EC1313',
        dark: {
          DEFAULT: '#101318',
          card: '#191D24',
          border: '#2B303B',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#8F96A3',
          muted: '#6D6C6B',
        }
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

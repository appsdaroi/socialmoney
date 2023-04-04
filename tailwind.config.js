/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#701D2B',
          300: '#B02E43',
          400: '#D63852',
          500: '#EF3E5B',
          600: '#FC4261',
        },
        offwhite: "#FAFAFA"
      }
    },
  },
  plugins: [],
}
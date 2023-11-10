/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#2c2c2c",
        "bgWhite": "#f9f9f9",
        "palepink": "#decade",
      },
      fontFamily: {
        "roboto": "Roboto"
      }
    },
  },
  plugins: [],
}


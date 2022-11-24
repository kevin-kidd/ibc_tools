/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '17': '4.25rem',
        '68': '68px'
      },
      colors: {
        "lightblue": "#85f0ff",
        "lightgreen": "#85ff89",
        "lightyellow": "#fff985",
        "lightpink": "#ffabfe"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}

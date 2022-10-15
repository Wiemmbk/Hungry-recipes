/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./node_modules/flowbite/*/.js", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "beige": "#D2B48C",
        "beige2": "#DEB887",
        "brown": "#8B4513",
        "gris":"#F5F5F5", 
        "green":"#69623B",
        "brown2":"#e5d8d0",
        "seashell":"#FFF5EE",
        "brown3":"#f1eee9",
        "bg":"#f8f8f6" 
  },
  plugins: [require('@themesberg/flowbite/plugin.js')],
}}}

const colors = require("./src/styles/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

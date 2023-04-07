const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.zinc,
      },
    },
  },
  plugins: [],
};
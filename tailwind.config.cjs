/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        "letter-height": "279mm",
        "letter-width": "216mm",
        "one-inch": "25mm",
        minus40px: "-40px",
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};

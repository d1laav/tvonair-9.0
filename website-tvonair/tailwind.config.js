/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#68a3b8",
        customYellow: "#fff57a",
        customDarkBlue: "#10273d",
        customTurqoise: "#40E0D0",
      },
      backgroundImage: (theme) => ({
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      }),
    },
    variants: {
      extend: {
        backgroundImage: ["hover", "focus"],
      },
    },
    fontFamily: {
      forNavbar: ["Work Sans", "sans-serif"],
      forContent: ["Montserrat", "sans-serif"],
      forFooter: ["Libre Franklin", "sans-serif"],
      forTba: ["Fredoka", "sans-serif"],
    },
  },
  plugins: [],
};
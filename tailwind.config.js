/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#D0BCFE",
          "on-primary": "#381E72",
          "primary-container": "#381E72",
          "on-primary-container": "#EADDFF",
          secondary: "#CCC2DC",
          "on-secondary": "#332D41",
          "secondary-container": "#4A4458",
          "on-secondary-container": "#E8DEF8",
          background: "#141218",
          "on-background": "#E6E0E9",
          surface: "#141218",
          "on-surface": "#E6E0E9",
          "inverse-surface": "#E6E0E9",
          "inverse-on-surface": "#322F35",
          "inverse-primary": "#6750A4",
          "surface-bright": "#3B383E",
          "on-surface-variant": "#CAC4D0",
          outline: "#938F99",
          "outline-variant": "#49454F",
          black: "#000000",
          "section-background": "#F5F5F5",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};

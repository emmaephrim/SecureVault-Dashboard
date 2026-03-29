/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#00FFFF",
          dark: "#000000",
          light: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};

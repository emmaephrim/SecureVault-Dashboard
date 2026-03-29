/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        // Primary)
        "headline-sm": ["24px", { lineHeight: "32px", letterSpacing: "0", fontWeight: "400" }],
        "title-lg": ["22px", { lineHeight: "28px", letterSpacing: "0", fontWeight: "400" }],
        "title-md": ["16px", { lineHeight: "24px", letterSpacing: "0.15px", fontWeight: "500" }],
        "title-sm": ["14px", { lineHeight: "20px", letterSpacing: "0.1px", fontWeight: "500" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.1px", fontWeight: "500" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.5px", fontWeight: "500" }],
        "label-sm": ["11px", { lineHeight: "16px", letterSpacing: "0.5px", fontWeight: "500" }],
        "body-lg": ["16px", { lineHeight: "24px", letterSpacing: "0.5px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", letterSpacing: "0.25px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.4px", fontWeight: "400" }],

        // Emphasis
        "headline-sm-emph": ["24px", { lineHeight: "32px", letterSpacing: "0", fontWeight: "500" }],
        "title-lg-emph": ["22px", { lineHeight: "28px", letterSpacing: "0", fontWeight: "500" }],
        "title-md-emph": ["16px", { lineHeight: "24px", letterSpacing: "0.15px", fontWeight: "700" }],
        "title-sm-emph": ["14px", { lineHeight: "20px", letterSpacing: "0.1px", fontWeight: "700" }],
        "label-lg-emph": ["14px", { lineHeight: "20px", letterSpacing: "0.1px", fontWeight: "700" }],
        "label-md-emph": ["12px", { lineHeight: "16px", letterSpacing: "0.5px", fontWeight: "700" }],
        "label-sm-emph": ["11px", { lineHeight: "16px", letterSpacing: "0.5px", fontWeight: "700" }],
        "body-lg-emph": ["16px", { lineHeight: "24px", letterSpacing: "0.5px", fontWeight: "500" }],
        "body-md-emph": ["14px", { lineHeight: "20px", letterSpacing: "0.25px", fontWeight: "500" }],
        "body-sm-emph": ["12px", { lineHeight: "16px", letterSpacing: "0.4px", fontWeight: "500" }],
      },

      colors: {
        // Colors
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

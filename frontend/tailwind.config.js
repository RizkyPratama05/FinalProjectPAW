/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        primary: "#2563eb",              // biru
        "primary-foreground": "#ffffff", // putih
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        fadeOut: "fadeOut 0.2s ease-in forwards",
      },
    },
  },
  plugins: [],
};

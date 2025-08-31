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
    },
  },
};


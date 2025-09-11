/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // add other paths if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // <-- add this line
};

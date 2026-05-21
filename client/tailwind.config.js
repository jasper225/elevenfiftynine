/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#e6f0ff",
          100: "#c0d8ff",
          500: "#0052cc",
          600: "#003f9e",
          700: "#002d72",
        },
      },
    },
  },
  plugins: [],
};

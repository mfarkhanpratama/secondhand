/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your React files
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: "#768C97", // Your background color
        customText: "#FCFCFB", // Your text color
      },
    },
  },
  plugins: [],
};

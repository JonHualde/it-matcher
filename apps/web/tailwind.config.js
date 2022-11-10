module.exports = {
  ...require("../../packages/shared/tailwind.config"),
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      // Add your custom fonts and enjoy.
      oswald: ["Oswald", "Sans-serif"],
    },
    colors: {
      "pastel-light": "#DFE0F2",
      pastel: "#8F9AD9",
      "pastel-dark": "#0634BF",
      "blue-dimmed": "#4973F2",
      "blue-ocean": "#0634BF",
      "blue-purple": "#5F7ED9",
      white: "#ffffff",
      "gray-200": "#e5e7eb",
      "gray-400": "rgb(148 163 184)",
      "light-red": "#f87171",
      red: "#dc2626",
      "dark-red": "#991b1b",
      "status-light-red": "#FFC6BE",
      "status-red": "#DF0000",
      "status-light-green": "#C0F889",
      "status-green": "#2E992C",
      "status-yellow": "#F1A002",
      "status-light-yellow": "#FFEF62",
    },
  },
  plugins: [],
};

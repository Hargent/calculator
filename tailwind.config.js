/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        "theme-1": {
          primary: "rgba(50, 30, 0, 0.8)",
          accent_button: "#ff9f0c",
          button: "rgba(152.40000000000006, 254, 0, 0.8)",
          secondary_button: "rgba(91.20000000000002, 152, 0, 0.8)",
          textColor: "white"
        },
        // Dark theme colors
        "theme-2": {
          primary: "rgba(0, 0, 0, 0.5)",
          accent_button: "#cc0000",
          button: "rgba(102, 102, 102, 0.5)",
          secondary_button: "rgba(51, 51, 51, 0.5)",
          textColor: "black"
        }
      }
    }
  },
  plugins: []
};

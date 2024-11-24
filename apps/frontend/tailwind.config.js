/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#FFFFE6",
        "secondary-background": "#F9EEA1",
        green: "#34A853",
        "green-border": "#0C931A",
        red: "#FE1A2C",
        "red-border": "#FE1A2C",
        gray: "#D9D9D9",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

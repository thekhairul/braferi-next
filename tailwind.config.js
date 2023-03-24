module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#ffffff",
        dark: "#374151",
        brand: "#DB7D76",
        "brand-dark": "#c5706a",
        accent: "#7C3AEF",
        "accent-dark": "#5B21B6",
      },
      fontFamily: {
        heading: ["Lora", "serif"],
        body: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
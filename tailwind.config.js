module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#ffffff",
        dark: "#374151",
        brand: "#E35B64",
        "brand-dark": "#c5706a",
        accent: "#2F3132",
        "accent-dark": "#000000",
      },
      fontFamily: {
        heading: ["Lora", "serif"],
        body: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
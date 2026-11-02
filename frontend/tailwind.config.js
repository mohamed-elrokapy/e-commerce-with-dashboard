/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#FAF5EC", 2: "#F3EBDC", 3: "#EADFC9" },
        ink: { DEFAULT: "#2A1B12", soft: "#5B4A3E", faint: "#7D6B5E" },
        line: { DEFAULT: "#E3D7C2", strong: "#CDBD9F" },
        syrup: { DEFAULT: "#A8461A", dark: "#8A3611", tint: "#F6E3D6" },
        leaf: { DEFAULT: "#2F6B3F", tint: "#E1EFE3" },
        berry: { DEFAULT: "#B3261E", tint: "#F8E1DF" },
        amber: { tint: "#FBEFD0", ink: "#7A5200" },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', '"Noto Sans Arabic Variable"', "Georgia", "serif"],
        sans: ['"Inter Variable"', '"Noto Sans Arabic Variable"', "system-ui", "sans-serif"],
      },
      borderRadius: { md: "10px", lg: "16px", xl: "22px" },
      boxShadow: {
        card: "0 1px 2px rgba(42,27,18,0.06), 0 6px 20px -8px rgba(42,27,18,0.12)",
        pop: "0 12px 40px -12px rgba(42,27,18,0.35)",
      },
    },
  },
  plugins: [],
};

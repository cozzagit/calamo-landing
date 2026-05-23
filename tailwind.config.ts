import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Editorial palette di Calamo (stessa dell'app desktop)
        paper: "#f5f1e8",
        "paper-deep": "#ebe3d0",
        ink: "#1c1a17",
        leather: "#7a6448",
        "leather-deep": "#5a4a35",
        brass: "#b89968",
        "brass-light": "#cdac7c",
        redmark: "#8b2c1f",
      },
      fontFamily: {
        serif: [
          "'Cormorant Garamond'",
          "'EB Garamond'",
          "Georgia",
          "serif",
        ],
        body: [
          "'Source Serif 4'",
          "'Source Serif Pro'",
          "Georgia",
          "serif",
        ],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.025em",
        ultra: "0.35em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "draw-ring": "drawRing 1.2s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drawRing: {
          "0%": {
            strokeDasharray: "339",
            strokeDashoffset: "339",
            opacity: "0.4",
          },
          "100%": {
            strokeDasharray: "339",
            strokeDashoffset: "0",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

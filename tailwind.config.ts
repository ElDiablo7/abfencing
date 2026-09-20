import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A7B",
          light: "#2B4FA3",
          dark: "#152C5E",
          50: "#E8EEF8",
          100: "#C5D3EC",
          200: "#9EB5DE",
          300: "#7497D0",
          400: "#4A79C2",
          500: "#2B4FA3",
          600: "#1E3A7B",
          700: "#152C5E",
          800: "#0D1E41",
          900: "#061024",
        },
        accent: {
          DEFAULT: "#D4A843",
          light: "#E3C16F",
          dark: "#B8922F",
          50: "#FBF5E6",
          100: "#F5E7C0",
          200: "#EDD896",
          300: "#E3C16F",
          400: "#D4A843",
          500: "#B8922F",
          600: "#967623",
          700: "#735A1A",
          800: "#503E12",
          900: "#2D230A",
        },
        charcoal: "#1C1C1C",
        slate: {
          light: "#F8F9FA",
          DEFAULT: "#6C757D",
          dark: "#343A40",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #1E3A7B 0%, #2B4FA3 50%, #152C5E 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #D4A843 0%, #B8922F 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

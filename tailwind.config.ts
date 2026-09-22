import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        acorn: "var(--font-acorn)",
        ibm: "var(--font-ibm)",
        thmanyah: "var(--font-thmanyah)",
      },
      // Channels live in globals.css and flip under [data-theme="light"], so
      // `white` is the ink and `gray` the ground in either theme.
      colors: {
        white: "rgb(var(--c-white) / <alpha-value>)",
        primary: "rgb(var(--c-primary) / <alpha-value>)",
        secondary: "rgb(var(--c-secondary) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        ice: "rgb(var(--c-ice) / <alpha-value>)",
        accent: {
          1: "rgb(var(--c-accent-1) / <alpha-value>)",
          2: "rgb(var(--c-accent-2) / <alpha-value>)",
        },
        "on-accent": "rgb(var(--c-on-accent) / <alpha-value>)",
        // The hero's ground (#080f13) as gray-900, with its teal-tinted
        // neighbours, so every section sits on the hero's colour.
        gray: {
          600: "rgb(var(--c-gray-600) / <alpha-value>)",
          700: "rgb(var(--c-gray-700) / <alpha-value>)",
          800: "rgb(var(--c-gray-800) / <alpha-value>)",
          900: "rgb(var(--c-gray-900) / <alpha-value>)",
          950: "rgb(var(--c-gray-950) / <alpha-value>)",
        },
      },
      rotate: {
        "225": "225deg",
      },
      animation: {
        "ping-large": "ping-large 1s ease-in-out infinite",
        "move-left": "move-left 1s linear infinite",
        "move-right": "move-right 1s linear infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        "ping-large": {
          "75%, 100%": {
            transform: "scale(3)",
            opacity: "0",
          },
        },
        "move-left": {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        "move-right": {
          "0%": {
            transform: "translateX(-50%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", ':is([data-theme="light"] &)');
    }),
  ],
};
export default config;

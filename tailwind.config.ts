import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "4xl": { max: "2699px" },
      "3xl": { max: "1750px" },
      "2xl": { max: "1535px" },
      xl: { max: "1200px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    extend: {
      colors: {
        primary: "#A3F5AA",
        secondary: "#333333",
        tertiary: "#474747",
        success: "#B4F9BA",
        "fuse-black": "#1A1A1A",
        "carbon-gray": "#5A5A5A",
        "oslo-gray": "#8E8E8E",
        "ironside-gray": "#606060",
        "smokey-gray": "#6F6F6F",
        "gray-cloud": "#B6B6B6",
        "gray-goose": "#D0D0D0",
        "pale-slate": "#BFBFBF",
        "storm-dust": "#636363",
        "monsoon": "#868686",
        "star-dust": "#9C9C9C"
      },
      fontFamily: {
        mona: ["var(--font-mona-sans)"],
        pixeloid: ["var(--font-pixeloid-sans)"],
      },
      spacing: {
        0.5: "0.125rem",
        "1/9": "11.1%",
        "8/9": "88.9%",
        "3/10": "30%",
        "1/10": "10%",
        "9/10": "90%",
      },
      fontSize: {
        "5xl": "2.5rem",
      },
      keyframes: {
        blink: {
          '0%': { 'border-color': 'rgba(255, 255, 255, 1)' },
          '50%': { 'border-color': 'rgba(255, 255, 255, 0.5)' },
          '100%': { 'border-color': 'rgba(255, 255, 255, 1)' },
        }
      },
      animation: {
        'blink-underline': 'blink 1s linear infinite',
      },
      backgroundImage: {
        'radial-gradient-green': "radial-gradient(50% 50% at 50% 50%, rgba(163, 245, 170, 0.15) 0%, rgba(163, 245, 170, 0.00) 100%)",
      }
    },
  },
  plugins: [],
};
export default config;

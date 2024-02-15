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
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    extend: {
      colors: {
        primary: "#A3F5AA",
        secondary: "#333333",
        tertiary: "#474747",
        "carbon-gray": "#5A5A5A",
        "gray-cloud": "#B6B6B6"
      },
      fontFamily: {
        mona: ["var(--font-mona-sans)"],
      },
      spacing: {
        0.5: "0.125rem",
        "1/9": "11.1%",
        "8/9": "88.9%",
        "3/10": "30%",
        "1/10": "10%",
        "9/10": "90%",
      },
    },
  },
  plugins: [],
};
export default config;

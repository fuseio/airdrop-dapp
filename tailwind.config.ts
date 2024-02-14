import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "4xl": { max: "2699px" },
        "3xl": { max: "1750px" },
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
      colors: {
        primary: "#A3F5AA",
        secondary: "#333333",
      },
      fontFamily: {
        mona: ["var(--font-mona-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;

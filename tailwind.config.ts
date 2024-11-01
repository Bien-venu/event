import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#0e8c00",
      secondary: "#fff",
      gray: "#d4d4d5",
      black: "#000000",
      red: "#ff5757",
    },
  },
  plugins: [],
};
export default config;

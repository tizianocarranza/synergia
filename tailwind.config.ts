import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Epilogue", "sans-serif"]
      },
      fontSize: {
        md: "1rem",
        "15xl": "110px"
      },
      colors: {
        brand: "#40E0D0"
      },
      height: {
        "half-screen": "50vh",
        "2/3-screen": "66vh"
      },
      width: {
        "300": "300px",
        "400": "400px"
      },
      minHeight: 
      {
        "half-screen": "50vh",
        "2/3-screen": "66vh"
      }
    },
  },
  plugins: [],
};
export default config;

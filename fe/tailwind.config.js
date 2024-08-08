/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        black30: "rgba(0, 0, 0, 0.3)",
        black40: "rgba(0, 0, 0, 0.4)",
        black100: "rgba(0, 0, 0, 1)",
      },
    },
    colors: {
      "red-1": "#E81212",
      "blue-1": "#1141ED",
      "blue-2": "#0937BC",
      "white-1": "#FFFFFF",
      "black-1": "#000000",
      "grey-1": "#F3F3F3",
      "grey-2": "#CCCCCC",
    },
  },
  plugins: [
    flowbite.content(),
    import("flowbite/plugin"),
    "@tailwindcss/line-clamp",
  ],
};

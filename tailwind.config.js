/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "3px": "3px",
      },
      colors: {
        primary: "#171717",
        secondary: "#272727",
        "dark-subtle": "rgba(255,255,255, 0.5)",
        "light-subtle": "rgba(39,39,39, 0.5)",
        "light-primary": "#ffffff",
        "light-secondary": "rgba(39, 39, 39, 0.03)",
        "light-third": "rgba(39, 39, 39, 0.1)",
        fourth: "#CCCCCC",
        "dark-third": "#303030",
        "dark-secondary": "#121212",
        "dark-primary": "#000000",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0.5: "0.5px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    backdropBrightness: {
      25: ".25",
      50: ".50",
      75: ".75",
      125: ".125",
      200: ".200",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

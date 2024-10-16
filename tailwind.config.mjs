const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./knwon-classes.txt",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B6B",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFE5E5",
          300: "#FFBDBD",
          400: "#FF9494",
          500: "#FF6B6B",
          600: "#FF4747",
          700: "#FF2424",
          800: "#FF0000",
          900: "#DB0000",
          950: "#C90000",
        },
        secondary: {
          DEFAULT: "#FDA575",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFF4EE",
          300: "#FED9C5",
          400: "#FEBF9D",
          500: "#FDA575",
          600: "#FC813E",
          700: "#FB5D06",
          800: "#C74803",
          900: "#903402",
          950: "#742A02",
        },
        tertiary: {
          DEFAULT: "#FADF7F",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFCF5",
          300: "#FDF3CE",
          400: "#FCE9A6",
          500: "#FADF7F",
          600: "#F8D453",
          700: "#F7C927",
          800: "#E6B609",
          900: "#BA9307",
          950: "#A48106",
        },
        dark: "#2C2C2C",
        clear: "#EAEAEA",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "inherit",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    iconsPlugin({
      collections: getIconCollections(["tabler"]),
    }),
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: "hsla(18, 90%, 57%, 1)",
      "primary-light": "hsla(18, 90%, 57%, 0.2)",
      light: "hsla(225, 8%, 91%, 1)",
      dark: "hsla(0, 0%, 9%, 1)",
      "light-blue": "hsla(198, 21%, 88%, 0.54)",
      error: "hsla(3, 100%, 61%, 1)",
      success: "hsla(162, 95%, 41%, 1)",
      white: "#ffffff",
      transparent: "transparent",
      gray: {
        100: "hsl(240deg 11.11% 96.47%)",
        200: "hsla(40, 3%, 60%, 1)",
        300: "hsla(0, 0%, 20%, 1)",
        400: "hsla(0, 0%, 39%, 1)",
        500: "hsla(206, 6%, 45%, 1)",

      },
      yellow: {
        100: "hsla(45, 100%, 98%, 1)",
        200: "",
      },
    },
    extend: {
      backgroundColor: {
        skin: {
          fill: "var(--color-background)",
          input: "var(--color-input-background)",
        },
      },
      textColor: {
        base: "var(--color-text)",
      },
      fontSize: {
        title: ["1.75rem", "2.125rem"],
      },
      fontFamily: {
        futura: ["Futura", "ui-sans-serif", "system-ui"],
      },
    },
    plugins: [],
  },
};

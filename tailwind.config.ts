import theme from "daisyui/src/theming/themes"
import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`,
  ],
  theme: {
    fontFamily: {
      sans: ["IBM Plex Sans Thai", "sans-serif"],
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#a52241",
          secondary: "#ea9860",
          accent: "#1FB2A6",
          neutral: "#191D24",
          "base-100": "#fafafa",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",

          ".btn-primary": {
            color: "#fafafa",
          },
          ".label-text": {
            color: "inherit",
          },
        },
        dark: {
          primary: "#d48a8f",
          secondary: "#f8c5a5",
          accent: "#1FB2A6",
          neutral: "#191D24",
          "base-100": "#121212",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",

          ".btn-primary": {
            color: "#121212",
          },
          ".label-text": {
            color: "#fff",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          montserrat: ["MontserratRegular"],
          montserratThin: ["MontserratThin"],
          montserratExtraLight: ["MontserratExtraLight"],
          montserratLight: ["MontserratLight"],
          montserratMedium: ["MontserratMedium"],
          montserratSemiBold: ["MontserratSemiBold"],
          montserratBold: ["MontserratBold"],
          montserratExtraBold: ["MontserratExtraBold"],
          montserratBlack: ["MontserratBlack"],
        },
      },
      colors: {
        dark: "#1E2336",
        light: "#EAF1F4",
        primary: "#1383F1",
        secondary: "#8205FE",
        highlight: "#50D63B",
        detail: "#F89E1B",
      },
    },
  },
  plugins: [],
}

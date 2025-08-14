/** @type {import('tailwindcss').Config} */
import { COLOR } from "./src/constants/color";
import { FONT } from "./src/constants/font";
import { FONT_SIZE } from "./src/constants/font-size";
import { LINE_HEIGHT } from "./src/constants/line-height";
import { SPACING } from "./src/constants/spacing";
import presets from "nativewind/preset";

module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  presets,
  theme: {
    extend: {
      colors: COLOR,
      fontFamily: FONT,
      fontSize: FONT_SIZE,
      lineHeight: LINE_HEIGHT,
      spacing: SPACING,
    },
    plugins: [],
  },
};

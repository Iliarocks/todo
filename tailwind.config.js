/** @type {import('tailwindcss').Config} */
import { COLOR } from "@/constants/colors";
import { FONT } from "@/constants/font";
import { FONT_SIZE } from "@/constants/font-size";
import { LINE_HEIGHT } from "@/constants/line-height";
import { SPACING } from "@/constants/spacing";

module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
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

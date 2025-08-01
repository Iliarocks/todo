/** @type {import('tailwindcss').Config} */
import colors from "./constants/Colors";
import spacing from "./constants/Spacing";
import fontSize from "./constants/FontSize";
import lineHeight from "./constants/LineHeight";

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      spacing,
      fontSize,
      lineHeight,
      fontFamily: {
        "roboto-mono-md": "RobotoMono-Medium",
        "roboto-mono-bd": "RobotoMono-Bold",
      },
    },
    plugins: [],
  },
};

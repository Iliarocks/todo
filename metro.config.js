import { getDefaultConfig } from "expo/metro-config.js";
import { withNativeWind } from "nativewind/dist/metro/index.js";

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./src/assets/global.css" });

import { getDefaultConfig } from "expo/metro-config.js";
import { withNativeWind } from "nativewind/metro";

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./src/assets/global.css" });

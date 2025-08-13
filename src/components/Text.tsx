import { ReactNode } from "react";
import { Text } from "react-native";

type Type = "title" | "body";
type Style = "primary" | "secondary";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Decoration = "no-underline" | "underline";

interface CustomText {
  type?: Type;
  style?: Style;
  size?: Size;
  decoration?: Decoration;
  children?: ReactNode;
}

export default function CustomText({
  type = "body",
  style = "primary",
  size = "sm",
  decoration = "no-underline",
  children,
}: CustomText) {
  const fontSize = getFontSize(type, size);
  const lineHeight = getLineHeight(type, size);
  const color = getColor(style);
  const font = getFont(type);
  const styles = [fontSize, lineHeight, color, font, decoration];

  return <Text className={styles.join(" ")}>{children}</Text>;
}

function getFontSize(type: Type, size: Size) {
  const fontSizes = {
    title: {
      xs: "text-title-sm",
      sm: "text-title-sm",
      md: "text-title-md",
      lg: "text-title-lg",
      xl: "text-title-xl",
    },
    body: {
      xs: "text-body-xs",
      sm: "text-body-sm",
      md: "text-body-md",
      lg: "text-body-lg",
      xl: "text-body-lg",
    },
  };

  return fontSizes[type][size];
}

function getLineHeight(type: Type, size: Size) {
  const lineHeights = {
    title: {
      sm: "leading-base",
      md: "leading-base",
      lg: "leading-title-lg",
      xl: "leading-title-xl",
    },
    body: {
      sm: "leading-base",
      md: "leading-base",
      lg: "leading-base",
      xl: "leading-base",
    },
  };

  return lineHeights[type][size];
}

function getColor(style: Style) {
  const colors = {
    primary: "text-text-0",
    secondary: "text-text-5",
  };

  return colors[style];
}

function getFont(type: Type) {
  const fonts = {
    title: "font-roboto-mono-bd",
    body: "font-roboto-mono-md",
  };

  return fonts[type];
}

import { Text } from "react-native";

type Style = "title" | "body";
type Color = "primary" | "secondary";
type Size = "sm" | "md" | "lg" | "xl";

export default function CustomText({
  style,
  color,
  size,
  text,
}: {
  style: Style;
  color: Color;
  size: Size;
  text: string;
}) {
  return (
    <Text
      className={`${getFontSize({ style, size })} ${getLineHeight({ style, size })} ${getColor({ color })} ${getFont({ style })} antialiased`}
    >
      {text}
    </Text>
  );
}

function getLineHeight({ style, size }: { style: Style; size: Size }) {
  if (style === "body") return "leading-base";

  switch (size) {
    case "xl":
      return "leading-title-xl";
    case "lg":
      return "leading-title-lg";
    default:
      return "leading-base";
  }
}

function getColor({ color }: { color: Color }) {
  if (color === "primary") return "text-primary-text";

  return "text-secondary-text";
}

function getFont({ style }: { style: Style }) {
  if (style === "title") return "font-roboto-mono-bd";

  return "font-roboto-mono-md";
}

function getFontSize({ style, size }: { style: Style; size: Size }) {
  return `text-${style}-${size}`;
}

import { Pressable } from "react-native";

type Style = "primary" | "secondary" | "tertiary";
type Content = "text" | "icon";
type Icon = "add" | "sell";

interface Button {
  style?: Style;
  content?: Content;
  icon?: string;
  onPress: () => void;
}
export default function Button({
  style = "primary",
  content = "text",
  icon,
  onPress,
}: Button) {
  return <Pressable onPress={onPress}></Pressable>;
}

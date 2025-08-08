import { COLOR } from "@/constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";

type Style = "primary" | "secondary" | "tertiary";
type Icon = "add" | "sell";

interface IconButton {
  style?: Style;
  icon: Icon;
  onPress: () => void;
}
export default function IconButton({
  style = "primary",
  icon,
  onPress,
}: IconButton) {
  const containerStyles = {
    primary: "p-md rounded-xl bg-primary grid place-content-center",
    secondary: "p-sm rounded-xl bg-secondary grid place-content-center",
    tertiary: "pd-sm grid-place-content-center",
  };

  const iconStyles = {
    primary: 24,
    secondary: 16,
    tertiary: 16,
  };

  return (
    <Pressable className={containerStyles[style]} onPress={onPress}>
      <MaterialIcons
        name={icon}
        size={iconStyles[style]}
        color={COLOR["primary-text"]}
      />
    </Pressable>
  );
}

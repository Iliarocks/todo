import Text from "@/components/Text";
import { COLOR } from "@/constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { Pressable } from "react-native";

// --- Text Button ---

interface TextButton {
  onPress: () => void;
  children?: ReactNode;
}
export function TextButton({ onPress, children }: TextButton) {
  const styles = "items-center bg-primary-0 rounded-xs p-md";

  return (
    <Pressable className={styles} onPress={onPress}>
      <Text>{children}</Text>
    </Pressable>
  );
}

// --- Icon Button ---

type Icon = "add" | "sell" | "calendar-month" | "delete";

interface IconButton {
  icon: Icon;
  onPress: () => void;
}
export function IconButton({ icon, onPress }: IconButton) {
  const styles = "p-md rounded-xs bg-primary-0";

  return (
    <Pressable className={styles} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={COLOR["text-0"]} />
    </Pressable>
  );
}

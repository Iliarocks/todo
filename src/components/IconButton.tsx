import { COLOR } from "@/constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";

type Icon = "add" | "sell" | "calendar-month" | "delete";

interface IconButton {
  icon: Icon;
  onPress: () => void;
}
export default function IconButton({ icon, onPress }: IconButton) {
  const styles = "p-md rounded-xs bg-primary-0";

  return (
    <Pressable className={styles} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={COLOR["text-0"]} />
    </Pressable>
  );
}

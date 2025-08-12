import { COLOR } from "@/constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";

type Icon = "add" | "sell" | "calendar-month" | "delete";

interface IconButton {
  icon: Icon;
  onPress: () => void;
}
export default function IconButton({ icon, onPress }: IconButton) {
  const styles = "p-md bg-primary grid place-content-center";

  return (
    <Pressable className={styles} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={COLOR["primary-text"]} />
    </Pressable>
  );
}

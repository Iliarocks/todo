import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import colors from "../constants/Colors";
import CustomText from "./CustomText";

type Type = "text" | "icon";
type IconName = "add" | "tag";

export default function Button({
  type,
  onPress,
  label,
  iconName,
}: {
  type: Type;
  onPress: () => void;
  label?: string;
  iconName?: IconName;
}) {
  return (
    <Pressable
      className="flex flex-row justify-center rounded-xl bg-primary px-md py-md"
      onPress={onPress}
    >
      {type === "text" ? (
        <TextButton label={label!} />
      ) : (
        <IconButton iconName={iconName!} />
      )}
    </Pressable>
  );
}

function TextButton({ label }: { label: string }) {
  return <CustomText color="primary">{label}</CustomText>;
}

function IconButton({ iconName }: { iconName: IconName }) {
  return (
    <MaterialIcons name={iconName} size={24} color={colors["secondary-text"]} />
  );
}

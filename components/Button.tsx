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
    <Pressable className="rounded-xl bg-primary px-xl py-md" onPress={onPress}>
      {type === "text" ? (
        <TextButton label={label!} />
      ) : (
        <IconButton iconName={iconName!} />
      )}
    </Pressable>
  );
}

function TextButton({ label }: { label: string }) {
  return <CustomText style="body" size="sm" color="secondary" text={label} />;
}

function IconButton({ iconName }: { iconName: IconName }) {
  return (
    <MaterialIcons name={iconName} size={24} color={colors["secondary-text"]} />
  );
}

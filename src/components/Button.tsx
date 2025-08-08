import CustomText from "@/components/Text";
import { COLOR } from "@/constants/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";
type ContentType = "text" | "icon";
type Type = "primary" | "secondary";
type IconName = "add" | "sell" | "calendar-month" | "delete";

export default function Button({
  contentType,
  type = "primary",
  onPress,
  label,
  iconName,
}: {
  contentType: ContentType;
  type?: Type;
  onPress: () => void;
  label?: string;
  iconName?: IconName;
}) {
  return (
    <Pressable
      className={`items-center justify-center rounded-xl ${type === "primary" ? "bg-primary px-md py-md" : "bg-secondary px-sm py-sm"}`}
      onPress={onPress}
    >
      {contentType === "text" ? (
        <TextButton label={label!} type={type} />
      ) : (
        <IconButton iconName={iconName!} type={type} />
      )}
    </Pressable>
  );
}

function TextButton({ label, type }: { label: string; type: Type }) {
  return (
    <CustomText color={type === "primary" ? "primary" : "secondary"}>
      {label}
    </CustomText>
  );
}

function IconButton({ iconName, type }: { iconName: IconName; type: Type }) {
  return (
    <MaterialIcons
      name={iconName}
      size={type === "primary" ? 24 : 16}
      color={COLOR["secondary-text"]}
    />
  );
}

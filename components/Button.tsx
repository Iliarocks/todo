import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../constants/Colors";

export default function Button({
  type,
  label,
}: {
  type: string;
  label: string;
}) {
  if (type === "text") return <TextButton label={label} />;

  if (type === "icon") return <IconButton name={label} />;
}

function TextButton({ label }: { label: string }) {
  return (
    <View className="rounded-xl bg-primary px-xl py-md">
      <Text className="text-secondary-text font-roboto-mono-md text-body-sm">
        {label}
      </Text>
    </View>
  );
}

function IconButton({ name }: { name: string }) {
  return (
    <View className="rounded-xl bg-primary px-xl py-md">
      <MaterialIcons name={name} size={24} color={colors["secondary-text"]} />
    </View>
  );
}

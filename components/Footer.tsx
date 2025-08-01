import { View } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/Button";

export default function Footer() {
  return (
    <View className="flex-row items-center justify-between py-lg">
      <Link
        href="/settings"
        className="text-secondary-text font-roboto-mono-md leading-base text-body-sm"
      >
        settings
      </Link>
      <View className="invisible">
        <Button type="icon" label="add" />
      </View>
    </View>
  );
}

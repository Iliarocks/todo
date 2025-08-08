import { View } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/Button";

export default function Footer() {
  return (
    <View className="flex-row items-center justify-between py-lg">
      <Link
        href="/settings"
        className="font-roboto-mono-md text-body-sm leading-base text-secondary-text"
      >
        settings
      </Link>
      <View className="invisible">
        <Button contentType="icon" iconName="add" onPress={() => {}} />
      </View>
    </View>
  );
}

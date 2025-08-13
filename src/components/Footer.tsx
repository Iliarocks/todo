import IconButton from "@/components/IconButton";
import { View } from "react-native";
import NavigationButton from "./NavigationButton";

export default function Footer() {
  return (
    <View className="flex-row items-center justify-between px-xl py-lg">
      <NavigationButton href="./settings">settings</NavigationButton>
      <View className="invisible">
        <IconButton icon="add" onPress={() => {}} />
      </View>
    </View>
  );
}

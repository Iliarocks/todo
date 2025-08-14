import { IconButton } from "@/components/Buttons";
import { View } from "react-native";
import Link from "@/components/Link";

export default function Footer() {
  return (
    <View className="flex-row items-center justify-between px-xl py-lg">
      <Link href="./settings">settings</Link>
      <View className="invisible">
        <IconButton icon="add" onPress={() => {}} />
      </View>
    </View>
  );
}

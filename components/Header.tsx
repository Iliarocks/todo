import { View } from "react-native";
import CustomText from "./CustomText";

export default function Header({ text }: { text: string }) {
  return (
    <View className="py-lg">
      <CustomText style="body" size="sm" color="secondary" text="welcome" />
    </View>
  );
}

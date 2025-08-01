import { View, Text } from "react-native";
import Header from "@/components/Header";

export default function Index() {
  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="inbox" />
      <View className="flex-1 justify-center gap-4xl">
        <Text>poopy pants is peepee pants</Text>
      </View>
    </View>
  );
}

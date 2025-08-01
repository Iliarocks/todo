import { View, Text } from "react-native";
import Button from "@/components/Button";

export default function Index() {
  return (
    <View className="flex-1 bg-background px-xl">
      <View className="py-lg">
        <Text className="text-secondary-text font-roboto-mono-md text-body-sm">
          today
        </Text>
      </View>
      <View className="flex-1 justify-center gap-4xl">
        <Text>poopy pants is peepee pants</Text>
      </View>
    </View>
  );
}

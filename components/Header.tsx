import { View, Text } from "react-native";

export default function Header({ text }: { text: string }) {
  return (
    <View className="py-lg">
      <Text className="text-secondary-text font-roboto-mono-md leading-base text-body-sm">
        {text}
      </Text>
    </View>
  );
}

import Text from "@/components/Text";
import { ReactNode } from "react";
import { View } from "react-native";

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <View className="justify-center py-lg">
      <Text style="primary">{children}</Text>
    </View>
  );
}

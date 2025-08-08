import { View } from "react-native";
import CustomText from "./CustomText";
import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <View className="py-lg">
      <CustomText color="secondary">{children}</CustomText>
    </View>
  );
}

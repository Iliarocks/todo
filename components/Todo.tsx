import { Text, View } from "react-native";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";

export default function Todo({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <View className="flex-row items-center gap-lg py-sm">
      <CheckBox
        checked={checked}
        onPress={() => {
          setChecked((prev) => !prev);
        }}
      />
      <Text className="font-roboto-mono-md text-body-sm leading-base text-primary-text">
        {label}
      </Text>
    </View>
  );
}

import { Text, View } from "react-native";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";

export default function Todo({ text }: { text: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <View className="flex-row items-center gap-lg py-sm">
      <CheckBox
        checked={checked}
        onPress={() => {
          setChecked((prev) => !prev);
        }}
      />
      <Text className="font-roboto-mono-md text-primary-text leading-base text-body-sm">
        {text}
      </Text>
    </View>
  );
}

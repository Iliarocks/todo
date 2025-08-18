import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { View } from "react-native";

interface RepeatSelectProps {
  initialRepeat: number;
  onRepeatChange: (repeat: number) => void;
}

export default function RepeatSelect({
  initialRepeat,
  onRepeatChange,
}: RepeatSelectProps) {
  const [days, setDays] = useState<number>(initialRepeat);

  const handleChange = (value: string) => {
    setDays(Number(value));
    onRepeatChange(Number(value));
  };

  return (
    <View className="rounded-sm bg-neutral-5 p-md">
      <View className="flex-row items-center justify-between bg-neutral-0 p-md">
        <Text>repeat</Text>
        <TextInput value={days.toString()} onChangeText={handleChange} />
      </View>
    </View>
  );
}

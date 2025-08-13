import { Pressable, View } from "react-native";
import Text from "./Text";
import Calendar from "./Calendar";

interface DateSelectProps {
  date: string;
  onDateChange: (date: string) => void;
}

export default function DateSelect({ date, onDateChange }: DateSelectProps) {
  return (
    <View className="bg-neutral-5 rounded-sm p-md">
      <View className="gap-md">
        <InboxSelect date={date} onDateChange={onDateChange} />
        <Calendar selectedDate={date} onDateSelect={onDateChange} />
      </View>
    </View>
  );
}

interface InboxSelectProps {
  date: string;
  onDateChange: (date: string) => void;
}

function InboxSelect({ date, onDateChange }: InboxSelectProps) {
  const isSelected = date === "";

  return (
    <Pressable
      onPress={() => onDateChange("")}
      className="bg-neutral-0 flex-row items-center justify-between rounded-sm p-md"
    >
      <Text>inbox</Text>
      <View className={`size-xl rounded-sm ${isSelected && "bg-primary-5"}`} />
    </Pressable>
  );
}

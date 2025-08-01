import { View } from "react-native";
import Header from "@/components/Header";
import Todo from "@/components/Todo";

export default function Index() {
  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="inbox" />
      <View className="flex-1 py-sm">
        <Todo text="meditate" />
        <Todo text="study japanese" />
      </View>
    </View>
  );
}

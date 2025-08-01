import { Stack } from "expo-router";
import { View, SafeAreaView } from "react-native";
import Button from "@/components/Button";
import "../assets/global.css";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
      <View className="bottom-safe right-0 absolute px-xl py-3xs">
        <Button type="icon" label="add" />
      </View>
    </SafeAreaView>
  );
}

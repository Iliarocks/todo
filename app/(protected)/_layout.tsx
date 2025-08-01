import { Redirect, Stack } from "expo-router";
import { View, SafeAreaView } from "react-native";
import Button from "@/components/Button";
import "../../assets/global.css";
import { useContext } from "react";
import { AuthContext } from "@/utilities/authContext";

export default function AuthenticatedLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isLoggedIn) return <Redirect href="/auth" />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="inbox" />
        <Stack.Screen name="today" />
        <Stack.Screen name="upcoming" />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
      <View className="bottom-safe right-0 absolute px-xl py-lg">
        <Button type="icon" iconName="add" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

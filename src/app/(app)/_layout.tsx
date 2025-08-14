import { IconButton } from "@/components/Buttons";
import { AuthContext } from "@/context/AuthContext";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";

export default function ProtectedLayout() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  if (!user) return <Redirect href="/email-step" />;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="inbox" />
        <Stack.Screen name="today" />
        <Stack.Screen name="upcoming" />
        <Stack.Screen name="settings" options={{ presentation: "modal" }} />
        <Stack.Screen name="edit-todo" options={{ presentation: "modal" }} />
        <Stack.Screen name="create-todo" options={{ presentation: "modal" }} />
      </Stack>
      <View className="absolute bottom-lg right-xl">
        <IconButton
          icon="add"
          onPress={() => router.navigate("/create-todo")}
        />
      </View>
    </>
  );
}

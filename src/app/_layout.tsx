import "@/assets/global.css";
import ScreenView from "@/components/ScreenView";
import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const options = { animation: "none" } as const;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ScreenView safe>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={options} />
            <Stack.Screen name="(app)" options={options} />
          </Stack>
        </ScreenView>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

import "@/assets/global.css";
import ScreenView from "@/components/ScreenView";
import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  const options = { animation: "none" } as const;

  return (
    <AuthProvider>
      <ScreenView safe>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={options} />
          <Stack.Screen name="(app)" options={options} />
        </Stack>
      </ScreenView>
    </AuthProvider>
  );
}

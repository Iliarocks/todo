import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import "../assets/global.css";
import { AuthProvider } from "@/utilities/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView className="flex-1 bg-background">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(auth)"
            options={{
              animation: "none",
            }}
          />
          <Stack.Screen
            name="(protected)"
            options={{
              animation: "none",
            }}
          />
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}

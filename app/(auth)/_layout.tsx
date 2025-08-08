import { Redirect, Stack } from "expo-router";
import { db } from "@/utilities/database";

export default function AuthLayout() {
  const user = db.useUser();

  if (user) return <Redirect href="/" />;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="emailStep" />
        <Stack.Screen name="codeStep" />
      </Stack>
    </>
  );
}

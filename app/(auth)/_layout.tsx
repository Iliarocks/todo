import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { AuthContext } from "@/utilities/authContext";

export default function AuthLayout() {
  const authState = useContext(AuthContext);

  if (authState.user) return <Redirect href="/" />;

  return (
    <React.Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="emailStep" />
        <Stack.Screen name="codeStep" />
      </Stack>
    </React.Fragment>
  );
}

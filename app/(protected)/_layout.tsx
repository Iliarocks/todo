import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import Button from "@/components/Button";
import React, { useContext } from "react";
import { AuthContext } from "@/utilities/authContext";

export default function AuthenticatedLayout() {
  const authState = useContext(AuthContext);

  if (!authState.user) return <Redirect href="/emailStep" />;

  return (
    <React.Fragment>
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
      <View className="bottom-safe absolute right-0 px-xl py-lg">
        <Button type="icon" iconName="add" onPress={() => {}} />
      </View>
    </React.Fragment>
  );
}

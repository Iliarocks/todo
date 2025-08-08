import { Redirect, router, Stack } from "expo-router";
import { View } from "react-native";
import Button from "@/components/Button";
import React from "react";
import { db } from "@/utilities/database";

export default function ProtectedLayout() {
  const user = db.useUser();

  if (!user) return <Redirect href="/emailStep" />;

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
        <Stack.Screen name="createTodo" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
      <View className="absolute bottom-0 right-0 px-xl py-lg">
        <Button
          contentType="icon"
          iconName="add"
          onPress={() => router.push("/createTodo")}
        />
      </View>
    </React.Fragment>
  );
}

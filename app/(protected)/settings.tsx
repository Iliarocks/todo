import { View } from "react-native";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useContext } from "react";

import { AuthContext } from "@/utilities/authContext";
export default function Settings() {
  const authState = useContext(AuthContext);

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="settings" />
      <View className="flex-1 justify-center gap-4xl">
        <Button type="text" label="sign out" onPress={authState.logOut} />
      </View>
    </View>
  );
}

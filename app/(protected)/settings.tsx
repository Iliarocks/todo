import { View, SafeAreaView } from "react-native";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useContext } from "react";

import { AuthContext } from "@/utilities/authContext";
export default function Settings() {
  const authState = useContext(AuthContext);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 bg-background px-xl">
        <Header text={authState.user?.email} />
        <View className="flex-1"></View>
        <View className="justify-center gap-lg">
          <Button type="text" label="sign out" onPress={authState.logOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}

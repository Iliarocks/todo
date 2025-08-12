import Header from "@/components/Header";
import ScreenView from "@/components/ScreenView";
import TextButton from "@/components/TextButton";
import { AuthContext } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";
import { useContext } from "react";
import { View } from "react-native";

export default function Settings() {
  const context = useContext(AuthContext);
  const user = useUser();

  return (
    <ScreenView safe>
      <Header>{user.email}</Header>
      <ScreenView />
      <View className="px-xl">
        <TextButton onPress={context.signOut}>sign out</TextButton>
      </View>
    </ScreenView>
  );
}

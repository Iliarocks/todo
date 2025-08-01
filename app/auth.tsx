import { View, Text } from "react-native";
import Header from "@/components/Header";
import { useContext } from "react";
import { AuthContext } from "@/utilities/authContext";
import Button from "@/components/Button";

export default function Auth() {
  const authContext = useContext(AuthContext);

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="welcome" />
      <View className="flex-1 py-sm">
        <Text className="text-white">poop</Text>
        <Button type="text" label="next" onPress={authContext.logIn} />
      </View>
    </View>
  );
}

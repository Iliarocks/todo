import ScreenView from "@/components/ScreenView";
import Text from "@/components/Text";
import { TextButton } from "@/components/Buttons";
import TextInput from "@/components/TextInput";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";

export default function CodeStep() {
  const context = useContext(AuthContext);
  const router = useRouter();

  return (
    <ScreenView className="px-xl">
      <View className="flex-1 justify-center gap-lg">
        <Text>copy the code sent to your email</Text>
        <TextInput
          value={context.code}
          onChangeText={context.setCode}
          autoFocus={true}
        />
      </View>
      <View className="flex-row items-center justify-between py-lg">
        <TextButton onPress={() => router.back()}>back</TextButton>
        <TextButton onPress={context.signIn}>begin</TextButton>
      </View>
    </ScreenView>
  );
}

import ScreenView from "@/components/ScreenView";
import Text from "@/components/Text";
import { TextButton } from "@/components/Buttons";
import TextInput from "@/components/TextInput";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";

export default function EmailStep() {
  const context = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = () => {
    context.sendCode();
    router.push("/code-step");
  };

  return (
    <ScreenView className="px-xl">
      <View className="flex-1 justify-center gap-lg">
        <Text>enter your email to begin</Text>
        <TextInput
          value={context.email}
          onChangeText={context.setEmail}
          autoFocus={true}
        />
      </View>
      <View className="flex-row items-center justify-end py-lg">
        <TextButton onPress={handleSubmit}>next</TextButton>
      </View>
    </ScreenView>
  );
}

import Button from "@/components/Button";
import CustomTextInput from "@/components/CustomTextInput";
import { AuthContext } from "@/utilities/authContext";
import { useContext } from "react";
import { View } from "react-native";
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router";

export default function EmailStep() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  return (
    <View className="flex-1 bg-background px-xl">
      <View className="flex-1 justify-center gap-lg py-sm">
        <CustomText
          style="body"
          size="sm"
          color="primary"
          text="copy the code sent to your email"
        />
        <CustomTextInput autoFocus={true} onChangeText={authContext.setCode} keyboardType="numeric" />
      </View>
      <View className="flex-row items-center justify-between py-lg">
        <Button type="text" label="back" onPress={() => router.back()} />
        <Button type="text" label="begin" onPress={authContext.logIn} />
      </View>
    </View>
  );
}

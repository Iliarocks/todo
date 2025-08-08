import Button from "@/components/Button";
import CustomTextInput from "@/components/CustomTextInput";
import { AuthContext } from "@/utilities/authContext";
import { useContext } from "react";
import { View } from "react-native";
import CustomText from "@/components/CustomText";

export default function EmailStep() {
  const authContext = useContext(AuthContext);

  return (
    <View className="flex-1 bg-background px-xl">
      <View className="flex-1 justify-center gap-lg py-sm">
        <CustomText>enter your email to begin</CustomText>
        <CustomTextInput
          onChangeText={authContext.setEmail}
          autoFocus={true}
          value={authContext.email}
        />
      </View>
      <View className="flex-row items-center justify-end py-lg">
        <Button
          contentType="text"
          label="next"
          onPress={authContext.sendCode}
        />
      </View>
    </View>
  );
}

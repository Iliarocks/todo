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
        <CustomText
          style="body"
          size="sm"
          color="primary"
          text="enter your email to begin"
        />
        <CustomTextInput autoFocus={false} />
      </View>
      <View className="flex-row items-center justify-end py-lg">
        <Button type="text" label="next" onPress={authContext.sendCode} />
      </View>
    </View>
  );
}

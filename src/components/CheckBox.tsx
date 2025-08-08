import { COLOR } from "@/constants/color";
import { Animated, Pressable, useAnimatedValue } from "react-native";

export default function CheckBox({ onCheck }: { onCheck: () => void }) {
  const checkBoxAnimation = useAnimatedValue(0);

  const checkBoxInterpolation = checkBoxAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLOR.background, COLOR.secondary],
  });

  const handleCheck = () => {
    Animated.timing(checkBoxAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => onCheck());
  };

  return (
    <Pressable onPress={handleCheck}>
      <Animated.View
        className="h-xl w-xl rounded-xl border-[2px] border-secondary"
        style={{
          backgroundColor: checkBoxInterpolation,
        }}
      />
    </Pressable>
  );
}

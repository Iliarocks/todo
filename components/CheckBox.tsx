import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import colors from "../constants/Colors";

export default function CheckBox({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) {
  const animation = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(checked ? colors["primary"] : "transparent"),
    };
  }, [checked]);

  return (
    <Animated.View
      style={animation}
      className={`h-xl w-xl rounded-lg border-[2px] border-primary`}
      onTouchEnd={onPress}
    ></Animated.View>
  );
}

import { useAnimatedValue, LayoutAnimation, Animated } from "react-native";

export default function useTodoRemovalAnimation() {
  const opacityAnimation = useAnimatedValue(1);
  const heightAnimation = useAnimatedValue(40);

  const animateRemoval = (onComplete: () => void) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, LayoutAnimation.Types.spring),
    );

    Animated.stagger(200, [
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(onComplete);
  };

  return {
    opacityAnimation,
    heightAnimation,
    animateRemoval,
  };
}

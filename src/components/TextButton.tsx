import Text from "@/components/Text";
import { ReactNode } from "react";
import { Pressable } from "react-native";

type Style = "primary" | "secondary" | "tertiary";

interface TextButton {
  style?: Style;
  children?: ReactNode;
  onPress: () => void;
}
export default function TextButton({
  style = "primary",
  children,
  onPress,
}: TextButton) {
  const containerStyles = {
    primary: "p-md rounded-xl bg-primary grid place-content-center",
    secondary: "p-sm rounded-xl bg-secondary grid place-content-center",
    tertiary: "pd-sm grid-place-content-center",
  };

  const textStyles = {
    primary: <Text size="md">{children}</Text>,
    secondary: <Text>{children}</Text>,
    tertiary: <Text decoration="underline">{children}</Text>,
  };

  return (
    <Pressable className={containerStyles[style]} onPress={onPress}>
      {textStyles[style]}
    </Pressable>
  );
}

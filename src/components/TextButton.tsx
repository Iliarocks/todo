import Text from "@/components/Text";
import { ReactNode } from "react";
import { Pressable } from "react-native";

interface TextButton {
  onPress: () => void;
  children?: ReactNode;
}
export default function TextButton({ onPress, children }: TextButton) {
  const styles = "items-center bg-primary p-md";

  return (
    <Pressable className={styles} onPress={onPress}>
      <Text>{children}</Text>
    </Pressable>
  );
}

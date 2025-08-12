import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

interface ScreenViewProps {
  safe?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function ScreenView({
  safe = false,
  className = "",
  children,
}: ScreenViewProps) {
  const baseStyles = "flex-1 bg-background";
  const styles = [baseStyles, className].join(" ");

  if (safe) return <SafeAreaView className={styles}>{children}</SafeAreaView>;

  return <View className={styles}>{children}</View>;
}

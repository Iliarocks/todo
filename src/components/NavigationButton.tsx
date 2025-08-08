import Text from "@/components/Text";
import { useRouter, Href } from "expo-router";
import { ReactNode } from "react";
import { Pressable } from "react-native";

type Size = "sm" | "md" | "lg" | "xl";

interface NavigationButton {
  href: Href;
  size?: Size;
  children?: ReactNode;
}
export default function NavigationButton({
  href,
  size = "sm",
  children,
}: NavigationButton) {
  const router = useRouter();

  const textStyles = {
    sm: <Text>{children}</Text>,
    md: <Text size="md">{children}</Text>,
    lg: <Text type="title" size="lg">{children}</Text>,
    xl: <Text type="title" size="xl">{children}</Text>,
  };

  return (
    <Pressable onPress={() => router.navigate(href)} >
      {textStyles[size]}
    </Pressable>
  );
}

import Text from "@/components/Text";
import { useRouter, Href } from "expo-router";
import { ReactNode } from "react";
import { Pressable } from "react-native";

type Size = "sm" | "md" | "lg" | "xl";

interface Link {
  href: Href;
  size?: Size;
  children?: ReactNode;
}
export default function Link({ href, size = "sm", children }: Link) {
  const router = useRouter();

  const textTypes = {
    sm: "body",
    md: "body",
    lg: "title",
    xl: "title",
  } as const;

  return (
    <Pressable onPress={() => router.navigate(href)}>
      <Text size={size} type={textTypes[size]}>
        {children}
      </Text>
    </Pressable>
  );
}

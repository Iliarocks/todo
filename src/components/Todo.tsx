import Text from "@/components/Text";
import { Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import { db } from "@/utilities/database";
import { useRouter } from "expo-router";

interface TodoProps {
  id: string;
  label: string;
  onDrag: () => void;
  dragActive: boolean;
}

export default function Todo({ id, label, onDrag, dragActive }: TodoProps) {
  const baseStyles = "px-xl py-sm flex-row gap-md items-center";
  const dragStyles = "bg-neutral-5";
  const styles = dragActive ? [baseStyles, dragStyles].join(" ") : baseStyles;
  const router = useRouter();

  const handleCheck = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    db.transact(db.tx.todos[id].update({ complete: true }));
  };

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.navigate({ pathname: "/edit-todo", params: { id } });
  };

  const handleLongPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDrag();
  };

  return (
    <View className={styles}>
      <Pressable
        onPress={handleCheck}
        className="border-primary-0 h-lg w-lg rounded-sm border-[2px]"
      ></Pressable>
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={dragActive}
        className="flex-grow rounded-lg"
      >
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}

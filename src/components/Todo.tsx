import Text from "@/components/Text";
import { Pressable, View } from "react-native";
import { HAPTIC_PATTERS } from "@/utilities/haptics";
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

  const handleCheck = () => {
    HAPTIC_PATTERS.success();
    db.transact(db.tx.todos[id].update({ complete: true }));
  };

  const handlePress = () => {
    HAPTIC_PATTERS.select();
    router.navigate({ pathname: "/edit-todo", params: { id } });
  };

  const handleLongPress = () => {
    HAPTIC_PATTERS.drag();
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

import { InstaQLEntity } from "@instantdb/react";
import { AppSchema } from "@/instant.schema";
import Text from "@/components/Text";
import { Pressable, View } from "react-native";
import { HAPTIC_PATTERNS } from "@/utilities/haptics";
import { db, id } from "@/utilities/database";
import { useRouter } from "expo-router";
import { addDays, format, parseISO } from "date-fns";

type TemplateType = InstaQLEntity<AppSchema, "templates">;
type TodoType = InstaQLEntity<AppSchema, "todos">;

interface TodoProps {
  todo: TodoType;
  template: TemplateType | undefined;
  onDrag: () => void;
  dragActive: boolean;
}

export default function Todo({
  todo,
  template,
  onDrag,
  dragActive,
}: TodoProps) {
  const baseStyles = "px-xl py-sm flex-row gap-md items-center";
  const dragStyles = "bg-neutral-5";
  const styles = dragActive ? [baseStyles, dragStyles].join(" ") : baseStyles;
  const router = useRouter();

  const handleCheck = () => {
    HAPTIC_PATTERNS.success();

    if (template) {
      db.transact(
        db.tx.todos[todo.id].update({
          label: template.label,
          date: format(
            addDays(parseISO(todo.date), template.interval),
            "yyyy-MM-dd",
          ),
        }),
      );
    }

    if (!template) db.transact(db.tx.todos[todo.id].delete());
  };

  const handlePress = () => {
    HAPTIC_PATTERNS.select();
    router.navigate({ pathname: "/edit-todo", params: { id } });
  };

  const handleLongPress = () => {
    HAPTIC_PATTERNS.drag();
    onDrag();
  };

  return (
    <View className={styles}>
      <Pressable
        onPress={handleCheck}
        className="h-lg w-lg rounded-sm border-[2px] border-primary-0"
      ></Pressable>
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={dragActive}
        className="flex-grow rounded-lg"
      >
        <Text>{todo.label}</Text>
      </Pressable>
    </View>
  );
}

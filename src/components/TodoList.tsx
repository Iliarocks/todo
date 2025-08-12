import { InstaQLEntity } from "@instantdb/react";
import { AppSchema } from "@/instant.schema";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Todo from "@/components/Todo";
import { db } from "@/utilities/database";
import { generateKeyBetween } from "fractional-indexing";
import * as Haptics from "expo-haptics";

type TodoType = InstaQLEntity<AppSchema, "todos">;

interface TodoListProps {
  todos: TodoType[];
}

export default function TodoList({ todos }: TodoListProps) {
  const handleDragEnd = async ({
    data,
    from,
    to,
  }: {
    data: TodoType[];
    from: number;
    to: number;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (from === to) return;

    let newPosition: string;

    if (to === 0) {
      newPosition = generateKeyBetween(null, data[1].position);
    } else if (to === data.length - 1) {
      newPosition = generateKeyBetween(data[data.length - 2].position, null);
    } else {
      const prevIndex = from < to ? to : to - 1;
      const nextIndex = from < to ? to + 1 : to;
      newPosition = generateKeyBetween(
        data[prevIndex].position,
        data[nextIndex].position,
      );
    }

    db.transact([db.tx.todos[data[to].id].update({ position: newPosition })]);
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<TodoType>) => {
    return (
      <Todo
        id={item.id}
        label={item.label}
        onDrag={drag}
        dragActive={isActive}
      />
    );
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <DraggableFlatList
        data={todos}
        onDragEnd={handleDragEnd}
        keyExtractor={(todo) => todo.id}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
}

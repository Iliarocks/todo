import Todo from "@/components/Todo";
import { InstaQLEntity } from "@instantdb/react-native";
import { AppSchema } from "@/instant.schema";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { db } from "@/utilities/database";

type TodoType = InstaQLEntity<AppSchema, "todos">;

export default function TodoList({ todos }: { todos: TodoType[] }) {
  const handleDragEnd = ({ data }: { data: TodoType[] }) => {
    const updates = data.map((todo, index) => {
      return db.tx.todos[todo.id].update({ sortOrder: index * 1000 });
    });

    if (updates.length > 0) {
      db.transact(updates);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<TodoType>) => {
    return (
      <Todo id={item.id} label={item.label} drag={drag} activeDrag={isActive} />
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DraggableFlatList
        data={todos}
        onDragEnd={handleDragEnd}
        keyExtractor={(todo) => todo.id}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
}

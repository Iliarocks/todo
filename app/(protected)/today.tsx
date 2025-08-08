import { View, Text } from "react-native";
import Header from "@/components/Header";
import { db } from "@/utilities/database";
import { useContext } from "react";
import { AuthContext } from "@/utilities/authContext";
import Todo from "@/components/Todo";

export default function Index() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const query = {
    todos: {
      $: {
        where: {
          date: new Date().toISOString().split("T")[0],
          "user.id": user.id,
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery(query);

  if (isLoading || !data || error) return null;

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="today" />
      <View className="flex-1 py-sm">
        {data.todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} label={todo.label} />
        ))}
      </View>
    </View>
  );
}

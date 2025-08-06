import { View } from "react-native";
import Header from "@/components/Header";
import Todo from "@/components/Todo";
import { db } from "@/utilities/database";
import { useContext } from "react";
import { AuthContext } from "@/utilities/authContext";

export default function Inbox() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const query = {
    todos: {
      $: {
        where: {
          date: "",
          "user.id": user.id,
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery(query);

  if (isLoading || !data || error) return null;

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="inbox" />
      <View className="flex-1 py-sm">
        {data.todos.map((todo) => (
          <Todo key={todo.id} label={todo.label} />
        ))}
      </View>
    </View>
  );
}

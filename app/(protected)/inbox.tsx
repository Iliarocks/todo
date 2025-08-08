import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import { AuthContext } from "@/utilities/authContext";
import { db } from "@/utilities/database";
import { useContext } from "react";
import { View } from "react-native";

export default function Inbox() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const query = {
    todos: {
      $: {
        where: {
          date: "",
          "user.id": user.id,
          complete: false,
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery(query);

  if (isLoading || error) return null;

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="inbox" />
      <TodoList todos={Object.values(data.todos)} />
    </View>
  );
}

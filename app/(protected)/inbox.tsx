import { View } from "react-native";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
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
          complete: false,
        },
        order: {
          sortOrder: "asc",
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery(query);

  if (isLoading || !data || error) return null;

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="inbox" />
      <TodoList todos={data.todos} />
    </View>
  );
}

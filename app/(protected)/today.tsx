import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import { db } from "@/utilities/database";
import useLoggedInUser from "@/utilities/useLoggedInUser";
import { View } from "react-native";

export default function Index() {
  const user = db.useUser();

  const query = {
    todos: {
      $: {
        where: {
          date: new Date().toISOString().split("T")[0],
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
      <Header text="today" />
      <TodoList todos={Object.values(data.todos)} />
    </View>
  );
}

import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import { AuthContext } from "@/utilities/authContext";
import { db } from "@/utilities/database";
import { useContext } from "react";
import { View } from "react-native";

export default function Index() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const query = {
    todos: {
      $: {
        where: {
          "user.id": user.id,
          and: [
            { date: { $not: "" } },
            { date: { $not: new Date().toISOString().split("T")[0] } },
          ],
          complete: false,
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery(query);

  if (isLoading || !data || error) return null;

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="upcoming" />
      <TodoList todos={Object.values(data.todos)} />
    </View>
  );
}

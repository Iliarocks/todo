import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import { db } from "@/utilities/database";
import useLoggedInUser from "@/utilities/useLoggedInUser";
import { View } from "react-native";

export default function Index() {
  const user = useLoggedInUser();

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

  if (isLoading || error) return null;

  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="upcoming" />
      <TodoList todos={Object.values(data.todos)} />
    </View>
  );
}

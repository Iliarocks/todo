import Header from "@/components/Header";
import ScreenView from "@/components/ScreenView";
import TodoList from "@/components/TodoList";
import { useUser } from "@/hooks/useUser";
import { db } from "@/utilities/database";

export default function Inbox() {
  const user = useUser();

  const query = {
    todos: {
      $: {
        where: {
          date: "",
          complete: false,
          "user.id": user.id,
        },
        order: {
          position: "asc",
        },
      },
    },
  } as const;

  const { isLoading, data, error } = db.useQuery(query);

  if (isLoading || error) return null;

  return (
    <ScreenView>
      <Header>inbox</Header>
      <TodoList todos={data.todos} />
    </ScreenView>
  );
}

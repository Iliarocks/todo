import Header from "@/components/Header";
import ScreenView from "@/components/ScreenView";
import TodoList from "@/components/TodoList";
import { useUser } from "@/hooks/useUser";
import { db } from "@/utilities/database";
import { format } from "date-fns";
import _ from "lodash";

export default function Upcoming() {
  const user = useUser();

  const query = {
    todos: {
      $: {
        where: {
          date: { $gt: format(new Date(), "yyyy-MM-dd") },
          "user.id": user.id,
        },
      },
      template: {},
    },
  } as const;

  const { isLoading, data, error } = db.useQuery(query);

  if (isLoading || error) return null;

  console.log(data);

  return (
    <ScreenView>
      <Header>upcoming</Header>
      <TodoList todos={_.orderBy(data.todos, ["position"], ["asc"])} />
    </ScreenView>
  );
}

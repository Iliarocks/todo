import _ from "lodash";
import { InstaQLEntity } from "@instantdb/react";
import { AppSchema } from "@/instant.schema";

type TodoType = InstaQLEntity<AppSchema, "todos">;

const queryTemplate = {
  todos: {
    $: {
      where: {
        complete: false,
      },
    },
  },
};

export const todoUtilities = {
  sortByPosition: (todos: TodoType[]) => {
    return _.orderBy(todos, ["position"], ["asc"]);
  },
  queries: {
    inbox: (userId: string) => ({
      ...queryTemplate,
      date: "",
      "user.id": userId,
    }),
    today: (userId: string) => ({
      ...queryTemplate,
      date: new Date().toISOString().split("T")[0],
      "user.id": userId,
    }),
    upcoming: (userId: string) => ({
      ...queryTemplate,
      date: { $gt: new Date().toISOString().split("T")[0] },
      "user.id": userId,
    }),
  },
};

// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react-native";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
    }),
    todos: i.entity({
      label: i.string().indexed(),
      date: i.string().indexed(),
    }),
  },
  links: {
    userTodos: {
      forward: { on: "todos", has: "one", label: "user", required: true },
      reverse: { on: "$users", has: "many", label: "todos" },
    },
  },
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;

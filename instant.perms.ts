import type { InstantRules } from "@instantdb/react-native";

const rules = {
  todos: {
    allow: {
      view: "isOwner",
      create: "isOwner",
      update: "isOwner",
      delete: "isOwner",
    },
    bind: ["isOwner", "auth.id != null && auth.id in data.ref('user.id')"],
  },
} satisfies InstantRules;

export default rules;

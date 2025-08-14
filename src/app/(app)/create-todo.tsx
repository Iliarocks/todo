import DateSelect from "@/components/DateSelect";
import Header from "@/components/Header";
import ScreenView from "@/components/ScreenView";
import TextButton from "@/components/TextButton";
import TextInput from "@/components/TextInput";
import { useUser } from "@/hooks/useUser";
import { db, id } from "@/utilities/database";
import { useRouter } from "expo-router";
import { generateKeyBetween } from "fractional-indexing";
import { useState } from "react";
import { View } from "react-native";
import _ from "lodash";

export default function CreateTodo() {
  const [label, setLabel] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const user = useUser();
  const router = useRouter();

  const pushTodo = async () => {
    const { data } = await db.queryOnce({
      todos: {
        $: {
          where: {
            date,
            user: user.id,
          },
        },
      },
    });

    const first = _.orderBy(data.todos, ["position"], ["asc"])[0]?.position;

    const todo = {
      label: label,
      complete: false,
      date: date,
      position: generateKeyBetween(null, first),
    };

    db.transact(db.tx.todos[id()].update(todo).link({ user: user.id }));

    setLabel("");
    router.back();
  };

  return (
    <ScreenView safe>
      <Header>create</Header>
      <ScreenView className="gap-md px-xl">
        <TextInput value={label} onChangeText={setLabel} autoFocus={true} />
        <DateSelect date={date} onDateChange={setDate} />
      </ScreenView>
      <View className="px-xl">
        <TextButton onPress={pushTodo}>save</TextButton>
      </View>
    </ScreenView>
  );
}

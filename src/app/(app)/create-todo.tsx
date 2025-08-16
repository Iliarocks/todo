import { TextButton } from "@/components/Buttons";
import DateSelect from "@/components/DateSelect";
import Header from "@/components/Header";
import RepeatSelect from "@/components/RepeatSelect";
import ScreenView from "@/components/ScreenView";
import TextInput from "@/components/TextInput";
import { useUser } from "@/hooks/useUser";
import { db, id } from "@/utilities/database";
import { useRouter } from "expo-router";
import { generateKeyBetween } from "fractional-indexing";
import _ from "lodash";
import { useState } from "react";
import { View } from "react-native";

export default function CreateTodo() {
  const [label, setLabel] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [repeatInterval, setRepeatInterval] = useState<number>(0);
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
    const repeat = !(repeatInterval === 0);

    const todo = {
      label: label,
      date: date,
      position: generateKeyBetween(null, first),
      repeat: repeat,
    };

    if (!repeat) {
      db.transact(db.tx.todos[id()].create(todo).link({ user: user.id }));
    }

    if (repeat) {
      const templateId = id();

      db.transact([
        db.tx.templates[templateId].update({
          label: label,
          interval: repeatInterval,
        }),
        db.tx.todos[id()]
          .update(todo)
          .link({ user: user.id, template: templateId }),
      ]);
    }

    setLabel("");
    setDate("");
    setRepeatInterval(0);
    router.back();
  };

  return (
    <ScreenView safe>
      <Header>create</Header>
      <ScreenView className="gap-md px-xl">
        <TextInput value={label} onChangeText={setLabel} autoFocus={true} />
        <DateSelect date={date} onDateChange={setDate} />
        <RepeatSelect
          initialRepeat={repeatInterval}
          onRepeatChange={setRepeatInterval}
        />
      </ScreenView>
      <View className="px-xl">
        <TextButton onPress={pushTodo}>save</TextButton>
      </View>
    </ScreenView>
  );
}

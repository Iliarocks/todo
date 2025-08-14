import DateSelect from "@/components/DateSelect";
import Header from "@/components/Header";
import ScreenView from "@/components/ScreenView";
import { TextButton } from "@/components/Buttons";
import TextInput from "@/components/TextInput";
import { db } from "@/utilities/database";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Text from "@/components/Text";

export default function EditTodo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");

  const { isLoading, data, error } = db.useQuery({
    todos: {
      $: {
        where: {
          id,
        },
      },
    },
  });

  const todo = data?.todos?.[0];

  useEffect(() => {
    if (todo) {
      setLabel(todo.label);
      setDate(todo.date);
    }
  }, [todo]);

  if (isLoading || error) return;

  const handleSave = () => {
    db.transact([db.tx.todos[id].update({ label, date })]);
    router.back();
  };

  return (
    <ScreenView safe>
      <Header>edit</Header>
      <ScreenView className="gap-md px-xl">
        <TextInput value={label} onChangeText={setLabel} autoFocus />
        <DateSelect date={date} onDateChange={setDate} />
      </ScreenView>
      <View className="px-xl">
        <TextButton onPress={handleSave}>save</TextButton>
      </View>
    </ScreenView>
  );
}

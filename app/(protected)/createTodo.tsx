import Button from "@/components/Button";
import { useState, useContext } from "react";
import { SafeAreaView, View } from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import { db } from "@/utilities/database";
import { id } from "@instantdb/react-native";
import { AuthContext } from "@/utilities/authContext";
import { useRouter } from "expo-router";
import DateSelect from "@/components/DateSelect";

export default function CreateTodo() {
  const [label, setLabel] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const pushTodo = () => {
    if (!user || !label.trim()) return;
    db.transact([
      db.tx.todos[id()]
        .update({ label, date, complete: false, sortOrder: Date.now() })
        .link({ user: user.id }),
    ]);
    setLabel("");
    setDate("");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-xl pt-xl">
        <View className="flex-1 gap-lg">
          <CustomTextInput onChangeText={setLabel} value={label} />
          <DateSelect date={date} onDateChange={setDate} />
        </View>
        <View className="justify-center gap-lg">
          <Button type="text" label="create" onPress={pushTodo} />
        </View>
      </View>
    </SafeAreaView>
  );
}

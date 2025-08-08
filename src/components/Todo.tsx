import { View, Pressable, Modal, Animated } from "react-native";
import { useState } from "react";
import CustomText from "./CustomText";
import { db } from "@/utilities/database";
import CheckBox from "./CheckBox";
import Button from "./Button";
import DateSelect from "./DateSelect";
import useTodoRemovalAnimation from "@/hooks/useTodoRemovalAnimation";

export default function Todo({
  id,
  label,
  onDrag,
  dragActive = false,
}: {
  id: string;
  label: string;
  onDrag?: () => void;
  dragActive?: boolean;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showDateSelect, setShowDateSelect] = useState<boolean>(false);
  const [todoDate, setTodoDate] = useState<string>("");
  const { opacityAnimation, heightAnimation, animateRemoval } =
    useTodoRemovalAnimation();

  const handleDelete = () => {
    animateRemoval(() => db.transact([db.tx.todos[id].delete()]));
  };

  const handleCheck = () => {
    animateRemoval(() =>
      db.transact([db.tx.todos[id].update({ complete: true })]),
    );
  };

  const handleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      Animated.timing(heightAnimation, {
        toValue: 140,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      setExpanded(false);
      Animated.timing(heightAnimation, {
        toValue: 40,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleDateChange = (date: string) => {
    setTodoDate(date);
    db.transact([db.tx.todos[id].update({ date })]);
    setTimeout(() => {
      setShowDateSelect(false);
    }, 400);
  };

  return (
    <>
      {showDateSelect && (
        <Modal transparent visible={showDateSelect} animationType="fade">
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowDateSelect(false)}
          >
            <View
              style={{
                borderRadius: 12,
                padding: 20,
                width: "90%",
              }}
            >
              <DateSelect date={todoDate} onDateChange={handleDateChange} />
            </View>
          </Pressable>
        </Modal>
      )}
      <Animated.View
        className={`overflow-hidden rounded-xl px-sm py-sm ${dragActive || expanded ? "bg-primary" : "bg-background"}`}
        style={{
          opacity: opacityAnimation,
          height: heightAnimation,
        }}
      >
        <View className="grow gap-xs">
          <View className="flex-row items-center gap-lg">
            <CheckBox onCheck={handleCheck} />
            <Pressable
              onPress={handleExpand}
              onLongPress={onDrag}
              disabled={dragActive}
            >
              <CustomText>{label}</CustomText>
            </Pressable>
          </View>
          {expanded && (
            <View className="grow flex-row gap-lg">
              <View className="invisible">
                <CheckBox onCheck={() => {}}></CheckBox>
              </View>
              <View className="grow gap-xs rounded-xl py-2xs">
                <View className="grow rounded-xl"></View>
                <View className="flex-row gap-sm">
                  <Button
                    type="secondary"
                    contentType="icon"
                    iconName="calendar-month"
                    onPress={() => setShowDateSelect(true)}
                  ></Button>
                  <Button
                    type="secondary"
                    contentType="icon"
                    iconName="delete"
                    onPress={handleDelete}
                  ></Button>
                </View>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </>
  );
}

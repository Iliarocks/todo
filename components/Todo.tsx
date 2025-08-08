import {
  Text,
  View,
  Animated,
  useAnimatedValue,
  LayoutAnimation,
  Pressable,
  Modal,
} from "react-native";
import { useState } from "react";
import { db } from "@/utilities/database";
import colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateSelect from "@/components/DateSelect";

interface TodoProps {
  id: string;
  label: string;
  drag?: () => void;
  activeDrag?: boolean;
}

export default function Todo({
  id,
  label,
  drag,
  activeDrag = false,
}: TodoProps) {
  const opacityAnimation = useAnimatedValue(1);
  const heightAnimation = useAnimatedValue(50);
  const expandAnimation = useAnimatedValue(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showDateSelect, setShowDateSelect] = useState<boolean>(false);
  const [todoDate, setTodoDate] = useState<string>("");

  const handleCheck = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, LayoutAnimation.Types.spring),
    );

    if (expanded) handleCollapse();

    Animated.stagger(150, [
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      db.transact([db.tx.todos[id].update({ complete: true })]);
    });
  };

  const handlePress = () => {
    if (!expanded) {
      setExpanded(true);
      Animated.timing(expandAnimation, {
        toValue: 100,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleCollapse = () => {
    Animated.timing(expandAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setExpanded(false);
      setShowDateSelect(false);
    });
  };

  const handleDateChange = (date: string) => {
    setTodoDate(date);
    db.transact([db.tx.todos[id].update({ date })]);
    setShowDateSelect(false);
  };

  return (
    <>
      {expanded && (
        <Modal transparent visible={expanded}>
          <Pressable style={{ flex: 1 }} onPress={handleCollapse} />
        </Modal>
      )}

      {showDateSelect && (
        <Modal transparent visible={showDateSelect} animationType="slide">
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
                backgroundColor: colors.background,
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

      <Pressable
        onPress={handlePress}
        onLongPress={drag}
        disabled={activeDrag}
        style={{
          backgroundColor:
            activeDrag || expanded ? colors.primary : colors.background,
          zIndex: expanded ? 1000 : 1,
        }}
        className="overflow-hidden rounded-xl"
      >
        <Animated.View
          style={{
            opacity: opacityAnimation,
            height: heightAnimation,
          }}
          className="justify-center"
        >
          <View className="flex-row items-center gap-lg py-sm">
            <View pointerEvents="box-only">
              <Pressable
                className="h-xl w-xl rounded-lg border-[2px] border-primary"
                onPress={handleCheck}
              ></Pressable>
            </View>
            <Text className="font-roboto-mono-md text-body-sm leading-base text-primary-text">
              {label}
            </Text>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            height: expandAnimation,
          }}
        >
          <View className="align-end w-full flex-1 justify-end px-md py-sm">
            <View pointerEvents="box-only">
              <Pressable
                onPress={() => setShowDateSelect(true)}
                className="flex-row items-center gap-sm"
              >
                <MaterialIcons
                  name="calendar-month"
                  size={24}
                  color={colors["primary-text"]}
                />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </>
  );
}

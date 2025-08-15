import Text from "@/components/Text";
import { HAPTIC_PATTERNS } from "@/utilities/haptics";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const SWIPE_THRESHOLD = 50;

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
}: CalendarProps) {
  const selected = selectedDate ? parseISO(selectedDate) : null;
  const [viewDate, setViewDate] = useState<Date>(selected ?? new Date());

  const weeks = useMemo(() => buildMonthMatrix(viewDate), [viewDate]);

  const swipeGesture = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-SWIPE_THRESHOLD, SWIPE_THRESHOLD])
    .onEnd((event) => {
      const direction = event.translationX > 0 ? -1 : 1;
      setViewDate((date) => addMonths(date, direction));
      HAPTIC_PATTERNS.navigate();
    });

  return (
    <View className="gap-md rounded-sm bg-neutral-0 p-md">
      <View className="flex-row justify-between">
        <Text>{format(viewDate, "LLL yyyy").toLowerCase()}</Text>
      </View>
      <GestureDetector gesture={swipeGesture}>
        <View>
          {weeks.map((week, i) => (
            <View key={i} className="flex-row justify-between">
              {week.map((date) => {
                return (
                  <DayCell
                    key={format(date, "yyyy-MM-dd")}
                    date={date}
                    isOutside={!isSameMonth(date, viewDate)}
                    isSelected={!!selected && isSameDay(date, selected)}
                    onPress={onDateSelect}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </GestureDetector>
    </View>
  );
}

interface DayCellProps {
  date: Date;
  isOutside: boolean;
  isSelected: boolean;
  onPress: (date: string) => void;
}

function DayCell({ date, isOutside, isSelected, onPress }: DayCellProps) {
  const baseStyles = "p-xs rounded-sm items-center aspect-square";
  const invisibleStyles = isOutside ? "invisible" : "";
  const activeStyles = isSelected ? "bg-primary-5" : "";

  const handlePress = () => {
    HAPTIC_PATTERNS.select();
    onPress(format(date, "yyyy-MM-dd"));
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`${baseStyles} ${invisibleStyles} ${activeStyles}`}
    >
      <Text>{format(date, "d")}</Text>
    </Pressable>
  );
}

function buildMonthMatrix(viewDate: Date) {
  const start = startOfWeek(startOfMonth(viewDate));
  const end = endOfWeek(endOfMonth(viewDate));
  const days = eachDayOfInterval({ start, end });

  const weeks: Date[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

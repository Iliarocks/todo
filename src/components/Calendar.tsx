import Text from "@/components/Text";
import { HAPTIC_PATTERS } from "@/utilities/haptics";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const DAYS_IN_WEEK = 7;
const MONTHS_IN_YEAR = 12;
const SWIPE_THRESHOLD = 50;
const MONTH_NAMES = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
}: CalendarProps) {
  const currentDate = new Date();
  const initialDate =
    selectedDate === ""
      ? new Date(currentDate.getFullYear(), currentDate.getMonth())
      : new Date(selectedDate);
  const [date, setDate] = useState<Date>(initialDate);
  const month = date.getMonth();
  const year = date.getFullYear();

  function renderDays(year: number, month: number, days: number[][]) {
    const dayConstructor = (day: number, key: number) => {
      const d = new Date(year, month, day);
      const isSelected = d.toISOString().split("T")[0] === selectedDate;
      return (
        <DayCell
          date={d}
          isVisible={day === -1}
          isSelected={isSelected}
          onPress={onDateSelect}
          key={key}
        />
      );
    };

    const columns = days.map((column, key) => {
      const items = column.map(dayConstructor);

      return (
        <View className="gap-lg" key={key}>
          {items}
        </View>
      );
    });

    return <View className="flex-row justify-between">{columns}</View>;
  }

  const swipeGesture = Gesture.Pan()
    .runOnJS(true)
    .onFinalize((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        HAPTIC_PATTERS.navigate();
        setDate(navigateMonth(year, month, -1));
      }

      if (event.translationX < -SWIPE_THRESHOLD) {
        HAPTIC_PATTERS.navigate();
        setDate(navigateMonth(year, month, 1));
      }
    });

  return (
    <View className="gap-md rounded-sm bg-neutral-0 p-md">
      <View className="flex-row justify-between">
        <Text>
          {MONTH_NAMES[month]} {year}
        </Text>
      </View>
      <GestureDetector gesture={swipeGesture}>
        {renderDays(year, month, getDaysInMonth(year, month))}
      </GestureDetector>
    </View>
  );
}

interface DayCellProps {
  date: Date;
  isVisible: boolean;
  isSelected: boolean;
  onPress: (date: string) => void;
}

function DayCell({ date, isVisible, isSelected, onPress }: DayCellProps) {
  const day = date.getDate();
  const invisibleStyles = "invisible";
  const defaultStyles = "p-xs rounded-sm items-center aspect-square";
  const activeStyles = "bg-primary-5";

  const handlePress = () => {
    HAPTIC_PATTERS.select();
    onPress(date.toISOString().split("T")[0]);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`${defaultStyles} ${isVisible && invisibleStyles} ${isSelected && activeStyles}`}
    >
      <Text>{day}</Text>
    </Pressable>
  );
}

function getDaysInMonth(year: number, month: number) {
  const firstWeekDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: number[][] = new Array(DAYS_IN_WEEK).fill(null).map(() => []);

  for (let i = 0; i < firstWeekDay; i++) {
    days[i].push(-1);
  }

  for (let i = 0; i < daysInMonth; i++) {
    days[(i + firstWeekDay) % DAYS_IN_WEEK].push(i + 1);
  }

  return days;
}

function navigateMonth(year: number, month: number, direction: number) {
  if (month + direction > MONTHS_IN_YEAR - 1) {
    return new Date(year + 1, 0);
  }

  if (month + direction < 0) {
    return new Date(year - 1, MONTHS_IN_YEAR - 1);
  }

  return new Date(year, month + direction);
}

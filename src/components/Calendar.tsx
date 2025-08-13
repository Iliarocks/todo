import { View, Pressable } from "react-native";
import Text from "@/components/Text";
import { useState } from "react";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

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

  // returns a 2D array of days in DAYS_IN_WEEK columns
  const getDaysInMonth = (year: number, month: number) => {
    const firstWeekDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: number[][] = new Array(DAYS_IN_WEEK).fill(null).map(() => []);

    for (let i = 0; i < firstWeekDay; i++) {
      days[i].push(i - firstWeekDay);
    }

    for (let i = 0; i < daysInMonth; i++) {
      days[(i + firstWeekDay) % DAYS_IN_WEEK].push(i + 1);
    }

    return days;
  };

  const renderDays = (days: number[][]) => {
    const dayConstructor = (day: number, key: number) => {
      const d = new Date(year, month, day);
      const isSelected = d.toISOString() === selectedDate;
      return (
        <DayCell
          date={d}
          isSelected={isSelected}
          onPress={onDateSelect}
          key={key}
        />
      );
    };

    return days.map((column, key) => {
      const items = column.map(dayConstructor);

      return (
        <View className="gap-lg" key={key}>
          {items}
        </View>
      );
    });
  };

  const navigateMonth = (direction: number) => {
    if (month + direction > MONTHS_IN_YEAR - 1) {
      setDate(new Date(year + 1, 0));
    } else if (month + direction < 0) {
      setDate(new Date(year - 1, MONTHS_IN_YEAR - 1));
    } else {
      setDate(new Date(year, month + direction));
    }
  };

  const swipeGesture = Gesture.Pan().onFinalize((event) => {
    if (event.translationX > SWIPE_THRESHOLD) {
      runOnJS(navigateMonth)(-1);
    } else if (event.translationX < -SWIPE_THRESHOLD) {
      runOnJS(navigateMonth)(1);
    }
  });

  return (
    <View className="bg-neutral-0 gap-lg rounded-sm p-md">
      <View className="flex-row justify-between">
        <Text>
          {MONTH_NAMES[month]} {year}
        </Text>
      </View>
      <GestureDetector gesture={swipeGesture}>
        <View className="flex-row justify-between">
          {renderDays(getDaysInMonth(year, month))}
        </View>
      </GestureDetector>
    </View>
  );
}

interface DayCellProps {
  date: Date;
  isSelected: boolean;
  onPress: (date: string) => void;
}

function DayCell({ date, isSelected, onPress }: DayCellProps) {
  const day = date.getDate();
  const invisibleStyles = "invisible";
  const defaultStyles = "p-xs rounded-sm items-center";
  const activeStyles = "bg-primary-5";

  const handlePress = () => {
    console.log(date.toISOString());
    onPress(date.toISOString());
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`${defaultStyles} ${day === 0 && invisibleStyles} ${isSelected && activeStyles}`}
    >
      <Text>{day}</Text>
    </Pressable>
  );
}

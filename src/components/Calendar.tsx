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
  const initialDate = selectedDate === "" ? new Date() : new Date(selectedDate);
  const [date, setDate] = useState<Date>(initialDate);
  const [month, setMonth] = useState<number>(initialDate.getMonth());
  const [year, setYear] = useState<number>(initialDate.getFullYear());

  // returns a 2D array of days in DAYS_IN_WEEK columns
  const getDaysInMonth = () => {
    const firstWeekDay = new Date(year, month, 1).getDay();
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

  const formatDate = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const renderDays = () => {
    const days = getDaysInMonth();

    const dayConstructor = (day: number, key: number) => {
      const dateString = formatDate(year, month, day);
      const isSelected = dateString === selectedDate;
      return (
        <DayCell
          date={dateString}
          isSelected={isSelected}
          onPress={onDateSelect}
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

  const changeMonth = (direction: number) => {
    if (month + direction > MONTHS_IN_YEAR - 1) {
      setMonth(0);
      setYear(year + 1);
    } else if (month + direction < 0) {
      setMonth(MONTHS_IN_YEAR - 1);
      setYear(year - 1);
    } else {
      setMonth(month + direction);
    }
  };

  const swipeGesture = Gesture.Pan().onFinalize((event) => {
    if (event.translationX > SWIPE_THRESHOLD) {
      runOnJS(changeMonth)(-1);
    } else if (event.translationX < -SWIPE_THRESHOLD) {
      runOnJS(changeMonth)(1);
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
        <View className="flex-row justify-between">{renderDays()}</View>
      </GestureDetector>
    </View>
  );
}

interface DayCellProps {
  date: string;
  isSelected: boolean;
  onPress: (date: string) => void;
}

function DayCell({ date, isSelected, onPress }: DayCellProps) {
  const day = Number(date.split("-")[2]);
  const invisibleStyles = "invisible";
  const defaultStyles = "p-xs rounded-sm items-center";
  const activeStyles = "bg-primary-5";

  return (
    <Pressable
      onPress={() => onPress(date)}
      className={`${defaultStyles} ${day === 0 && invisibleStyles} ${isSelected && activeStyles}`}
    >
      <Text>{day}</Text>
    </Pressable>
  );
}

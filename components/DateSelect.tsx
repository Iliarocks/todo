import { View, Pressable } from "react-native";
import { useState } from "react";
import CustomText from "./CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../constants/Colors";
import { Calendar } from "react-native-calendars";

type DateOption = "inbox" | "today" | "calendar";

interface DateSelectProps {
  date: string;
  onDateChange: (date: string) => void;
}

export default function DateSelect({ date, onDateChange }: DateSelectProps) {
  const [selected, setSelected] = useState<DateOption>("inbox");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleOptionPress = (option: DateOption) => {
    setSelected(option);
    if (option === "calendar") {
      setShowCalendar(!showCalendar);
    } else {
      setShowCalendar(false);
      if (option === "today") {
        const today = new Date().toISOString().split("T")[0];
        onDateChange(today);
      } else {
        onDateChange("");
      }
    }
  };

  return (
    <View className="bg-primary">
      <View className="flex-row items-center justify-between rounded-xl px-xl py-xs">
        <Pressable
          className={`rounded-xl px-xl py-lg ${selected === "inbox" ? "bg-secondary" : ""}`}
          onPress={() => handleOptionPress("inbox")}
        >
          <CustomText>inbox</CustomText>
        </Pressable>
        <Pressable
          className={`rounded-xl px-xl py-lg ${selected === "today" ? "bg-secondary" : ""}`}
          onPress={() => handleOptionPress("today")}
        >
          <CustomText>today</CustomText>
        </Pressable>
        <Pressable
          className={`rounded-xl px-xl py-lg ${selected === "calendar" ? "bg-secondary" : ""}`}
          onPress={() => handleOptionPress("calendar")}
        >
          <MaterialIcons
            name="calendar-month"
            size={24}
            color={colors["primary-text"]}
          />
        </Pressable>
      </View>

      {showCalendar && (
        <View>
          <Calendar
            hideDayNames={true}
            hideExtraDays={true}
            current={date || undefined}
            markedDates={{
              [date]: {
                selected: true,
                selectedTextColor: colors["primary-text"],
              },
            }}
            theme={{
              backgroundColor: colors.primary,
              calendarBackground: colors.primary,
              textSectionTitleColor: colors["secondary-text"],
              selectedDayBackgroundColor: colors.primary,
              todayTextColor: colors["secondary-text"],
              dayTextColor: colors["secondary-text"],
              textDisabledColor: colors["secondary-text"],
              monthTextColor: colors["secondary-text"],
              arrowColor: colors["secondary-text"],
              textDayFontFamily: "RobotoMono-Medium",
              textMonthFontFamily: "RobotoMono-Medium",
              textDayHeaderFontFamily: "RobotoMono-Medium",
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            }}
            onDayPress={(day) => {
              onDateChange(day.dateString);
              setShowCalendar(false);
            }}
          />
        </View>
      )}
    </View>
  );
}

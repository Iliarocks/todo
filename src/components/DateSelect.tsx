import { View } from "react-native";
import TextButton from "./TextButton";
import { Calendar } from "react-native-calendars";
import { COLOR } from "@/constants/color";

interface DateSelectProps {
  date: string;
  onDateChange: (date: string) => void;
}

export default function DateSelect({ date, onDateChange }: DateSelectProps) {
  return (
    <View>
      <TextButton onPress={() => onDateChange("")}>inbox</TextButton>
      <Calendar
        current={date}
        hideDayNames={true}
        hideExtraDays={true}
        theme={{
          backgroundColor: COLOR.secondary,
          calendarBackground: COLOR.primary,
          textSectionTitleColor: COLOR["secondary-text"],
          selectedDayBackgroundColor: COLOR.secondary,
          todayTextColor: COLOR["secondary-text"],
          dayTextColor: COLOR["secondary-text"],
          textDisabledColor: COLOR["secondary-text"],
          monthTextColor: COLOR["secondary-text"],
          arrowColor: COLOR["secondary-text"],
        }}
        onDayPress={(day) => onDateChange(day.dateString)}
        markedDates={{
          [date]: {
            selected: true,
            disableTouchEvent: true,
          },
        }}
      />
    </View>
  );
}

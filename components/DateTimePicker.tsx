import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { format } from "../services/datetime";
import dayjs from "dayjs";
import { ThemedButton } from "./ThemedButton";
import { ThemedView } from "./ThemedView";
import WebDateTimePicker from "./WebDateTimePicker";
import Label from "./Label";
import useUser from "@/context/user/useUser";

export default function DatePicker({
  date,
  setDate,
  label,
  mode = "date",
}: {
  date: number;
  setDate: (date: number) => void;
  label: string;
  mode?: "date" | "time" | "datetime";
}) {
  const { theme } = useUser();
  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setDate(dayjs(currentDate).valueOf());
  };

  const showTime = () => {
    DateTimePickerAndroid.open({
      value: new Date(date),
      onChange,
      mode: "time",
    });
  };

  const showDate = () => {
    DateTimePickerAndroid.open({
      value: new Date(date),
      onChange,
      mode: "date",
    });
  };

  if (Platform.OS === "ios")
    return (
      <ThemedView style={{ alignItems: "flex-start", marginVertical: 8 }}>
        <Label label={label} />
        <DateTimePicker
          value={new Date(date)}
          mode={mode}
          onChange={onChange}
          style={{ marginLeft: 24 }}
          textColor={"red"}
          themeVariant={theme.dark ? "dark" : "light"}
        />
      </ThemedView>
    );

  if (Platform.OS === "android")
    return (
      <ThemedView
        style={{ alignItems: "flex-start", marginVertical: 8, marginLeft: 8 }}
      >
        <Label label={label} />
        <ThemedView style={{ marginLeft: 24, flexDirection: "row" }}>
          {mode.includes("date") && (
            <ThemedButton
              outlined
              onPress={showDate}
              title={format(date, "date")}
            />
          )}
          {mode.includes("time") && (
            <ThemedButton
              outlined
              onPress={showTime}
              title={format(date, "time")}
            />
          )}
        </ThemedView>
      </ThemedView>
    );
  return (
    <ThemedView style={{ flexDirection: "row" }}>
      <WebDateTimePicker
        value={date}
        onValueChange={(value) => setDate(value)}
      />
    </ThemedView>
  );
}

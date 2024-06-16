import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform, View } from "react-native";
import { format } from "../services/datetime";
import dayjs from "dayjs";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import WebDateTimePicker from "./WebDateTimePicker";

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
  const theme = useThemeColor();
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
      <View style={{ alignItems: "flex-start", marginVertical: 8 }}>
        <ThemedText
          style={{
            marginLeft: 8,
            color: theme.grey2,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {label}
        </ThemedText>
        <DateTimePicker
          value={new Date(date)}
          mode={mode}
          onChange={onChange}
          style={{ marginLeft: 24 }}
        />
      </View>
    );
  if (Platform.OS === "android")
    return (
      <View
        style={{ alignItems: "flex-start", marginVertical: 8, marginLeft: 8 }}
      >
        <ThemedText
          style={{
            color: theme.grey2,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {label}
        </ThemedText>
        <View style={{ marginLeft: 24, flexDirection: "row" }}>
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
        </View>
      </View>
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

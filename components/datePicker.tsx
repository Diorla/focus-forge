import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTheme } from "@rneui/themed";
import { Platform, View } from "react-native";
import { format } from "../services/datetime";
import dayjs from "dayjs";
import Typography from "./typography";
import Button from "./button";

const isIOS = Platform.OS === "ios";

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
  const { theme } = useTheme();

  const onChange = (_event: DateTimePickerEvent, selectedDate: Date) => {
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

  if (isIOS)
    return (
      <View style={{ alignItems: "flex-start", marginVertical: 8 }}>
        <Typography
          style={{
            marginLeft: 8,
            color: theme.colors.grey3,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {label}
        </Typography>
        <DateTimePicker
          value={new Date(date)}
          mode={mode}
          onChange={onChange}
          style={{ marginLeft: 24 }}
        />
      </View>
    );
  return (
    <View
      style={{ alignItems: "flex-start", marginVertical: 8, marginLeft: 8 }}
    >
      <Typography
        style={{
          color: theme.colors.grey3,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        {label}
      </Typography>
      <View style={{ marginLeft: 24, flexDirection: "row" }}>
        {mode.includes("date") && (
          <Button
            type="outline"
            onPress={showDate}
            title={format(date, "date")}
          />
        )}
        {mode.includes("time") && (
          <Button
            type="outline"
            onPress={showTime}
            title={format(date, "time")}
          />
        )}
      </View>
    </View>
  );
}

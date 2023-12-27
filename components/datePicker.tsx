import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTheme } from "@rneui/themed";
import { Platform, View } from "react-native";
import { Button, Typography } from ".";
import { format } from "../services/date";
import dayjs from "dayjs";

const isIOS = Platform.OS === "ios";

export default function DatePicker({
  date,
  setDate,
  label,
}: {
  date: number;
  setDate: (date: number) => void;
  label: string;
}) {
  const { theme } = useTheme();

  const onChange = (_event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(dayjs(currentDate).valueOf());
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: new Date(date),
      onChange,
      mode: "date",
      minimumDate: new Date(),
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
          testID="dateTimePicker"
          value={new Date(date)}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          style={{ marginLeft: 24 }}
          minimumDate={new Date()}
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
      <View style={{ marginLeft: 24 }}>
        <Button
          type="outline"
          onPress={showMode}
          title={format(date, "date")}
        />
      </View>
    </View>
  );
}

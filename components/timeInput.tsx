import { Input } from "@rneui/themed";
import { View } from "react-native";
import Typography from "./typography";

export const minutesToHrMm = (minutes: number) => {
  const hour = minutes / 60;
  const minute = minutes % 60;
  return [Math.floor(hour), minute];
};

export const hrMmToSeconds = (hour: number, minute: number) => {
  return hour * 60 + minute;
};
export default function TimeInput({
  value,
  color,
  onChange,
}: {
  value: number;
  color?: string;
  onChange: (value: number) => void;
}) {
  const [hh, mm] = minutesToHrMm(value);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <Input
          value={String(hh)}
          rightIcon={<Typography style={{ color }}>hr</Typography>}
          style={{ color }}
          onChangeText={(text) => {
            const value = Number(text);
            if (Number.isNaN(value)) return 0;
            onChange(hrMmToSeconds(value, mm));
          }}
          keyboardType="numbers-and-punctuation"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Input
          value={String(mm)}
          rightIcon={<Typography style={{ color }}>mm</Typography>}
          style={{ color }}
          onChangeText={(text) => {
            const value = Number(text);
            if (Number.isNaN(value)) return 0;
            onChange(hrMmToSeconds(hh, value));
          }}
          keyboardType="numbers-and-punctuation"
        />
      </View>
    </View>
  );
}

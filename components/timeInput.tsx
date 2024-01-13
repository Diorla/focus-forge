import { Input } from "@rneui/themed";
import { View } from "react-native";
import Typography from "./typography";
import { hrMmToSeconds, secondsToHrMm } from "../services/datetime";

export default function TimeInput({
  value,
  color,
  onChange,
  errorMessage,
  onFocus,
}: {
  value: number;
  color?: string;
  onChange: (value: number) => void;
  errorMessage?: string;
  onFocus?: () => void;
}) {
  const [hh, mm, ss] = secondsToHrMm(value);

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
            onChange(hrMmToSeconds(value, mm, ss));
          }}
          keyboardType="numbers-and-punctuation"
          errorMessage={errorMessage}
          onFocus={onFocus}
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
            onChange(hrMmToSeconds(hh, value, ss));
          }}
          keyboardType="numbers-and-punctuation"
          onFocus={onFocus}
        />
      </View>
    </View>
  );
}

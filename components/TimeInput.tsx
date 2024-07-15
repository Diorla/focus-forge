import { Input } from "@rneui/themed";
import { hrMmToSeconds, secondsToHrMm } from "../services/datetime";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import ThemedInput from "./ThemedInput";
import { ViewStyle } from "react-native";
import useUser from "@/context/user/useUser";

export default function TimeInput({
  value,
  color,
  onChange,
  errorMessage,
  onFocus,
  label,
  containerStyle,
}: {
  value: number;
  color?: string;
  onChange: (value: number) => void;
  errorMessage?: string;
  onFocus?: () => void;
  label?: string;
  containerStyle?: ViewStyle;
}) {
  const [hh, mm, ss] = secondsToHrMm(value);
  const { theme } = useUser();

  const currentColor = color || theme.grey0;
  return (
    <ThemedView style={containerStyle}>
      {label && (
        <ThemedText
          style={{
            color: currentColor,
            marginLeft: 8,
            fontWeight: "bold",
          }}
        >
          {label}
        </ThemedText>
      )}
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedView style={{ flex: 1 }}>
          <ThemedInput
            value={String(hh)}
            rightIcon={
              <ThemedText style={{ color: currentColor }}>hr</ThemedText>
            }
            style={{ color: currentColor }}
            onChangeText={(text) => {
              const value = Number(text);
              if (Number.isNaN(value)) return 0;
              onChange(hrMmToSeconds(value, mm, ss));
            }}
            keyboardType="numbers-and-punctuation"
            errorMessage={errorMessage}
            onFocus={onFocus}
          />
        </ThemedView>
        <ThemedView style={{ flex: 1 }}>
          <Input
            value={String(mm)}
            rightIcon={
              <ThemedText style={{ color: currentColor }}>mm</ThemedText>
            }
            style={{ color: currentColor }}
            onChangeText={(text) => {
              const value = Number(text);
              if (Number.isNaN(value)) return 0;
              onChange(hrMmToSeconds(hh, value, ss));
            }}
            keyboardType="numbers-and-punctuation"
            onFocus={onFocus}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

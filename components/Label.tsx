import { StyleProp, TextStyle } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Label({
  label,
  style,
}: {
  label: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <ThemedText
      style={[
        {
          marginLeft: 8,
          fontWeight: "bold",
        },
        style,
      ]}
    >
      {label}
    </ThemedText>
  );
}

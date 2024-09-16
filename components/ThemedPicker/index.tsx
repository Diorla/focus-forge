import { Picker as RNPicker } from "@react-native-picker/picker";
import { ThemedView } from "../ThemedView";
import useUser from "@/context/user/useUser";
import ThemedPickerProps from "./ThemedPickerProps";
import Label from "../Label";

export default function ThemedPicker({
  label,
  value,
  onValueChange,
  list,
  labelStyle = {},
}: ThemedPickerProps) {
  const { theme } = useUser();
  return (
    <ThemedView>
      <Label label={label || ""} style={labelStyle} />
      <RNPicker
        itemStyle={{ color: theme.text }}
        selectedValue={value}
        onValueChange={onValueChange}
        style={{ color: theme.grey0, backgroundColor: theme.background }}
      >
        {list.map((item, idx) => (
          <RNPicker.Item key={idx} {...item} style={{ fontSize: 16 }} />
        ))}
      </RNPicker>
    </ThemedView>
  );
}

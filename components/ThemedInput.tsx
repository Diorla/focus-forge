import { useThemeColor } from "@/hooks/useThemeColor";
import { InputProps } from "@rneui/base";
import { Input } from "@rneui/themed";

export default function ThemedInput(props: InputProps) {
  const theme = useThemeColor();
  return (
    <Input
      {...props}
      labelStyle={[{ color: theme.grey0 }, props.labelStyle]}
      inputStyle={[{ color: theme.grey0 }, props.inputStyle]}
      placeholderTextColor={props.placeholderTextColor || theme.grey2}
      label={props.label}
    />
  );
}

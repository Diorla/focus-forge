import useUser from "@/context/user/useUser";
import { InputProps } from "@rneui/base";
import { Input } from "@rneui/themed";

export default function ThemedInput(props: InputProps) {
  const { theme } = useUser();
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

import {
  ButtonProps as RNButtonProps,
  Button as RNButton,
  useTheme,
} from "@rneui/themed";
import { Platform } from "react-native";

export default function Button(props: RNButtonProps) {
  const {
    theme: { colors },
  } = useTheme();
  const { color } = props;

  const colorType = color || "primary";
  const currentColor = colors[colorType as string];
  if (Platform.OS === "ios")
    return (
      <RNButton type="clear" {...props} titleStyle={{ color: currentColor }} />
    );
  return <RNButton {...props} />;
}

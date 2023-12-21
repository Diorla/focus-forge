import { useTheme } from "@rneui/themed";
import { Text, TextStyle } from "react-native";

export default function Typography({
  type,
  children,
  color,
  style,
}: {
  type?: "bigHeader" | "header" | "big" | "body" | "small" | "caption";
  children: (string | number)[] | string | number;
  color?: string;
  style?: TextStyle;
}) {
  let size = 16;
  if (type === "bigHeader") size = 30;
  if (type === "header") size = 24;
  if (type === "big") size = 20;
  if (type === "small" || type === "caption") size = 14;
  const {
    theme: { colors },
  } = useTheme();
  const clr = color || colors.black;
  return (
    <Text
      style={[
        {
          fontSize: size,
          fontStyle: type === "caption" ? "italic" : "normal",
          color: clr,
        },
        { ...style },
      ]}
    >
      {children}
    </Text>
  );
}

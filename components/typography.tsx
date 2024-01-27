import { useTheme } from "@rneui/themed";
import { Text, TextStyle } from "react-native";

export interface TypographyProps {
  type?:
    | "bigHeader"
    | "header"
    | "big"
    | "body"
    | "small"
    | "caption"
    | "label";
  children: (string | number)[] | string | number;
  color?: string;
  style?: TextStyle;
}

export default function Typography({
  type,
  children,
  color,
  style,
}: TypographyProps) {
  const {
    theme: { colors },
  } = useTheme();
  const clr = color || colors.black;
  let size = 16;
  if (type === "bigHeader") size = 30;
  if (type === "header") size = 24;
  if (type === "big") size = 20;
  if (type === "small" || type === "caption") size = 14;

  if (type === "label")
    return (
      <Text
        style={[
          {
            fontSize: size,
            marginLeft: 8,
            color: color ?? colors.grey3,
            fontWeight: "bold",
          },
          { ...style },
        ]}
      >
        {children}
      </Text>
    );
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

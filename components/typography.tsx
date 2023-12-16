import { Text } from "react-native";

export default function Typography({
  type,
  children,
  color,
}: {
  type?: "bigHeader" | "header" | "big" | "body" | "small" | "caption";
  children: string;
  color?: string;
}) {
  let size = 16;
  if (type === "bigHeader") size = 30;
  if (type === "header") size = 24;
  if (type === "big") size = 20;
  if (type === "small" || type === "caption") size = 14;
  return (
    <Text
      style={{
        fontSize: size,
        fontStyle: type === "caption" ? "italic" : "normal",
        color,
      }}
    >
      {children}
    </Text>
  );
}

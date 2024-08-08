import type { ButtonProps, ViewStyle } from "react-native";

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "link";
  style?: ViewStyle;
  color?: string;
  outlined?: boolean;
  loading?: boolean;
};

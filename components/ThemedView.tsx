import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  transparent?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  transparent,
  ...otherProps
}: ThemedViewProps) {
  const { background } = useThemeColor();
  return (
    <View
      style={[
        { backgroundColor: transparent ? "transparent" : background },
        style,
      ]}
      {...otherProps}
    />
  );
}

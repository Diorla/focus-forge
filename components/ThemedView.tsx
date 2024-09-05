import { View, type ViewProps } from "react-native";

import useUser from "@/context/user/useUser";

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
  const { theme } = useUser();
  const { background } = theme;
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

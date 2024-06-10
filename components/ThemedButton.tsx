import {
  Text,
  StyleSheet,
  Pressable,
  type ButtonProps,
  type ViewStyle,
  View,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "link";
  style?: ViewStyle;
  color?: string;
  outlined?: boolean;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  title,
  color: currenColor,
  outlined,
  disabled,
  ...rest
}: ThemedButtonProps) {
  const theme = useThemeColor();
  const color = currenColor || theme.secondary;

  return (
    <Pressable>
      <View
        style={[
          style,
          outlined
            ? {
                ...styles.outlined,
                borderColor: color,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }
            : undefined,
        ]}
      >
        <Text
          style={[
            { color: color || theme.text },
            type === "link"
              ? { ...styles.link, color: theme.secondary }
              : undefined,
            type === "default" ? styles.default : undefined,
            disabled ? styles.disabled : undefined,
          ]}
          {...rest}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
  outlined: {
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});

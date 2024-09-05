import { Text, Pressable, ActivityIndicator } from "react-native";
import { ThemedView } from "../ThemedView";
import useUser from "@/context/user/useUser";
import { ThemedButtonProps } from "./ThemedButtonProps";
import { styles } from "./styles";

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  title,
  color: currenColor,
  outlined,
  disabled,
  loading,
  ...rest
}: ThemedButtonProps) {
  const { theme } = useUser();
  const color = currenColor || theme.secondary;

  return (
    <Pressable disabled={disabled || loading}>
      <ThemedView
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "transparent",
          },
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
        {loading ? <ActivityIndicator /> : null}
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
      </ThemedView>
    </Pressable>
  );
}

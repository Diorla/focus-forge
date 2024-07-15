/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

export function useThemeColor(mode?: "light" | "dark" | "") {
  const theme = mode ? mode : useColorScheme();
  if (theme === "dark") return Colors.dark;
  return Colors.light;
}

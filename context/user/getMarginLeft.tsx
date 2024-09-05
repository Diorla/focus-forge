import { Dimensions } from "react-native";

export default function getMarginLeft(width: number) {
  const left = (Dimensions.get("window").width - width) / 2;
  if (left < 0) return 0;
  return left;
}

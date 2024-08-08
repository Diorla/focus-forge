import { TextStyle } from "react-native";

export default interface ThemedPickerProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  list: {
    label: string;
    value: string;
  }[];
  labelStyle?: TextStyle;
}

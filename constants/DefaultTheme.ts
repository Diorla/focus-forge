import { Theme } from "@react-navigation/native";
import { Colors } from "./Colors";

const DarkTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.grey5,
    notification: Colors.light.secondary,
  },
};

export default DarkTheme;

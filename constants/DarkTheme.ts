import { Theme } from "@react-navigation/native";
import { Colors } from "./Colors";

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.grey5,
    notification: Colors.dark.secondary,
  },
};

export default DarkTheme;

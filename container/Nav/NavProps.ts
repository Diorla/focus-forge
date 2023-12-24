import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "./RootStackParamList";

type NavProps = NativeStackNavigationProp<
  RootStackParamList,
  "Activity" | "Add"
>;

export default NavProps;

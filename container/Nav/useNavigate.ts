import { useNavigation } from "@react-navigation/native";
import NavProps from "./NavProps";
import RootStackParamList from "./RootStackParamList";

export default function useNavigate<Params>() {
  const { navigate: navigator } = useNavigation<NavProps>();
  const navigate = (path: keyof RootStackParamList, params?: Params) =>
    navigator(path, params as undefined);
  return navigate;
}

import { useNavigation } from "@react-navigation/native";
import NavProps from "../container/Nav/NavProps";
import RootStackParamList from "../container/Nav/RootStackParamList";

export default function useNavigate() {
  const { navigate: navigator } = useNavigation<NavProps>();
  const navigate = (
    path: keyof RootStackParamList,
    params?: Record<string, any>
  ) => navigator(path, params as undefined);
  return navigate;
}

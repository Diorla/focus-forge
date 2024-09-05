import useUser from "@/context/user/useUser";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function BottomRight({
  taskRemaining,
  toggleModal,
}: {
  taskRemaining: number;
  toggleModal: () => void;
}) {
  const { theme } = useUser();
  return (
    <TouchableOpacity onPress={toggleModal}>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="list" size={24} color={theme.text} />
        <ThemedText>{taskRemaining}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

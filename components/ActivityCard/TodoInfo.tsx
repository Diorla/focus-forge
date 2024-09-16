import useUser from "@/context/user/useUser";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import CardProps from "./CardProps";
import Checklist from "@/context/schedule/Checklist";
import { Divider } from "@rneui/themed";

export default function TodoInfo({ item }: CardProps) {
  const { theme } = useUser();
  const { remaining } = item as Checklist;
  return (
    <ThemedView
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
      }}
    >
      <ThemedText>{remaining}x</ThemedText>
      <Divider
        color={theme.grey5}
        style={{ width: "50%", marginVertical: 2 }}
      />
      <ThemedText>Remaining</ThemedText>
    </ThemedView>
  );
}

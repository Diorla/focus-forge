import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import CardProps from "./CardProps";
import Checklist from "@/context/schedule/Checklist";

export default function TodoInfo({ item }: CardProps) {
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
    </ThemedView>
  );
}

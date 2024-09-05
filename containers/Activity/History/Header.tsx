import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Header({ toggleForm }: { toggleForm: () => void }) {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ThemedText
        type="subtitle"
        style={{ textAlign: "center", marginBottom: 4 }}
      >
        History
      </ThemedText>
      <ThemedButton onPress={() => toggleForm()} title="Add"></ThemedButton>
    </ThemedView>
  );
}

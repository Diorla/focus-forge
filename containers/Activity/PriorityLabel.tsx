import { Chip } from "@rneui/themed";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

export default function PriorityLabel({ priority }: { priority: number }) {
  const theme = useThemeColor();
  if (priority === 3)
    return (
      <ThemedView
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Chip buttonStyle={{ backgroundColor: theme.error }}>High</Chip>
      </ThemedView>
    );
  if (priority === 2)
    return (
      <ThemedView
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Chip buttonStyle={{ backgroundColor: theme.warning }}>Medium</Chip>
      </ThemedView>
    );
  if (priority === 1)
    return (
      <ThemedView
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Chip buttonStyle={{ backgroundColor: theme.success }}>Low</Chip>
      </ThemedView>
    );
  return (
    <ThemedView
      style={{
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Chip buttonStyle={{ backgroundColor: theme.grey0 }}>None</Chip>
    </ThemedView>
  );
}

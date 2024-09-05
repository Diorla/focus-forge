import { Chip } from "@rneui/themed";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";

export default function PriorityLabel({ priority }: { priority: number }) {
  const { theme } = useUser();
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
      <Chip
        buttonStyle={{ backgroundColor: theme.grey5 }}
        titleStyle={{ color: theme.text }}
      >
        None
      </Chip>
    </ThemedView>
  );
}

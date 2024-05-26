import { View } from "react-native";
import { Chip, useTheme } from "@rneui/themed";

export default function PriorityLabel({ priority }: { priority: number }) {
  const { theme } = useTheme();
  if (priority === 3)
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.colors.error }}>High</Chip>
      </View>
    );
  if (priority === 2)
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.colors.warning }}>
          Medium
        </Chip>
      </View>
    );
  if (priority === 1)
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.colors.success }}>Low</Chip>
      </View>
    );
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Chip buttonStyle={{ backgroundColor: theme.colors.grey0 }}>None</Chip>
    </View>
  );
}

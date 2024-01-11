import { View } from "react-native";
import { Chip, useTheme } from "@rneui/themed";
import { Priority } from "../../models/Activity";

export default function PriorityLabel({ priority }: { priority: Priority }) {
  const { theme } = useTheme();
  if (priority === "high")
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.colors.error }}>High</Chip>
      </View>
    );
  if (priority === "medium")
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.colors.warning }}>
          Medium
        </Chip>
      </View>
    );
  if (priority === "low")
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

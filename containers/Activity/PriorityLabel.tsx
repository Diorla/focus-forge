import { View } from "react-native";
import { Chip } from "@rneui/themed";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function PriorityLabel({ priority }: { priority: number }) {
  const theme = useThemeColor();
  if (priority === 3)
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.error }}>High</Chip>
      </View>
    );
  if (priority === 2)
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.warning }}>Medium</Chip>
      </View>
    );
  if (priority === 1)
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Chip buttonStyle={{ backgroundColor: theme.success }}>Low</Chip>
      </View>
    );
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Chip buttonStyle={{ backgroundColor: theme.grey0 }}>None</Chip>
    </View>
  );
}

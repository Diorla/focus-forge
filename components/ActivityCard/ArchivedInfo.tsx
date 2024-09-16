import ActivityModel from "@/context/data/model/ActivityModel";
import { format } from "@/services/datetime";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Divider } from "@rneui/themed";
import useUser from "@/context/user/useUser";

export default function ArchivedInfo({ item }: { item: ActivityModel }) {
  const { theme } = useUser();
  const { archived } = item;
  return (
    <ThemedView
      style={{
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <ThemedText>{format(archived, "date")}</ThemedText>
      <Divider
        color={theme.grey5}
        style={{ width: "50%", marginVertical: 2 }}
      />
      <ThemedText>Archived</ThemedText>
    </ThemedView>
  );
}

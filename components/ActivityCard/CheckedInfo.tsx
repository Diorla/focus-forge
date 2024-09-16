import ActivityModel from "@/context/data/model/ActivityModel";
import { format } from "@/services/datetime";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import dayjs from "dayjs";
import { Divider } from "@rneui/themed";
import useUser from "@/context/user/useUser";

export default function CheckedInfo({ item }: { item: ActivityModel }) {
  const { theme } = useUser();
  const { done } = item;
  const lastDone = Object.keys(done).sort((a, b) => dayjs(a).diff(b))[0];
  return (
    <ThemedView
      style={{
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <ThemedText>{format(lastDone, "date")}</ThemedText>
      <Divider
        color={theme.grey5}
        style={{ width: "50%", marginVertical: 2 }}
      />
      <ThemedText>Last done</ThemedText>
    </ThemedView>
  );
}

import ActivityModel from "@/context/data/model/ActivityModel";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import dayjs from "dayjs";
import { Divider } from "@rneui/themed";
import useUser from "@/context/user/useUser";

export default function CheckedInfo({ item }: { item: ActivityModel }) {
  const { theme } = useUser();
  const { lastDone } = item;
  return (
    <ThemedView
      style={{
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <ThemedText>{dayjs(lastDone).fromNow()}</ThemedText>
      <Divider
        color={theme.grey5}
        style={{ width: "50%", marginVertical: 2 }}
      />
      <ThemedText>Last done</ThemedText>
    </ThemedView>
  );
}

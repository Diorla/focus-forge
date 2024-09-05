import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";
import { TouchableOpacity } from "react-native";
import HistoryProps from "./HistoryProps";
import EditForm from "./EditForm";
import { useState } from "react";
import CompletedInfo from "./CompletedInfo";

export default function HistoryItem({
  item,
  activityId,
  isOccurrence,
}: {
  item: HistoryProps;
  activityId: string;
  isOccurrence: boolean;
}) {
  const { theme } = useUser();
  const [editForm, setEditForm] = useState(false);

  return (
    <ThemedView
      style={{
        backgroundColor: theme.grey5,
        marginBottom: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
      }}
    >
      <TouchableOpacity onPress={() => setEditForm(true)}>
        <ThemedView
          transparent
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingVertical: 2,
            alignItems: "center",
          }}
        >
          <ThemedText>{item.time}</ThemedText>
          <CompletedInfo isOccurrence={isOccurrence} value={item.length} />
        </ThemedView>
      </TouchableOpacity>
      <ThemedText>{item.comment}</ThemedText>
      {editForm && (
        <EditForm
          isOccurrence={isOccurrence}
          item={item}
          closeModal={() => {
            setEditForm(false);
          }}
          activityId={activityId}
        />
      )}
    </ThemedView>
  );
}

import { useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import DoneType from "@/context/data/types/DoneType";
import { ThemedView } from "@/components/ThemedView";
import HistoryProps from "./HistoryProps";
import dayjs from "dayjs";
import updateActivity from "@/services/database/updateActivity";
import useDataQuery from "@/context/data/useDataQuery";
import Form from "./Form";
import useUser from "@/context/user/useUser";

export default function EditForm({
  isOccurrence,
  item,
  closeModal,
  activityId,
}: {
  isOccurrence: boolean;
  item: HistoryProps;
  closeModal: () => void;
  activityId: string;
}) {
  const [doneItem, setDoneItem] = useState<DoneType>({
    comment: item.comment,
    datetime: dayjs(item.datetime).valueOf(),
    length: item.length,
  });
  const { theme } = useUser();
  const { activityList } = useDataQuery();
  const activity = activityList.find((a) => a.id === activityId);
  const updateDone = () => {
    const key = item.id;
    updateActivity({ id: activityId, done: { [key]: doneItem } });
  };

  const deleteDone = () => {
    if (!activity) return;
    const { done = {} } = activity;
    const temp = { ...done };
    delete temp[item.id];
    updateActivity({ ...activity, id: activity.id, done: temp }, false);
  };

  return (
    <ThemedView style={{ justifyContent: "center", flex: 1 }}>
      <Form
        doneItem={doneItem}
        setDoneItem={setDoneItem}
        isOccurrence={isOccurrence}
      />
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <ThemedButton
          onPress={() => {
            if (doneItem.length || isOccurrence) {
              updateDone();
              closeModal();
              setDoneItem({
                comment: "",
                datetime: Date.now(),
                length: 0,
              });
            }
          }}
          style={{ marginHorizontal: 8 }}
          title="Save"
        />
        <ThemedButton
          onPress={() => closeModal()}
          style={{ marginHorizontal: 8 }}
          title="Cancel"
        />
      </ThemedView>
      <ThemedView style={{ alignItems: "center" }}>
        <ThemedButton
          onPress={deleteDone}
          style={{ marginHorizontal: 8 }}
          title="Delete"
          color={theme.error}
        />
      </ThemedView>
    </ThemedView>
  );
}

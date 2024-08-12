import * as React from "react";
import { CheckBox, Input } from "@rneui/themed";
import { useState } from "react";
import DoneType from "../../context/data/types/DoneType";
import { getDateTimeKey } from "../../services/datetime";
import DatePicker from "@/components/DateTimePicker";
import { ThemedButton } from "@/components/ThemedButton";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import ActivityModel from "@/context/data/model/ActivityModel";

export default function HistoryModal({
  activity,
  visible,
  closeModal,
}: {
  activity: ActivityModel;
  visible: boolean;
  closeModal: () => void;
}) {
  const { done = {} } = activity;

  const [newTime, setNewTime] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 1,
  });

  const createDone = (data: DoneType) => {
    const key = getDateTimeKey(data.datetime);
    updateActivity({ id: activity.id, done: { ...done, [key]: data } });
  };

  return (
    <ThemedModal visible={visible}>
      <ThemedView style={{ justifyContent: "center", flex: 1 }}>
        <Input
          label="Note"
          value={newTime.comment}
          onChangeText={(comment) => setNewTime({ ...newTime, comment })}
          multiline
          placeholder="Describe the activity"
        />
        <ThemedView>
          <CheckBox
            checked={!!newTime.length}
            onPress={() => {
              setNewTime({
                ...newTime,
                length: newTime.length ? 0 : 1,
              });
            }}
            title="Completed"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </ThemedView>
        <DatePicker
          date={newTime.datetime}
          setDate={(datetime) => setNewTime({ ...newTime, datetime })}
          label="Date time"
          mode="datetime"
        />
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <ThemedButton
            onPress={() => {
              createDone(newTime);
              closeModal();
              setNewTime({
                comment: "",
                datetime: Date.now(),
                length: 1,
              });
            }}
            title="Save"
            outlined
            style={{ marginRight: 10 }}
          />
          <ThemedButton
            onPress={() => closeModal()}
            title="Cancel"
            outlined
            style={{ marginRight: 10 }}
          />
        </ThemedView>
      </ThemedView>
    </ThemedModal>
  );
}

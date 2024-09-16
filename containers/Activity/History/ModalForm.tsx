import { useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import DoneType from "@/context/data/types/DoneType";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import ActivityModel from "@/context/data/model/ActivityModel";
import uuid from "react-native-uuid";
import Form from "./Form";
import { ThemedText } from "@/components/ThemedText";

export default function ModalForm({
  activity,
  visible,
  closeModal,
}: {
  activity: ActivityModel;
  visible: boolean;
  closeModal: () => void;
}) {
  const [doneItem, setDoneItem] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 0,
  });

  const { done, isOccurrence } = activity;

  const createDone = (data: DoneType) => {
    const key = uuid.v4().toString();
    updateActivity({ id: activity.id, done: { ...done, [key]: data } });
    setDoneItem({
      comment: "",
      datetime: Date.now(),
      length: 0,
    });
    closeModal();
  };

  return (
    <ThemedModal visible={visible}>
      <ThemedView style={{ justifyContent: "center", flex: 1 }}>
        <ThemedText
          type="title"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          {activity.name}
        </ThemedText>
        <Form
          doneItem={doneItem}
          isOccurrence={isOccurrence}
          setDoneItem={setDoneItem}
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
                createDone(doneItem);
              }
            }}
            style={{ marginHorizontal: 8 }}
            title="Save"
          ></ThemedButton>
          <ThemedButton
            onPress={() => closeModal()}
            style={{ marginHorizontal: 8 }}
            title="Cancel"
          ></ThemedButton>
        </ThemedView>
      </ThemedView>
    </ThemedModal>
  );
}

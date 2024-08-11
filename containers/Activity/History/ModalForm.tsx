import { useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import DoneType from "@/context/data/types/DoneType";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import ActivityModel from "@/context/data/model/ActivityModel";
import uuid from "react-native-uuid";
import Form from "./Form";

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
  };

  return (
    <ThemedModal visible={visible}>
      <ThemedView style={{ justifyContent: "center", flex: 1 }}>
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
              if (doneItem.length) {
                createDone(doneItem);
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

import { ScrollView } from "react-native";
import { Divider } from "@rneui/themed";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import React from "react";
import Checklist from "@/components/Checklist";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import ActivityModel from "@/context/data/model/ActivityModel";

export default function ChecklistModal({
  activity,
  visible,
  closeModal,
}: {
  activity: ActivityModel;
  visible: boolean;
  closeModal: () => void;
}) {
  return (
    <ThemedModal visible={visible} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 52 }}>
        <ThemedText
          type="title"
          style={{ textAlign: "center", paddingVertical: 4 }}
        >
          {activity.name}
        </ThemedText>
        <Divider />
        <Checklist activity={activity} />
      </ScrollView>
      <ThemedView style={{ margin: "auto" }}>
        <ThemedButton
          onPress={closeModal}
          style={{ marginBottom: 25 }}
          title="Close"
        />
      </ThemedView>
    </ThemedModal>
  );
}

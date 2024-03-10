import { Button, Typography } from "../../components";
import { Modal, ScrollView } from "react-native";
import { Divider } from "@rneui/themed";
import Schedule from "../../context/activity/Schedule";
import TopSpace from "../../components/topSpace";
import Task from "../Activity/Task";

export default function ChecklistModal({
  activity,
  visible,
  closeModal,
}: {
  activity: Schedule;
  visible: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal visible={visible} style={{ flex: 1 }}>
      <TopSpace />
      <ScrollView style={{ flex: 1 }}>
        <Typography
          type="header"
          style={{ textAlign: "center", paddingVertical: 4 }}
        >
          {activity.name}
        </Typography>
        <Divider />
        <Task activity={activity} />
      </ScrollView>
      <Button onPress={closeModal} style={{ marginBottom: 25 }}>
        Close
      </Button>
    </Modal>
  );
}

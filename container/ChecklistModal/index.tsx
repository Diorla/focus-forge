import { Button, Typography } from "../../components";
import { Modal, ScrollView, View } from "react-native";
import { useState } from "react";
import { CheckBox, Divider, Input } from "@rneui/themed";
import uncheckTask from "../../services/database/uncheckTask";
import checkTask from "../../services/database/checkTask";
import createTask from "../../services/database/createTask";
import { Schedule } from "../../context/activity/getSchedule";
import TopSpace from "../../components/topSpace";

export default function ChecklistModal({
  activity,
  visible,
  closeModal,
}: {
  activity: Schedule;
  visible: boolean;
  closeModal: () => void;
}) {
  const { tasks } = activity;
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [task, setTask] = useState("");
  const [showAll, setShowAll] = useState(false);
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
        <View style={{ flex: 1, padding: 4 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography type="big">Checklist</Typography>
            <Button onPress={() => setShowAll(!showAll)}>
              {showAll ? "Hide completed" : "Show all"}
            </Button>
          </View>
          {tasks
            .filter((item) => {
              if (showAll) return true;
              return !item.checked;
            })
            .sort((a, b) => a.created - b.created)
            .map((item) => {
              return (
                <CheckBox
                  key={item.created}
                  checked={!!item.checked}
                  onPress={() =>
                    item.checked
                      ? uncheckTask(activity, item.created)
                      : checkTask(activity, item.created)
                  }
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  title={item.title}
                />
              );
            })}
          {showAddNewTask ? (
            <View>
              <Input value={task} onChangeText={(task) => setTask(task)} />
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Button
                  disabled={!task}
                  onPress={() =>
                    createTask(activity, task).then(() =>
                      setShowAddNewTask(!showAddNewTask)
                    )
                  }
                >
                  Save
                </Button>
                <Button onPress={() => setShowAddNewTask(!showAddNewTask)}>
                  Cancel
                </Button>
              </View>
            </View>
          ) : null}
          {showAddNewTask ? null : (
            <View>
              <Button onPress={() => setShowAddNewTask(!showAddNewTask)}>
                New task
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
      <Button onPress={closeModal} style={{ marginBottom: 25 }}>
        Close
      </Button>
    </Modal>
  );
}

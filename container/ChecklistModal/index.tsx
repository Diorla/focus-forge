import { Button, Typography } from "../../components";
import { Modal, ScrollView, View } from "react-native";
import { useState } from "react";
import { CheckBox, Divider, Input } from "@rneui/themed";
import Schedule from "../../context/activity/Schedule";
import TopSpace from "../../components/topSpace";
import { MaterialIcons } from "@expo/vector-icons";
import useActivity from "../../context/activity/useActivity";
import TaskModel from "../../services/db/schema/Task/Model";
import uuid from "react-native-uuid";
import KeyboardWrapper from "../KeyboardWrapper";

export default function ChecklistModal({
  activity,
  visible,
  closeModal,
}: {
  activity: Schedule;
  visible: boolean;
  closeModal: () => void;
}) {
  const { updateTask, createTask, deleteTask } = useActivity();
  const { tasks } = activity;
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [task, setTask] = useState<TaskModel>({
    id: String(uuid.v4()),
    title: "",
    checked: 0,
    created: Date.now(),
    activityId: activity.id,
  });
  const [showAll, setShowAll] = useState(false);

  const checkTask = (id: string) => {
    updateTask(id, { checked: Date.now() });
  };
  const uncheckTask = (id: string) => {
    updateTask(id, { checked: 0 });
  };

  return (
    <KeyboardWrapper>
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
                  <View
                    key={item.created}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <CheckBox
                        checked={!!item.checked}
                        onPress={() =>
                          item.checked
                            ? uncheckTask(item.id)
                            : checkTask(item.id)
                        }
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        title={item.title}
                      />
                    </View>
                    <MaterialIcons
                      name="delete"
                      size={28}
                      color="black"
                      onPress={() => deleteTask(item.id)}
                    />
                  </View>
                );
              })}
            {showAddNewTask ? (
              <View>
                <Input
                  value={task.title}
                  onChangeText={(title) =>
                    setTask({
                      ...task,
                      title,
                    })
                  }
                  multiline
                />
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Button
                    disabled={!task}
                    onPress={() =>
                      createTask(task).then(() => {
                        setShowAddNewTask(!showAddNewTask);
                        setTask({
                          id: String(uuid.v4()),
                          title: "",
                          checked: 0,
                          created: Date.now(),
                          activityId: activity.id,
                        });
                      })
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
    </KeyboardWrapper>
  );
}

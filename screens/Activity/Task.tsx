import { Button, Typography } from "../../components";
import { View } from "react-native";
import { useState } from "react";
import { CheckBox, Input } from "@rneui/themed";
import Schedule from "../../context/activity/Schedule";
import { MaterialIcons } from "@expo/vector-icons";
import useActivity from "../../context/activity/useActivity";
import uuid from "react-native-uuid";

export default function Task({ activity }: { activity: Schedule }) {
  const { updateTask, createTask, deleteTask } = useActivity();
  const { tasks } = activity;
  const [taskList, setTaskList] = useState(tasks);
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [task, setTask] = useState({
    id: String(uuid.v4()),
    title: "",
    checked: 0,
    created: Date.now(),
    activityId: activity.id,
  });
  const [showAll, setShowAll] = useState(false);

  const checkTask = (id: string) => {
    setTaskList(
      taskList.map((i) => (i.id === id ? { ...i, checked: Date.now() } : i))
    );
    updateTask(id, { checked: Date.now() });
  };
  const uncheckTask = (id: string) => {
    setTaskList(taskList.map((i) => (i.id === id ? { ...i, checked: 0 } : i)));
    updateTask(id, { checked: 0 });
  };

  return (
    <>
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
      {taskList
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
                  onPress={() => {
                    if (item.checked) {
                      uncheckTask(item.id);
                    } else {
                      checkTask(item.id);
                    }
                  }}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  title={item.title}
                  textStyle={{ flexWrap: "wrap" }}
                />
              </View>
              <MaterialIcons
                name="delete"
                size={28}
                color="black"
                onPress={() => {
                  deleteTask(item.id);
                  setTaskList(taskList.filter((i) => i.id !== item.id));
                }}
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
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              disabled={!task}
              onPress={() =>
                createTask(task)
                  .then(() => {
                    setTask({
                      id: String(uuid.v4()),
                      title: "",
                      checked: 0,
                      created: Date.now(),
                      activityId: activity.id,
                    });
                    setTaskList([...taskList, task]);
                  })
                  .then(() => setShowAddNewTask(!showAddNewTask))
              }
              containerStyle={{
                marginRight: 8,
              }}
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
    </>
  );
}

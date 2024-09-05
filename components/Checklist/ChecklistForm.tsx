import { Input } from "@rneui/themed";
import { ThemedButton } from "../ThemedButton";
import KeyboardWrapper from "../KeyboardWrapper";
import { ThemedView } from "../ThemedView";
import { useState } from "react";
import updateActivity from "@/services/database/updateActivity";
import FormProps from "./FormProps";

export default function ChecklistForm({
  activity,
  taskList,
  setTaskList,
  setShowAddNewTask,
  showAddNewTask,
}: FormProps) {
  const [task, setTask] = useState({
    title: "",
    checked: 0,
    created: Date.now(),
  });
  const { tasks } = activity;
  const createTask = () => {
    setTaskList((prev) => [...prev, { ...task, id: String(task.created) }]);
    updateActivity({
      tasks: {
        ...tasks,
        [task.created]: task,
      },
      id: activity.id,
    });

    setTask({
      title: "",
      checked: 0,
      created: Date.now(),
    });
    setShowAddNewTask(false);
  };
  return (
    <ThemedView>
      <KeyboardWrapper>
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
      </KeyboardWrapper>
      <ThemedView style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <ThemedButton
          disabled={!task}
          onPress={() => {
            createTask();
            setTask({
              title: "",
              checked: 0,
              created: Date.now(),
            });
            setTaskList([...taskList, task]);
            setShowAddNewTask(!showAddNewTask);
          }}
          style={{
            marginRight: 8,
          }}
          title="Save"
        />
        <ThemedButton
          onPress={() => setShowAddNewTask(!showAddNewTask)}
          title="Cancel"
        />
      </ThemedView>
    </ThemedView>
  );
}

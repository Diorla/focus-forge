import React, { useEffect, useState } from "react";
import { CheckBox, Input } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import Confirm from "@/components/Confirm";
import KeyboardWrapper from "@/components/KeyboardWrapper";
import Checklist from "@/context/schedule/Checklist";
import Schedule from "@/context/schedule/Schedule";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";

export default function Task({ activity }: { activity: Schedule | Checklist }) {
  const theme = useThemeColor();
  const { tasks } = activity;
  const [taskList, setTaskList] = useState<
    { title: string; checked: number; created: number }[]
  >([]);
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [task, setTask] = useState({
    title: "",
    checked: 0,
    created: Date.now(),
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    Object.keys(tasks).forEach((key) => {
      setTaskList((prev) => [...prev, { ...tasks[key], created: Number(key) }]);
    });
  }, [activity.id]);

  const checkTask = (id: number) => {
    setTaskList(
      taskList.map((i) =>
        i.created === id ? { ...i, checked: Date.now() } : i
      )
    );
    updateActivity({
      id: activity.id,
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], checked: Date.now() },
      },
    });
  };

  const uncheckTask = (id: number) => {
    setTaskList(
      taskList.map((i) => (i.created === id ? { ...i, checked: 0 } : i))
    );
    updateActivity({
      id: activity.id,
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], checked: 0 },
      },
    });
  };

  const deleteTask = (id: number) => {
    const tempTask = { ...tasks };
    delete tempTask[id];
    updateActivity({ ...activity, id: activity.id, tasks: tempTask }, false);
  };

  const createTask = () => {
    setTaskList((prev) => [...prev, task]);
    updateActivity({
      id: activity.id,
      tasks: {
        ...tasks,
        [task.created]: task,
      },
    });
    setTask({
      title: "",
      checked: 0,
      created: Date.now(),
    });
    setShowAddNewTask(false);
  };

  return (
    <>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText type="subtitle">Checklist</ThemedText>
        <ThemedButton
          onPress={() => setShowAll(!showAll)}
          title={showAll ? "Hide completed" : "Show all"}
        ></ThemedButton>
      </ThemedView>
      {taskList
        .filter((item) => {
          if (showAll) return true;
          return !item.checked;
        })
        .sort((a, b) => a.created - b.created)
        .map((item) => {
          return (
            <ThemedView
              key={item.created}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <ThemedView style={{ flex: 1 }}>
                <CheckBox
                  checked={!!item.checked}
                  onPress={() => {
                    if (item.checked) {
                      uncheckTask(item.created);
                    } else {
                      checkTask(item.created);
                    }
                  }}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  title={item.title}
                  textStyle={{ flexWrap: "wrap", color: theme.text }}
                  containerStyle={{
                    backgroundColor: theme.background,
                    borderWidth: 0,
                    marginLeft: 0,
                  }}
                />
              </ThemedView>
              <Confirm
                title="Remove task"
                message="Delete task from checklist"
                acceptFn={() => {
                  deleteTask(item.created);
                  setTaskList(
                    taskList.filter((i) => i.created !== item.created)
                  );
                }}
                acceptTitle="Delete"
              >
                <MaterialIcons name="delete" size={28} color={theme.text} />
              </Confirm>
            </ThemedView>
          );
        })}
      {showAddNewTask ? (
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
          <ThemedView
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
          >
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
              title="Add"
            ></ThemedButton>
            <ThemedButton
              onPress={() => setShowAddNewTask(!showAddNewTask)}
              title="Cancel"
            ></ThemedButton>
          </ThemedView>
        </ThemedView>
      ) : null}
      {showAddNewTask ? null : (
        <ThemedView>
          <ThemedButton
            onPress={() => setShowAddNewTask(!showAddNewTask)}
            title="New task"
          ></ThemedButton>
        </ThemedView>
      )}
    </>
  );
}

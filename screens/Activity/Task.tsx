import { Button, Typography } from "../../components";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { CheckBox, Input } from "@rneui/themed";
import Schedule from "../../context/schedule/Schedule";
import { MaterialIcons } from "@expo/vector-icons";
import Confirm from "../../components/confirm";
import KeyboardWrapper from "../../container/KeyboardWrapper";
import useDataQuery from "../../context/data/useDataQuery";

export default function Task({ activity }: { activity: Schedule }) {
  const { updateActivity } = useDataQuery();
  const { tasks } = activity;
  const [taskList, setTaskList] = useState([]);
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [task, setTask] = useState({
    title: "",
    checked: 0,
    created: Date.now(),
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    Object.keys(tasks).forEach((key) => {
      setTaskList((prev) => [...prev, tasks[key]]);
    });
  }, [activity.id]);

  const checkTask = (id: string) => {
    setTaskList(
      taskList.map((i) => (i.id === id ? { ...i, checked: Date.now() } : i))
    );
    updateActivity(activity.id, {
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], checked: Date.now() },
      },
    });
  };

  const uncheckTask = (id: string) => {
    setTaskList(taskList.map((i) => (i.id === id ? { ...i, checked: 0 } : i)));
    updateActivity(activity.id, {
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], checked: 0 },
      },
    });
  };

  const deleteTask = (id: string) => {
    const tempTask = { ...tasks };
    delete tempTask[id];
    updateActivity(activity.id, {
      tasks: tempTask,
    });
  };

  const createTask = () => {
    setTaskList((prev) => [...prev, task]);
    updateActivity(activity.id, {
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
              <Confirm
                title="Remove task"
                message="Delete task from checklist"
                acceptFn={() => {
                  deleteTask(item.id);
                  setTaskList(taskList.filter((i) => i.id !== item.id));
                }}
                acceptTitle="Delete"
              >
                <MaterialIcons name="delete" size={28} color="black" />
              </Confirm>
            </View>
          );
        })}
      {showAddNewTask ? (
        <View>
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
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
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

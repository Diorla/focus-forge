import { CheckBox } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import Confirm from "../Confirm";
import { ThemedView } from "../ThemedView";
import updateActivity from "@/services/database/updateActivity";
import useUser from "@/context/user/useUser";
import ItemProps from "./ItemProps";

export default function ChecklistItem({
  activity,
  taskList,
  setTaskList,
  item,
}: ItemProps) {
  const { tasks } = activity;
  const checkTask = (id: number) => {
    setTaskList(
      taskList.map((i) =>
        i.created === id ? { ...i, checked: Date.now() } : i
      )
    );
    updateActivity({
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], checked: Date.now() },
      },
      id: activity.id,
    });
  };

  const uncheckTask = (id: number) => {
    setTaskList(
      taskList.map((i) => (i.created === id ? { ...i, checked: 0 } : i))
    );
    updateActivity({
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], checked: 0 },
      },
      id: activity.id,
    });
  };

  const deleteTask = (id: number) => {
    const tempTask = { ...tasks };
    delete tempTask[id];
    updateActivity(
      {
        ...activity,
        tasks: tempTask,
        id: activity.id,
      },
      false
    );
  };
  const { theme } = useUser();
  return (
    <ThemedView
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
          textStyle={{ flexWrap: "wrap" }}
        />
      </ThemedView>
      <Confirm
        title="Remove task"
        message="Delete task from checklist"
        acceptFn={() => {
          deleteTask(item.created);
          setTaskList(taskList.filter((i) => i.created !== item.created));
        }}
        acceptTitle="Delete"
      >
        <MaterialIcons name="delete" size={28} color={theme.text} />
      </Confirm>
    </ThemedView>
  );
}

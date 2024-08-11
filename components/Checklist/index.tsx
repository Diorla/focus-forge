import { useEffect, useState } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedButton } from "../ThemedButton";
import { ThemedView } from "../ThemedView";
import ActivityModel from "@/context/data/model/ActivityModel";
import ChecklistForm from "./ChecklistForm";
import ChecklistItem from "./ChecklistItem";

export default function Checklist({ activity }: { activity: ActivityModel }) {
  const { tasks } = activity;
  const [taskList, setTaskList] = useState<
    { title: string; checked: number; created: number }[]
  >([]);
  const [showAddNewTask, setShowAddNewTask] = useState(false);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const list: { title: string; checked: number; created: number }[] = [];
    Object.keys(tasks).forEach((key) => {
      list.push({ ...tasks[key], created: Number(key) });
    });
    setTaskList(list);
  }, [activity.id, tasks]);

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
        />
      </ThemedView>
      {taskList
        .filter((item) => showAll || !item.checked)
        .sort((a, b) => a.created - b.created)
        .map((item) => {
          return (
            <ChecklistItem
              key={item.created}
              item={item}
              activity={activity}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          );
        })}
      {showAddNewTask ? (
        <ChecklistForm
          activity={activity}
          taskList={taskList}
          setTaskList={setTaskList}
          setShowAddNewTask={setShowAddNewTask}
          showAddNewTask={showAddNewTask}
        />
      ) : null}
      {showAddNewTask ? null : (
        <ThemedView style={{ margin: "auto" }}>
          <ThemedButton
            onPress={() => setShowAddNewTask(!showAddNewTask)}
            title="New task"
          />
        </ThemedView>
      )}
    </>
  );
}

import { Button, Typography } from "../../components";
import { View } from "react-native";
import { useState } from "react";
import { Card, CheckBox, Input } from "@rneui/themed";
import { Schedule } from "../../context/activity/getSchedule";
import { uncheckTask, checkTask, createTask } from "../../services/database";

export default function Task({ activity }: { activity: Schedule }) {
  const { tasks } = activity;
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [task, setTask] = useState("");
  const [showAll, setShowAll] = useState(false);
  return (
    <Card>
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
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
    </Card>
  );
}

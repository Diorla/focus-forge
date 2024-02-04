import { Button, Typography } from "../../components";
import { View } from "react-native";
import { useState } from "react";
import { Card, CheckBox, Input } from "@rneui/themed";
import Schedule from "../../context/activity/Schedule";
import {
  uncheckTask,
  checkTask,
  createTask,
  deleteTask,
} from "../../services/database";
import { MaterialIcons } from "@expo/vector-icons";

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
                      ? uncheckTask(activity, item.created)
                      : checkTask(activity, item.created)
                  }
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
                onPress={() => deleteTask(activity, item.created)}
              />
            </View>
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
    </Card>
  );
}

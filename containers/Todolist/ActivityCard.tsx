import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Card, Input } from "@rneui/themed";
import Checklist from "../../context/schedule/Checklist";
import { useState } from "react";
import DoneType from "../../context/data/types/DoneType";
import { Modal } from "react-native";
import { getDateTimeKey } from "../../services/datetime";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import DatePicker from "@/components/DateTimePicker";
import { ThemedButton } from "@/components/ThemedButton";
import { priority } from "@/constants/Priority";
import { useThemeColor } from "@/hooks/useThemeColor";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";

export default function ActivityCard({ activity }: { activity: Checklist }) {
  const { id, remaining, occurrence, occurrenceType } = activity;
  const theme = useThemeColor();

  const [visible, setVisible] = useState(false);
  const tasks = Object.keys(activity.tasks).filter(
    (item) => !activity.tasks[item].checked
  );

  const { done = {} } = activity;

  const [newTime, setNewTime] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 1,
  });

  const [showAddTime, setShowAddTime] = useState(false);

  const createDone = (data: DoneType) => {
    const key = getDateTimeKey(data.datetime);
    updateActivity({ id: activity.id, done: { ...done, [key]: data } });
  };

  let dateRemaining = "";

  if (occurrenceType === "daily") {
    dateRemaining = "Today";
  } else if (occurrenceType === "weekly") {
    dateRemaining = "This week";
  } else if (occurrenceType === "monthly") {
    dateRemaining = "This month";
  } else if (occurrenceType === "yearly") {
    dateRemaining = "This year";
  }

  return (
    <TouchableOpacity onPress={() => router.push(`/activity/${id}`)}>
      <Modal visible={showAddTime}>
        <ThemedView style={{ justifyContent: "center", flex: 1 }}>
          <Input
            label="Note"
            value={newTime.comment}
            onChangeText={(comment) => setNewTime({ ...newTime, comment })}
            multiline
          />
          <DatePicker
            date={newTime.datetime}
            setDate={(datetime) => setNewTime({ ...newTime, datetime })}
            label="Date time"
            mode="datetime"
          />
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <ThemedButton
              onPress={() => {
                if (newTime.length) {
                  createDone(newTime);
                  setShowAddTime(false);
                  setNewTime({
                    comment: "",
                    datetime: Date.now(),
                    length: 1,
                  });
                }
              }}
              title="Save"
              outlined
              style={{ marginRight: 10 }}
            />
            <ThemedButton
              onPress={() => setShowAddTime(false)}
              title="Cancel"
              outlined
              style={{ marginRight: 10 }}
            />
          </ThemedView>
        </ThemedView>
      </Modal>
      <Card
        containerStyle={{
          minWidth: 300,
          borderRadius: 8,
          backgroundColor: theme.background,
        }}
      >
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            {activity.name}{" "}
          </ThemedText>
          <ThemedText>{dateRemaining}</ThemedText>
        </ThemedView>
        <ThemedView
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <ThemedText>{remaining} remaining</ThemedText>
          <ThemedButton
            onPress={() => {
              setShowAddTime(!showAddTime);
              setNewTime({
                comment: "",
                datetime: Date.now(),
                length: 1,
              });
            }}
            title="Check"
            outlined
            style={{ marginVertical: 10 }}
          />
          <ThemedText>{occurrence} total</ThemedText>
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedText style={{ textTransform: "capitalize" }}>
            {priority[activity.priority] || "None"}
          </ThemedText>

          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="list" size={24} color={theme.text} />
              <ThemedText>{tasks.length}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </Card>
    </TouchableOpacity>
  );
}

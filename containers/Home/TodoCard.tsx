import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Card, Input } from "@rneui/themed";
import Checklist from "../../context/schedule/Checklist";
import { useState } from "react";
import DoneType from "../../context/data/types/DoneType";
import { getDateTimeKey } from "../../services/datetime";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import DatePicker from "@/components/DateTimePicker";
import { ThemedButton } from "@/components/ThemedButton";
import updateActivity from "@/services/database/updateActivity";
import { ThemedView } from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import useUser from "@/context/user/useUser";

export default function TodoCard({ activity }: { activity: Checklist }) {
  const { remaining, occurrence, occurrenceType } = activity;
  const { theme } = useUser();

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
    <>
      <ThemedModal visible={showAddTime}>
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
      </ThemedModal>
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
          <Link href={`/activity/${activity.id}`}>
            <ThemedText style={{ fontWeight: "bold" }}>
              {activity.name}
            </ThemedText>
          </Link>
          <Ionicons
            name="checkmark-done"
            size={24}
            color={theme.text}
            onPress={() => {
              setShowAddTime(!showAddTime);
              setNewTime({
                comment: "",
                datetime: Date.now(),
                length: 1,
              });
            }}
          />
        </ThemedView>
        <ThemedView
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <ThemedText>
            {remaining} / {occurrence}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ThemedView style={{ flexDirection: "row" }}>
            <ThemedText>{dateRemaining}</ThemedText>
          </ThemedView>
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
    </>
  );
}

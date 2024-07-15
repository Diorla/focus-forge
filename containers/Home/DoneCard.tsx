import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import Checklist from "../../context/schedule/Checklist";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import useUser from "@/context/user/useUser";

export default function DoneCard({ activity }: { activity: Checklist }) {
  const { id, occurrence, occurrenceType, doneTimes } = activity;
  const { theme } = useUser();

  const [visible, setVisible] = useState(false);
  const tasks = Object.keys(activity.tasks).filter(
    (item) => !activity.tasks[item].checked
  );

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
          <ThemedText>
            {doneTimes}/{occurrence}
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
    </TouchableOpacity>
  );
}

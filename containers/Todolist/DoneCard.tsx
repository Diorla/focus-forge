import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Card } from "@rneui/themed";
import Checklist from "../../context/schedule/Checklist";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { priority } from "@/constants/Priority";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function DoneCard({ activity }: { activity: Checklist }) {
  const { id, occurrence, occurrenceType } = activity;
  const theme = useThemeColor();

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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText style={{ fontWeight: "bold" }}>
            {activity.name}{" "}
          </ThemedText>
          <ThemedText>{dateRemaining}</ThemedText>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <ThemedText>{occurrence} total</ThemedText>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText style={{ textTransform: "capitalize" }}>
            {priority[activity.priority] || "None"}
          </ThemedText>

          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="list" size={24} color={theme.text} />
              <ThemedText>{tasks.length}</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card } from "@rneui/themed";
import useNavigate from "../../container/Nav/useNavigate";
import Checklist from "../../context/schedule/Checklist";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function DoneCard({ activity }: { activity: Checklist }) {
  const { id, priority, occurrence, occurrenceType } = activity;

  const [visible, setVisible] = useState(false);
  const tasks = Object.keys(activity.tasks).filter(
    (item) => !activity.tasks[item].checked
  );

  const navigate = useNavigate<{ id: string }>();

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
    <TouchableOpacity onPress={() => navigate("Activity", { id })}>
      <Card containerStyle={{ minWidth: 300, borderRadius: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography style={{ fontWeight: "bold" }}>
            {activity.name}{" "}
          </Typography>
          <Typography>{dateRemaining}</Typography>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <Typography>{occurrence} total</Typography>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography style={{ textTransform: "capitalize" }}>
            {priority[activity.priority] || "None"}
          </Typography>

          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="list" size={24} color="black" />
              <Typography>{tasks.length}</Typography>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

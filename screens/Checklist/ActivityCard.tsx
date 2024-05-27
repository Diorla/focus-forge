import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, DatePicker, Typography } from "../../components";
import { Card, Input } from "@rneui/themed";
import useNavigate from "../../container/Nav/useNavigate";
import Checklist from "../../context/schedule/Checklist";
import { useState } from "react";
import DoneType from "../../context/data/types/DoneType";
import { Modal } from "react-native";
import { getDateTimeKey } from "../../services/datetime";
import useDataQuery from "../../context/data/useDataQuery";
import { MaterialIcons } from "@expo/vector-icons";

export default function ActivityCard({ activity }: { activity: Checklist }) {
  const { id, priority, remaining, occurrence, occurrenceType } = activity;

  const [visible, setVisible] = useState(false);
  const tasks = Object.keys(activity.tasks).filter(
    (item) => !activity.tasks[item].checked
  );

  const { updateActivity } = useDataQuery();
  const { done = {} } = activity;

  const [newTime, setNewTime] = useState<DoneType>({
    comment: "",
    datetime: Date.now(),
    length: 1,
  });

  const [showAddTime, setShowAddTime] = useState(false);

  const createDone = (data: DoneType) => {
    const key = getDateTimeKey(data.datetime);
    updateActivity(activity.id, { done: { ...done, [key]: data } });
  };

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
      <Modal visible={showAddTime}>
        <View style={{ justifyContent: "center", flex: 1 }}>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
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
            >
              Save
            </Button>
            <Button onPress={() => setShowAddTime(false)}>Cancel</Button>
          </View>
        </View>
      </Modal>
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
          <Typography>{remaining} remaining</Typography>
          <Button onPress={() => setShowAddTime(!showAddTime)}>Check</Button>
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

import { TouchableOpacity, View } from "react-native";
import { TimeFormat, Typography } from "../../components";
import { Card, Divider, useTheme } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigate from "../../container/Nav/useNavigate";
import Schedule from "../../context/activity/Schedule";
import ChecklistModal from "./ChecklistModal";
import { useState } from "react";
import generateCardTime from "./generateCardTime";
import CardInfo from "./CardInfo";

export default function ActivityCard({
  schedule,
  type,
}: {
  schedule: Schedule;
  type: "completed" | "overflow" | "upcoming" | "previous" | "recent";
}) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ id: string }>();
  const { done, lastDone } = schedule;
  const [visible, setVisible] = useState(false);
  const tasks = schedule.tasks.filter((item) => !item.checked);

  return (
    <>
      <ChecklistModal
        activity={schedule}
        visible={visible}
        closeModal={() => setVisible(false)}
      />
      <Card containerStyle={{ width: 300, borderRadius: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>{schedule.name}</Typography>
          <MaterialCommunityIcons
            name="arrow-expand-all"
            size={24}
            color="black"
            onPress={() => navigate("Activity", { id: schedule.id })}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <TimeFormat value={generateCardTime(type, schedule)} />
          <Divider
            color={colors.grey3}
            style={{ width: "50%", marginVertical: 4 }}
          />
          <CardInfo type={type} done={done} lastDone={lastDone} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography style={{ textTransform: "capitalize" }}>
            {schedule.priority}
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
    </>
  );
}

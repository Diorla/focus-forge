import { View } from "react-native";
import { Typography } from "../../components";
import TxtButton from "../../components/txtButton";
import { MaterialIcons } from "@expo/vector-icons";
import { TodayCard } from "./TodayCard";
import { useState } from "react";
import useActivity from "../../context/activity/useActivity";

export default function TodayView() {
  const [expanded, setExpanded] = useState(false);
  const { schedule } = useActivity();
  const today = schedule.filter((item) => {
    const todo = item.todayRemaining + item.additionalTime;
    return todo > 0;
  });

  if (today.length) {
    const first = today[0];
    const rest = today.slice(1);
    return (
      <View style={{ marginVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <Typography type="header">Today</Typography>
          {rest.length ? (
            <TxtButton onPress={() => setExpanded(!expanded)}>
              {expanded ? "Collapse" : "Expand"}
            </TxtButton>
          ) : null}
        </View>
        <View>
          <TodayCard
            showList={() => console.log("show check list")}
            togglePlay={() => console.log("play pause")}
            schedule={first}
          />
          {expanded ? (
            <>
              {rest.map((item) => (
                <TodayCard
                  key={item.id}
                  showList={() => console.log("show check list")}
                  togglePlay={() => console.log("play pause")}
                  schedule={item}
                />
              ))}
            </>
          ) : null}
        </View>
        {rest.length ? (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <MaterialIcons
              name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={36}
              color="black"
              onPress={() => setExpanded(!expanded)}
            />
          </View>
        ) : null}
      </View>
    );
  }
  return null;
}

import { View } from "react-native";
import { Typography } from "../../components";
import TxtButton from "../../components/txtButton";
import { MaterialIcons } from "@expo/vector-icons";
import { TodayCard } from "./TodayCard";
import { useState } from "react";

export default function TodayView() {
  const [expanded, setExpanded] = useState(false);
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
        <TxtButton onPress={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </TxtButton>
      </View>
      <View>
        <TodayCard
          showList={() => console.log("show check list")}
          togglePlay={() => console.log("play pause")}
        />
        {expanded ? (
          <>
            <TodayCard
              showList={() => console.log("show check list")}
              togglePlay={() => console.log("play pause")}
            />
            <TodayCard
              showList={() => console.log("show check list")}
              togglePlay={() => console.log("play pause")}
            />
            <TodayCard
              showList={() => console.log("show check list")}
              togglePlay={() => console.log("play pause")}
            />
          </>
        ) : null}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={36}
          color="black"
          onPress={() => setExpanded(!expanded)}
        />
      </View>
    </View>
  );
}

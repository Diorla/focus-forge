import { useTheme } from "@rneui/themed";
import * as React from "react";
import { View } from "react-native";
import { Typography } from "../../components";
import * as Progress from "react-native-progress";
import useActivity from "../../context/activity/useActivity";

export default function ProgressView() {
  const { theme } = useTheme();
  const { schedule } = useActivity();

  // Prevent 0 error, yet small enough to be insignificant;
  let lowTop = 0.0000001;
  let lowBottom = 0.0000001;
  let mediumTop = 0.0000001;
  let mediumBottom = 0.0000001;
  let highTop = 0.0000001;
  let highBottom = 0.0000001;

  schedule.forEach((item) => {
    const done = item.doneThisWeek + item.doneToday;
    const total = item.weeklyTarget < done ? done : item.weeklyTarget;
    if (item.priority === "low") {
      lowTop += done;
      lowBottom += total;
    }
    if (item.priority === "medium") {
      mediumTop += done;
      mediumBottom += total;
    }
    if (item.priority === "high") {
      highTop += done;
      highBottom += total;
    }
  });

  const low = lowTop / lowBottom;
  const medium = mediumTop / mediumBottom;
  const high = highTop / highBottom;

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 24,
        paddingBottom: 8,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Progress.Circle
          size={100}
          progress={high}
          color={theme.colors.error}
          unfilledColor={theme.colors.grey0}
          borderColor={theme.colors.grey0}
          showsText
          thickness={9}
          formatText={() => (
            <Typography color={theme.colors.white} type="big">
              {Math.floor(high * 100) + "%"}
            </Typography>
          )}
        />
        <Typography color={theme.colors.white}>High</Typography>
      </View>
      <View style={{ alignItems: "center" }}>
        <Progress.Circle
          size={100}
          progress={medium}
          color={theme.colors.warning}
          unfilledColor={theme.colors.grey0}
          borderColor={theme.colors.grey0}
          showsText
          thickness={9}
          formatText={() => (
            <Typography color={theme.colors.white} type="big">
              {Math.floor(medium * 100) + "%"}
            </Typography>
          )}
        />
        <Typography color={theme.colors.white}>Medium</Typography>
      </View>
      <View style={{ alignItems: "center" }}>
        <Progress.Circle
          size={100}
          progress={low}
          color={theme.colors.success}
          unfilledColor={theme.colors.grey0}
          borderColor={theme.colors.grey0}
          showsText
          thickness={9}
          formatText={() => (
            <Typography color={theme.colors.white} type="big">
              {Math.floor(low * 100) + "%"}
            </Typography>
          )}
        />
        <Typography color={theme.colors.white}>Low</Typography>
      </View>
    </View>
  );
}

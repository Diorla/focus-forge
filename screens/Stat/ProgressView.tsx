import { useTheme } from "@rneui/themed";
import * as React from "react";
import { View } from "react-native";
import { TimeFormat, Typography } from "../../components";
import * as Progress from "react-native-progress";
import useSchedule from "../../context/schedule/useSchedule";

export default function ProgressView() {
  const { theme } = useTheme();
  const { schedule } = useSchedule();

  // Prevent 0 error, yet small enough to be insignificant;
  let lowTop = 0.0000001;
  let lowBottom = 0.0000001;
  let mediumTop = 0.0000001;
  let mediumBottom = 0.0000001;
  let highTop = 0.0000001;
  let highBottom = 0.0000001;

  schedule?.forEach((item) => {
    const done = item.doneThisWeek + item.doneToday;
    const total = item.weeklyTarget < done ? done : item.weeklyTarget;
    if (item.archived) {
      // do nothing
    } else if (item.priority === 1) {
      lowTop += done;
      lowBottom += total;
    } else if (item.priority === 2) {
      mediumTop += done;
      mediumBottom += total;
    } else if (item.priority === 3) {
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
        paddingBottom: 8,
      }}
    >
      <Typography
        style={{ textAlign: "center", marginTop: 24 }}
        color={theme.colors.white}
        type="big"
      >
        Weekly target
      </Typography>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Typography color={theme.colors.white} style={{ marginVertical: 8 }}>
            High
          </Typography>
          <Progress.Circle
            size={100}
            progress={high}
            color={theme.colors.error}
            unfilledColor={theme.colors.grey5}
            borderColor={high > 0.00001 ? "transparent" : theme.colors.grey0}
            showsText
            thickness={5}
            formatText={() => (
              <Typography color={theme.colors.white} type="big">
                {Math.floor(high * 100) + "%"}
              </Typography>
            )}
          />
          <TimeFormat color={theme.colors.white} value={highBottom - highTop} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Typography color={theme.colors.white} style={{ marginVertical: 8 }}>
            Medium
          </Typography>
          <Progress.Circle
            size={100}
            progress={medium}
            color={theme.colors.warning}
            unfilledColor={theme.colors.grey5}
            borderColor={medium > 0.00001 ? "transparent" : theme.colors.grey0}
            showsText
            thickness={5}
            formatText={() => (
              <Typography color={theme.colors.white} type="big">
                {Math.floor(medium * 100) + "%"}
              </Typography>
            )}
          />
          <TimeFormat
            color={theme.colors.white}
            value={mediumBottom - mediumTop}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Typography color={theme.colors.white} style={{ marginVertical: 8 }}>
            Low
          </Typography>
          <Progress.Circle
            size={100}
            progress={low}
            color={theme.colors.success}
            unfilledColor={theme.colors.grey0}
            borderColor={low > 0.00001 ? "transparent" : theme.colors.grey0}
            showsText
            thickness={5}
            formatText={() => (
              <Typography color={theme.colors.white} type="big">
                {Math.floor(low * 100) + "%"}
              </Typography>
            )}
          />
          <TimeFormat color={theme.colors.white} value={lowBottom - lowTop} />
        </View>
      </View>
      <Typography style={{ textAlign: "center" }} color={theme.colors.white}>
        Time left
      </Typography>
    </View>
  );
}

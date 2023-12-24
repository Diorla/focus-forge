import { useTheme } from "@rneui/themed";
import * as React from "react";
import { View } from "react-native";
import { Typography } from "../../components";
import * as Progress from "react-native-progress";

export default function ProgressView() {
  const { theme } = useTheme();
  const low = Math.random();
  const medium = Math.random();
  const high = Math.random();
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

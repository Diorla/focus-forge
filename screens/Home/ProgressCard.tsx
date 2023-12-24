import { View } from "react-native";
import { Typography } from "../../components";
import { Card, Divider, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";

export default function ProgressCard() {
  const {
    theme: { colors },
  } = useTheme();
  const progress = 0.75;
  return (
    <Card
      containerStyle={{
        backgroundColor: colors.primary,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Progress.Circle
          size={100}
          progress={progress}
          color={colors.grey5}
          unfilledColor={colors.grey0}
          borderColor={colors.grey0}
          showsText
          thickness={9}
          formatText={() => progress * 100 + "%"}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Typography type="header" color={colors.white}>
            Progress
          </Typography>
          <Divider style={{ marginVertical: 10 }} />
          <Typography color={colors.white}>
            12/15 activities completed
          </Typography>
          <Typography color={colors.white}>1h 30 remaining</Typography>
        </View>
      </View>
    </Card>
  );
}

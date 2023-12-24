import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card, useTheme } from "@rneui/themed";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlayButton from "./PlayButton";
import useNavigate from "../../container/Nav/useNavigate";

export function TodayCard({
  showList,
  togglePlay,
}: {
  showList: () => void;
  togglePlay: () => void;
}) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ title: string }>();
  return (
    <Card containerStyle={{ borderRadius: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography>Activity</Typography>
        <MaterialCommunityIcons
          name="arrow-expand-all"
          size={24}
          color="black"
          onPress={() => navigate("Activity", { title: "activity name" })}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Typography>01:04:36</Typography>
        <Progress.Bar
          progress={0.75}
          color={colors.primary}
          unfilledColor={colors.grey5}
          borderColor={colors.grey0}
          width={250}
        />
        <PlayButton playing onPress={togglePlay} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography>High</Typography>

        <TouchableOpacity onPress={showList}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="list" size={24} color="black" />
            <Typography>4</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

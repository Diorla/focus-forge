import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { format } from "../../services/date";
import { Card, Divider, useTheme } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigate from "../../container/Nav/useNavigate";

export default function ActivityCard({ showList }: { showList: () => void }) {
  const {
    theme: { colors },
  } = useTheme();
  const navigate = useNavigate<{ title: string }>();
  return (
    <Card containerStyle={{ width: 300, borderRadius: 8 }}>
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
        <Divider
          color={colors.grey3}
          style={{ width: "50%", marginVertical: 4 }}
        />
        <Typography>{format()}</Typography>
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

import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../components";
import { Card } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { getContrastColor, random } from "../../services/color";
import useNavigate from "../../container/Nav/useNavigate";

const list = ["Completed", "Ongoing", "Archived"];

export default function ActivityCard() {
  const bgColor = random();
  const color = getContrastColor(bgColor);
  const i = Math.floor(Math.random() * 3);
  const navigate = useNavigate<{ color: string; bgColor: string }>();
  return (
    <TouchableOpacity onPress={() => navigate("Activity", { color, bgColor })}>
      <Card containerStyle={{ backgroundColor: bgColor, borderRadius: 4 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color={color}>Activity</Typography>
          <Typography color={color}>4h 30</Typography>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <Typography color={color}>{list[i]}</Typography>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color={color}>120%</Typography>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="list" size={24} color={color} />
            <Typography color={color}>4</Typography>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

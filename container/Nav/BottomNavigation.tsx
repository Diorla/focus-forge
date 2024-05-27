import * as React from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Typography } from "../../components";
import path from "./path";
import useNavigate from "./useNavigate";

export default function BottomNavigation({
  route = "home",
  onToggle,
}: {
  route?: path;
  onToggle: (value: path) => void;
}) {
  const {
    theme: { colors },
  } = useTheme();

  const navigate = useNavigate();

  const isIOS = Platform.OS === "ios";
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderColor: "silver",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        backgroundColor: colors.white,
      }}
    >
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => onToggle("home")}
      >
        <MaterialCommunityIcons
          name={route === "home" ? "view-grid" : "view-grid-outline"}
          size={24}
          color={route === "home" ? colors.primary : colors.black}
        />
        <Typography
          color={route === "home" ? colors.primary : colors.black}
          type="small"
        >
          Home
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => onToggle("checklist")}
      >
        <MaterialIcons
          name="checklist"
          size={24}
          color={route === "checklist" ? colors.primary : colors.black}
        />
        <Typography
          color={route === "checklist" ? colors.primary : colors.black}
          type="small"
        >
          History
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => onToggle("list")}
      >
        <MaterialCommunityIcons
          name={route === "list" ? "clipboard-list" : "clipboard-list-outline"}
          size={24}
          color={route === "list" ? colors.primary : colors.black}
        />
        <Typography
          color={route === "list" ? colors.primary : colors.black}
          type="small"
        >
          Activities
        </Typography>
      </TouchableOpacity>
      {isIOS ? (
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigate("Add")}
        >
          <Octicons name="diff-added" size={24} color="black" />
          <Typography type="small">Create</Typography>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => onToggle("stat")}
      >
        <Ionicons
          name={route === "stat" ? "stats-chart" : "stats-chart-outline"}
          size={24}
          color={route === "stat" ? colors.primary : colors.black}
        />
        <Typography
          color={route === "stat" ? colors.primary : colors.black}
          type="small"
        >
          Stat
        </Typography>
      </TouchableOpacity>
    </View>
  );
}

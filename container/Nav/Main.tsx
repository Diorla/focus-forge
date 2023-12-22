import * as React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FAB, useTheme } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../../screens/Home";
import { Octicons } from "@expo/vector-icons";
import { Typography } from "../../components";

type path = "home" | "list" | "history" | "stat";

const isIOS = Platform.OS === "ios";
const BottomNavigation = ({
  route = "home",
  onToggle,
}: {
  route?: path;
  onToggle: (value: path) => void;
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const { navigate } = useNavigation();
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
          size={28}
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
        onPress={() => onToggle("list")}
      >
        <MaterialCommunityIcons
          name={route === "list" ? "clipboard-list" : "clipboard-list-outline"}
          size={28}
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
          onPress={() => navigate("Add" as never)}
        >
          <Octicons name="diff-added" size={24} color="black" />
          <Typography type="small">Create</Typography>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => onToggle("history")}
      >
        <MaterialCommunityIcons
          name="history"
          size={28}
          color={route === "history" ? colors.primary : colors.black}
        />
        <Typography
          color={route === "history" ? colors.primary : colors.black}
          type="small"
        >
          History
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => onToggle("stat")}
      >
        <Ionicons
          name={route === "stat" ? "stats-chart" : "stats-chart-outline"}
          size={28}
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
};

const ListScreen = () => {
  return <Text>List Screen</Text>;
};
const HistoryScreen = () => {
  return <Text>History Screen</Text>;
};
const StatScreen = () => {
  return <Text>Stat Screen</Text>;
};

const Tab = ({ route = "home" }: { route?: path }) => {
  if (route === "home") return <HomeScreen />;
  if (route === "list") return <ListScreen />;
  if (route === "history") return <HistoryScreen />;
  return <StatScreen />;
};

export function Main() {
  const [route, setRoute] = useState<path>("home");
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Tab route={route} />

      <BottomNavigation route={route} onToggle={(route) => setRoute(route)} />
      {isIOS ? null : (
        <FAB
          icon={{ name: "add", color: "white" }}
          style={{ bottom: 72, position: "absolute", right: 36 }}
          onPress={() => navigate("Add" as never)}
        />
      )}
    </View>
  );
}

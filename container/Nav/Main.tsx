import * as React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FAB, useTheme } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

type path = "home" | "list" | "history" | "stat";

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
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 56,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderColor: "silver",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        marginBottom: 10,
      }}
    >
      <MaterialCommunityIcons
        name={route === "home" ? "view-grid" : "view-grid-outline"}
        size={28}
        color={route === "home" ? colors.primary : colors.black}
        onPress={() => onToggle("home")}
      />
      <MaterialCommunityIcons
        name={route === "list" ? "clipboard-list" : "clipboard-list-outline"}
        size={28}
        color={route === "list" ? colors.primary : colors.black}
        onPress={() => onToggle("list")}
      />
      <MaterialCommunityIcons
        name="history"
        size={28}
        color={route === "history" ? colors.primary : colors.black}
        onPress={() => onToggle("history")}
      />
      <Ionicons
        name={route === "stat" ? "stats-chart" : "stats-chart-outline"}
        size={28}
        color={route === "stat" ? colors.primary : colors.black}
        onPress={() => onToggle("stat")}
      />
    </View>
  );
};

const HomeScreen = () => {
  return <Text>Home Screen</Text>;
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tab route={route} />

      <BottomNavigation route={route} onToggle={(route) => setRoute(route)} />
      <FAB
        icon={{ name: "add", color: "white" }}
        style={{ bottom: 48, position: "absolute" }}
        onPress={() => navigate("Add" as never)}
      />
    </View>
  );
}

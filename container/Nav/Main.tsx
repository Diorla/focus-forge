import * as React from "react";
import { View, Platform } from "react-native";
import { FAB } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "./BottomNavigation";
import Tab from "./Tab";
import path from "./path";

export default function Main() {
  const [route, setRoute] = useState<path>("home");
  const { navigate } = useNavigation();
  const isIOS = Platform.OS === "ios";
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

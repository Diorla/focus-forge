import * as React from "react";
import HomeScreen from "../../screens/Home";
import ListScreen from "../../screens/List";
import StatScreen from "../../screens/Stat";
import HistoryScreen from "../../screens/History";
import path from "./path";

export default function Tab({ route = "home" }: { route?: path }) {
  if (route === "home") return <HomeScreen />;
  if (route === "list") return <ListScreen />;
  if (route === "history") return <HistoryScreen />;
  return <StatScreen />;
}

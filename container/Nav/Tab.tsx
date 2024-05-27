import * as React from "react";
import HomeScreen from "../../screens/Home";
import ListScreen from "../../screens/List";
import StatScreen from "../../screens/Stat";
import path from "./path";
import ChecklistScreen from "../../screens/Checklist";

export default function Tab({ route = "home" }: { route?: path }) {
  if (route === "home") return <HomeScreen />;
  if (route === "list") return <ListScreen />;
  if (route === "checklist") return <ChecklistScreen />;
  return <StatScreen />;
}

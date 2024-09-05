import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import TabHeader from "@/components/navigation/TabHeader";
import useUser from "@/context/user/useUser";

export default function TabLayout() {
  const { theme } = useUser();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.grey0,
        header: () => <TabHeader />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "add" : "add-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="browser"
        options={{
          title: "Browse",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "browsers" : "browsers-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

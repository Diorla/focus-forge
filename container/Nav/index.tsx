import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main";
import AddScreen from "../../screens/Add";
import ProfileScreen from "../../screens/Profile";
import ActivityScreen from "../../screens/Activity";
import RootStackParamList from "./RootStackParamList";
import ViewStatScreen from "../../screens/ViewStat";
import { Button, Typography } from "../../components";
import useActivity from "../../context/activity/useActivity";
import { getContrastColor } from "../../services/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuModal from "./MenuModal";
import EditScreen from "../../screens/Edit";

const Stack = createNativeStackNavigator<RootStackParamList>();

const PlaceholderScreen = () => {
  return <Typography>Placeholder screen</Typography>;
};
function Nav() {
  const { schedule } = useActivity();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{
            headerShown: false,
          }}
          component={Main}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            headerTitle: "Add Activity",
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Activity"
          component={ActivityScreen}
          options={(props) => {
            const { id } = props.route.params || { id: "" };
            const activity = schedule.find((item) => item.id === id);
            const color = getContrastColor(activity.color);
            return {
              headerTitle: activity.name,
              headerStyle: {
                backgroundColor: activity.color,
              },
              headerTintColor: color,
              headerRight: () => (
                <MenuModal color={color} activity={activity} />
              ),
            };
          }}
        />
        <Stack.Screen name="ViewStat" component={ViewStatScreen} />
        <Stack.Screen name="Subscription" component={PlaceholderScreen} />
        <Stack.Screen name="HelpCentre" component={PlaceholderScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PlaceholderScreen} />
        <Stack.Screen name="Settings" component={PlaceholderScreen} />
        <Stack.Screen name="RateUs" component={PlaceholderScreen} />
        <Stack.Screen name="EditProfile" component={PlaceholderScreen} />
        <Stack.Screen
          name="EditActivity"
          component={EditScreen}
          options={(props) => {
            const { id } = props.route.params || { id: "" };
            const activity = schedule.find((item) => item.id === id);
            const color = getContrastColor(activity.color);
            return {
              headerTitle: "Edit",
              headerStyle: {
                backgroundColor: activity.color,
              },
              headerTintColor: color,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main";
import AddScreen from "../../screens/Add";
import ProfileScreen from "../../screens/Profile";
import ActivityScreen from "../../screens/Activity";
import RootStackParamList from "./RootStackParamList";
import ViewStatScreen from "../../screens/ViewStat";
import { Typography } from "../../components";
import useSchedule from "../../context/schedule/useSchedule";
import { getContrastColor } from "../../services/color";
import MenuModal from "./MenuModal";
import EditScreen from "../../screens/Edit";
import { useTheme } from "@rneui/themed";
import EditProfileScreen from "../../screens/EditProfile";
import useDataQuery from "../../context/data/useDataQuery";

const Stack = createNativeStackNavigator<RootStackParamList>();

const PlaceholderScreen = () => {
  return <Typography>Placeholder screen</Typography>;
};
function Nav() {
  const { schedule } = useSchedule();
  const { theme } = useTheme();
  const { user } = useDataQuery();
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
            const {
              route: { params },
            } = props || { route: { params: { id: "" } } };
            const { id } = params;
            const activity = schedule.find((item) => item.id === id);
            const color = getContrastColor(
              activity?.color || theme.colors.white
            );
            return {
              headerTitle: activity?.name,
              headerStyle: {
                backgroundColor: activity?.color || theme.colors.white,
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
        <Stack.Screen name="ChangePassword" component={PlaceholderScreen} />
        <Stack.Screen
          name="EditProfile"
          options={{
            headerTitle: user.name,
          }}
          component={EditProfileScreen}
        />
        <Stack.Screen
          name="EditActivity"
          component={EditScreen}
          options={(props) => {
            const {
              route: { params },
            } = props || { route: { params: { id: "" } } };
            const { id } = params;
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

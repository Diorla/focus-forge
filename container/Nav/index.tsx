import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main";
import AddScreen from "../../screens/Add";
import ProfileScreen from "../../screens/Profile";
import ActivityScreen from "../../screens/Activity";
import RootStackParamList from "./RootStackParamList";
import ViewStatScreen from "../../screens/ViewStat";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Nav() {
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
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="ViewStat" component={ViewStatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;

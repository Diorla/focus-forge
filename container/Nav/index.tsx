import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./Main";
import { View } from "react-native";
import { Typography } from "../../components";

const Stack = createNativeStackNavigator();

const AddScreen = () => (
  <View>
    <Typography>Hello add</Typography>
  </View>
);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;

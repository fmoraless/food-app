import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerShown={false}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

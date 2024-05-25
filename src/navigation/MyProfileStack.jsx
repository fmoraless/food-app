import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ImageSelectorScreen } from '../screens/ImageSelectorScreen';

const Stack = createNativeStackNavigator();

export const MyProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ImageSelectorScreen"
        component={ImageSelectorScreen}
      />
    </Stack.Navigator>
  );
};

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator headerShown={false} initialRouteName="Home">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Product"
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};

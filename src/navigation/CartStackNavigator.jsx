import React from 'react';
import { CartScreen } from '../screens/CartScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

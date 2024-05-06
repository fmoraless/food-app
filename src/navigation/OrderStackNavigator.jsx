import React from 'react';
import { OrdersScreen } from '../screens/OrdersScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrdersScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { HomeStackNavigator } from '../navigation/HomeStackNavigator';
import { BottomTabNavigator } from '../navigation/BottomTabNavigator';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      {/*  <HomeStackNavigator /> */}
    </NavigationContainer>
  );
};

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { HomeStackNavigator } from '../navigation/HomeStackNavigator';
import { BottomTabNavigator } from '../navigation/BottomTabNavigator';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthStackNavigator } from './AuthStackNavigator';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  const { user } = useSelector((state) => state.auth.value);
  console.log({ MainNavigationUSER: user });

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { HomeStackNavigator } from '../navigation/HomeStackNavigator';
import { BottomTabNavigator } from '../navigation/BottomTabNavigator';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthStackNavigator } from './AuthStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '../persistence';
import { setUser } from '../features/User/userSlice';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession();

        if (response.rows._array.length) {
          const user = response.rows._array[0];

          dispatch(
            setUser({
              email: user.email,
              localId: user.localId,
              idToken: user.token,
            }),
          );
        }
      } catch (error) {
        console.log({ sessionError: error });
      }
    })();
  }, []);

  console.log({ MainNavigationUSER: user });

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

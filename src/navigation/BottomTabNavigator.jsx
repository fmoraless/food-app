import { View, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductScreen } from '../screens/ProductScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { HomeStackNavigator } from './HomeStackNavigator';
import { CartScreen } from '../screens/CartScreen';
import Colors from '../constants/Colors';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { OrdersScreen } from '../screens/OrdersScreen';
import { CartStack } from './CartStackNavigator';
import { OrderStack } from './OrderStackNavigator';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen
        name="Shop"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? Colors.DEFAULT_RED : Colors.DEFAULT_GREY}
                />
              </View>
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="shopping-cart"
                  size={24}
                  color={focused ? Colors.DEFAULT_RED : Colors.DEFAULT_GREY}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="receipt"
                  size={24}
                  color={focused ? Colors.DEFAULT_RED : Colors.DEFAULT_GREY}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.DEFAULT_WHITE,
    shadowColor: Colors.DEFAULT_BLACK,
    elevation: 4,
    borderRadius: 15,
    height: 60,
  },
});

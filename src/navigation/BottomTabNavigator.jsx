import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductScreen } from '../screens/ProductScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { HomeStackNavigator } from './HomeStackNavigator';
import { CartScreen } from '../screens/CartScreen';
import Colors from '../constants/Colors';
import { FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { OrdersScreen } from '../screens/OrdersScreen';
import { CartStack } from './CartStackNavigator';
import { OrderStack } from './OrderStackNavigator';
import { useSelector } from 'react-redux';
import { MyProfileStack } from './MyProfileStack';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const totalItemsQty = useSelector(
    (state) => state.cart.value.totalItemsQuantity,
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.DEFAULT_RED,
        tabBarInactiveTintColor: Colors.DEFAULT_GREY,
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
                {totalItemsQty !== null && totalItemsQty > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItemsQty}</Text>
                  </View>
                )}
              </View>
            );
          },
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfileStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Ionicons
                  name="person-circle"
                  size={34}
                  color={focused ? Colors.DEFAULT_RED : Colors.DEFAULT_GREY}
                />
              </View>
            );
          },
          headerShown: false,
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
    //position: 'absolute',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: 60,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  //const [itemsCount, setItemsCount] = useState(0);
  const totalItemsQty = useSelector(
    (state) => state.cart.value.totalItemsQuantity,
  );

  console.log({ cantidadTotalItemsCarrito: totalItemsQty });

  /* const selectCartItemsCount = createSelector(
    (state) => state.cart.items,
    (items) => items.reduce((total, item) => total + item.quantity, 0),
  ); */

  //console.log('ITEMS-total', items);

  /* if (items.length) {
    const itemsCount = items.reduce((total, item) => total + item.quantity, 0);
    console.log(itemsCount);
    setItemsCount(itemsCount);
  } */

  /* const cartItemCount = useSelector(selectCartItemsCount);
  console.log(cartItemCount); */

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

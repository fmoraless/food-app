import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-paper';

export const FAB = ({ iconName, onPress, style }) => {
  return (
    <View style={[styles.btn, style]}>
      <Pressable onPress={onPress}>
        <Icon source={iconName} size={25} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    zIndex: 1,
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: Colors.DEFAULT_RED,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 0.5,
    },
    elevation: 5,
  },
});

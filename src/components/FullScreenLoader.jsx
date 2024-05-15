import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../constants/Colors';

export const FullScreenLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={Colors.DEFAULT_RED}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

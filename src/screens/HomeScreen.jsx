import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';

import Separator from '../components/Separator';
import Colors from '../constants/Colors';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  console.log({ searchQuery });
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer}>
        <View style={styles.headerContainer} />
      </View>
      <View style={styles.inputContainer}>
        <Searchbar
          placeholder="Buscar..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 190),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1
  },
  headerContainer: {
    justifyContent: 'center'
  },
  inputContainer: {
    marginTop: 60,
    marginHorizontal: 20
  }
});

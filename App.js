import React from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { MainNavigation } from './src/navigation';

export default function App() {
  return (
    <PaperProvider>
      <MainNavigation />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

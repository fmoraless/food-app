import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";

import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="titleLarge">
          Open up App.js to start working on your app!
        </Text>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

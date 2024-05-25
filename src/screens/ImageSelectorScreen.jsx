import React, { useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';
import Separator from '../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');
// TODO: extraer a un Hook
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export const ImageSelectorScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    console.log('Take Photo');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_RED}
        translucent
      />

      <Separator height={StatusBar.currentHeight} />

      <View style={styles.backgroundCurvedContainer} />

      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={Colors.DEFAULT_WHITE}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Selección de Imagen</Text>
      </View>
      {/* Recuadro para mostrar imagen seleccionada */}
      <View style={styles.mainContainer}>
        <View style={styles.frame}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.takePhotoButton}
                activeOpacity={0.8}
                onPress={pickImage}>
                <MaterialIcons
                  name="add-a-photo"
                  size={24}
                  color={Colors.DEFAULT_WHITE}
                />
                <Text style={styles.takePhotoButtonText}>Tomar otra foto</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>
                  No hay foto para {'\n'} mostrar...
                </Text>
              </View>
              <TouchableOpacity
                style={styles.takePhotoButton}
                activeOpacity={0.8}
                onPress={pickImage}>
                <MaterialIcons
                  name="add-a-photo"
                  size={24}
                  color={Colors.DEFAULT_WHITE}
                />
                <Text style={styles.takePhotoButtonText}>Tomar una foto</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_RED,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 220),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    width: setWidth(80),
    textAlign: 'center',
    color: Colors.DEFAULT_WHITE,
  },
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    elevation: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 25,
    height: setHeight(60),
  },
  frame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    marginTop: 30,
  },
  noImageContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREY2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 15 * 1.4,
    width: setWidth(90),
    textAlign: 'center',
    color: Colors.DEFAULT_GREY,
  },
  takePhotoButton: {
    backgroundColor: Colors.DEFAULT_RED,
    height: setHeight(6),
    width: setWidth(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 10,
  },
  takePhotoButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

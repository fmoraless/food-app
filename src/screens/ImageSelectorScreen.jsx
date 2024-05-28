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
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setCameraImage } from '../features/User/userSlice';
import {
  usePostProfileImageMutation,
  useGetProfileImageQuery,
} from '../services/shopService';
import useDimensions from '../hooks/useDimensions';

export const ImageSelectorScreen = ({ navigation }) => {
  const { setHeight, setWidth } = useDimensions();
  const [image, setImage] = useState(null);
  const [triggerPostImage, result] = usePostProfileImageMutation();
  const { localId, imageCamera } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const dispatch = useDispatch();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    return granted;
  };

  const pickImage = async () => {
    try {
      const isCameraOk = await verifyCameraPermissions();
      if (isCameraOk) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2,
        });

        if (!result.canceled) {
          setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
      }
    } catch (error) {}
  };

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({ image, localId });
      navigation.goBack();
    } catch (error) {}
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
        <Text style={[styles.headerTitle, { width: setWidth(80) }]}>
          Selección de Imagen
        </Text>
      </View>
      {/* Recuadro para mostrar imagen seleccionada */}
      <View style={[styles.mainContainer, { height: setHeight(60) }]}>
        <View style={styles.frame}>
          {image || imageFromBase ? (
            <>
              <Image
                source={{ uri: image || imageFromBase?.image }}
                style={styles.image}
              />
              <TouchableOpacity
                style={[
                  styles.takePhotoButton,
                  { height: setHeight(6), width: setWidth(50) },
                ]}
                activeOpacity={0.8}
                onPress={pickImage}>
                <MaterialIcons
                  name="add-a-photo"
                  size={24}
                  color={Colors.DEFAULT_WHITE}
                />
                <Text style={styles.takePhotoButtonText}>Tomar otra foto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.takePhotoButton,
                  { height: setHeight(6), width: setWidth(50) },
                ]}
                activeOpacity={0.8}
                onPress={confirmImage}>
                <MaterialIcons
                  name="save"
                  size={24}
                  color={Colors.DEFAULT_WHITE}
                />

                <Text style={styles.takePhotoButtonText}>Confirmar foto</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.noImageContainer}>
                <Text style={[styles.noImageText, { width: setWidth(90) }]}>
                  No hay foto para {'\n'} mostrar...
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.takePhotoButton,
                  { height: setHeight(6), width: setWidth(50) },
                ]}
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
    textAlign: 'center',
    color: Colors.DEFAULT_GREY,
  },
  takePhotoButton: {
    backgroundColor: Colors.DEFAULT_RED,
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

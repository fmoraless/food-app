import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Separator from '../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Images from '../constants/Images';
import { ToggleButton } from 'react-native-paper';

const { height, width } = Dimensions.get('window');
// TODO: extraer a un Hook
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export const ProfileScreen = ({ navigation }) => {
  const handleImageSelection = () => {
    navigation.navigate('ImageSelectorScreen');
  };
  const defaultImageRoute = '../../assets/images/defaultProfile.png';

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
        <Text style={styles.headerText}>Mi Perfil</Text>
        <View>
          <Feather name="bell" size={20} color={Colors.DEFAULT_WHITE} />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
      </View>
      {/* Imagen de perfil */}
      <View style={styles.profileHeaderContainer}>
        {/* contenedor de imagen */}
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={Images.DEFAULT_AVATAR} />
        </View>
        {/* Textos nombre e email */}
        <View style={styles.profileTextContainer}>
          <Text style={styles.nameText}>John Doe</Text>
          <Text style={styles.emailText}>jdoe@example.com</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View style={styles.menuIcon}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={18}
              color={Colors.DEFAULT_RED}
            />
          </View>
          <Text style={styles.menuText}>Todos {'\n'} Mis Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View style={styles.menuIcon}>
            <MaterialCommunityIcons
              name="gift-outline"
              size={18}
              color={Colors.DEFAULT_RED}
            />
          </View>
          <Text style={styles.menuText}>Ofertas {'y\n'} Promos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View style={styles.menuIcon}>
            <Entypo name="address" size={18} color={Colors.DEFAULT_RED} />
          </View>
          <Text style={styles.menuText}>Mis {'\n'} Direcciones</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.sectionHeaderText}>Mi Cuenta</Text>
        <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="person-outline"
              size={18}
              color={Colors.DEFAULT_RED}
            />
            <Text style={styles.sectionText}>Administrar perfil</Text>
          </View>
          <Feather name="chevron-right" color={Colors.DEFAULT_GREY} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="card-outline"
              size={18}
              color={Colors.DEFAULT_RED}
            />
            <Text style={styles.sectionText}>Medios de pago</Text>
          </View>
          <Feather name="chevron-right" color={Colors.DEFAULT_GREY} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.sectionHeaderText}>Configuraciones</Text>
        <TouchableOpacity
          onPress={handleImageSelection}
          style={styles.sectionContainer}
          activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <MaterialCommunityIcons
              name="image-edit-outline"
              size={18}
              color={Colors.DEFAULT_RED}
            />

            <Text style={styles.sectionText}>Cambiar Imagen</Text>
          </View>
          <Feather name="chevron-right" color={Colors.DEFAULT_GREY} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <MaterialCommunityIcons
              name="logout"
              size={18}
              color={Colors.DEFAULT_RED}
            />
            <Text style={styles.sectionText}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  alertBadge: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  profileHeaderContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImageContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    elevation: 3,
  },
  profileImage: {
    width: setWidth(15),
    height: setWidth(15),
    borderRadius: 32,
    resizeMode: 'contain',
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  emailText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  menuContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
  },
  menuIcon: {
    backgroundColor: Colors.LIGHT_RED,
    height: setWidth(8),
    width: setWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  menuText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center',
    marginTop: 5,
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
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginTop: 25,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  sectionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    lineHeight: 13 * 1.4,
    color: Colors.INACTIVE_GREY,
    marginLeft: 10,
  },
});

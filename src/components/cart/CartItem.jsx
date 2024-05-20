import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../../features/Cart/cartSlice';

const { height, width } = Dimensions.get('window');

// TODO: extraer a un Hook
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export const CartItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(1);

  const handleRemoveItemFromCart = () => {
    dispatch(removeCartItem({ ...item }));
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Product', { item })}>
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={styles.image}
        />
      </Pressable>

      <View style={styles.detailsContainer}>
        <TouchableOpacity
          onPress={() => console.log('item')}
          activeOpacity={0.8}>
          <Text numberOfLines={1} style={styles.titleText}>
            {item.name}
          </Text>
          <Text numberOfLines={2} style={styles.descriptionText}>
            {item.description}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>${item.itemTotal}</Text>
          <View style={styles.itemAddContainer}>
            {itemCount > 0 ? (
              <>
                {/* <AntDesign
                  name="minus"
                  color={Colors.DEFAULT_YELLOW}
                  size={18}
                  onPress={() => console.log('item')}
                /> */}
                <Text style={styles.itemCountText}>{item.quantity}</Text>
              </>
            ) : null}
            {/* <AntDesign
              name="plus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
              onPress={() => addToCart(id)}
            /> */}
          </View>
          <Pressable onPress={handleRemoveItemFromCart}>
            <Ionicons name="trash-sharp" size={23} color={Colors.DEFAULT_RED} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // display items in a single row
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    width: 100, // adjust the image width to your liking (e.g., 30% of the screen)
    height: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: setWidth(60),
    color: Colors.DEFAULT_GREY,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 14 * 1.4,
    //marginHorizontal: ,
  },
});

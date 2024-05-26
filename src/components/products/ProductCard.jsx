import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setIdSelected } from '../../features/Shop/shopSlice';

export const ProductCard = ({ item }) => {
  const { height, width } = useWindowDimensions();
  const DYNAMIC_WIDTH = width / 2 - 30;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setIdSelected(item));
    navigation.navigate('Product', { item });
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={handleNavigate}>
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={{
            ...{
              width: DYNAMIC_WIDTH || 'auto',
              height: 100,
              borderRadius: 10,
            },
          }}
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <Text style={styles.productNameText}>{item.name}</Text>
        <Text>${item.price}</Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 3 }}>
        <Icon source="star" color={Colors.DEFAULT_YELLOW} size={20} />
        <Icon source="star" color={Colors.DEFAULT_YELLOW} size={20} />
        <Icon source="star" color={Colors.DEFAULT_YELLOW} size={20} />
        <Icon source="star" color={Colors.DEFAULT_YELLOW} size={20} />
        <Icon source="star-half" color={Colors.DEFAULT_YELLOW} size={20} />
        <View style={{ flex: 1 }} />
        <Text>4.8</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginBottom: 10,
  },
  image: {
    borderRadius: 10,
  },
  productNameText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

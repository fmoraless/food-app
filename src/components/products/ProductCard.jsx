import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import Colors from '../../constants/Colors';

export const ProductCard = ({ name, image, price }) => {
  const { height, width } = useWindowDimensions();
  const DYNAMIC_WIDTH = width / 2 - 30;

  // console.log(height, DYNAMIC_WIDTH);
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={{
          ...{ width: DYNAMIC_WIDTH || 'auto', height: 100, borderRadius: 10 },
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <Text style={styles.productNameText}>{name}</Text>
        <Text>${price}</Text>
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

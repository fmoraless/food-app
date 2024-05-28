import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Images from '../constants/Images';
import { ActivityIndicator, Icon } from 'react-native-paper';
import Separator from '../components/Separator';
import { FAB } from '../components/FAB';
import { useGetProductByIdQuery } from '../services/shopService';
import { FullScreenLoader } from '../components/FullScreenLoader';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../features/Cart/cartSlice';
import useDimensions from '../hooks/useDimensions';
import { formattedPrice } from '../utils/helpers';

const setStyle = (isActive) =>
  isActive
    ? styles.subMenuButtonText
    : { ...styles.subMenuButtonText, color: Colors.DEFAULT_GREY };

export const ProductScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { setHeight, setWidth } = useDimensions();
  const dispatch = useDispatch();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(parseInt(item.id));

  const [selectedSubMenu, setSelectedSubMenu] = useState('Details');
  const [quantity, setQuantity] = useState(1);

  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddCart = () => {
    dispatch(addCartItem({ ...product, quantity: quantity, itemTotal: total }));
    navigation.popToTop();
  };

  useEffect(() => {
    if (product) {
      setTotal(product.price * quantity);
    }
  }, [product, quantity]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 200,
          }}>
          <FullScreenLoader />
        </View>
      ) : (
        <>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />

          <Image
            style={[
              styles.image,
              { width: setWidth(100), height: setWidth(100) },
            ]}
            source={{
              uri: product.image,
            }}
            resizeMode="cover"
          />

          <FAB
            iconName="arrow-left"
            onPress={() => navigation.goBack()}
            style={{ top: 35, left: 20 }}
          />

          <ScrollView>
            <Separator height={setWidth(100)} />
            <View style={styles.mainContainer}>
              <View style={styles.titleHeaderContainer}>
                <Text style={styles.titleText}>{product?.name}</Text>
                <Text style={styles.priceText}>
                  ${formattedPrice(product?.price)}
                </Text>
              </View>
              <View style={styles.subHeaderContainer}>
                <View style={styles.rowAndCenter}>
                  <FontAwesome
                    name="star"
                    size={20}
                    color={Colors.DEFAULT_YELLOW}
                  />
                  <Text style={styles.ratingText}>4.2</Text>
                  <Text style={styles.reviewsText}>(255)</Text>
                </View>
                <View style={styles.rowAndCenter}>
                  <Image
                    style={styles.iconImage}
                    source={Images.DELIVERY_TIME}
                  />
                  <Text style={styles.deliveryText}>20 min</Text>
                </View>
                <View style={styles.rowAndCenter}>
                  <Image
                    style={styles.iconImage}
                    source={Images.DELIVERY_CHARGE}
                  />
                  <Text style={styles.deliveryText}>Free Delivery</Text>
                </View>
              </View>
              <View style={styles.subMenuContainer}>
                <TouchableOpacity
                  style={[
                    styles.subMenuButtonContainer,
                    { width: setWidth(30) },
                  ]}
                  onPress={() => setSelectedSubMenu('Details')}>
                  <Text style={setStyle(selectedSubMenu === 'Details')}>
                    Detalles
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.subMenuButtonContainer,
                    { width: setWidth(30) },
                  ]}
                  onPress={() => setSelectedSubMenu('Reviews')}>
                  <Text style={setStyle(selectedSubMenu === 'Reviews')}>
                    Valoraciones
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailsContainer}>
                {product?.description ? (
                  <>
                    <Text style={styles.detailHeader}>Descripción</Text>
                    <Text style={styles.detailContent}>
                      {product?.description}
                    </Text>
                  </>
                ) : null}
                {product?.ingredients ? (
                  <>
                    <Text style={styles.detailHeader}>Ingredientes</Text>
                    <Text style={styles.detailContent}>
                      {product?.ingredients}
                    </Text>
                  </>
                ) : null}
              </View>
            </View>
          </ScrollView>
          <View
            style={[
              styles.buttonsContainer,
              {
                paddingHorizontal: setWidth(5),
                width: setWidth(100),
                paddingVertical: setWidth(2.5),
              },
            ]}>
            <View
              style={[
                styles.itemAddContainer,
                { height: setHeight(6), width: setWidth(30) },
              ]}>
              <AntDesign
                name="minuscircle"
                color={
                  quantity === 1 ? Colors.DEFAULT_GREY : Colors.DEFAULT_YELLOW
                }
                size={30}
                onPress={decrease}
              />
              <Text style={styles.intemCounText}>{quantity}</Text>
              <AntDesign
                name="pluscircle"
                color={Colors.DEFAULT_YELLOW}
                size={30}
                onPress={increment}
              />
            </View>
            {/* boton carrito */}
            <TouchableOpacity
              style={[
                styles.cartButton,
                { height: setHeight(6), width: setWidth(58) },
              ]}
              onPress={handleAddCart}
              activeOpacity={0.8}>
              <Icon source="cart" color={Colors.DEFAULT_WHITE} size={18} />
              <Text style={styles.cartButtonText}>Añadir</Text>
              <Text style={styles.cartButtonText}>
                ${formattedPrice(total)}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  titleText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.DEFAULT_BLACK,
  },
  priceText: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.DEFAULT_YELLOW,
  },
  mainContainer: {
    //marginTop: 350,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  image: {
    position: 'absolute',
    top: 0,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: 'Poppins-Bold',
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
  },
  reviewsText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: 'Poppins-Medium',
    color: Colors.DEFAULT_BLACK,
    marginLeft: 5,
  },
  iconImage: {
    height: 20,
    width: 20,
  },
  deliveryText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: 'Poppins-Medium',
    color: Colors.DEFAULT_BLACK,
    marginLeft: 3,
  },
  subMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    marginTop: 20,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: 'space-evenly',
  },
  subMenuButtonContainer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  subMenuButtonText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.DEFAULT_BLACK,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailHeader: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.DEFAULT_BLACK,
    marginTop: 10,
    marginBottom: 2,
  },
  detailContent: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.INACTIVE_GREY,
    textAlign: 'justify',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    borderRadius: 8,
  },
  intemCounText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 8,
  },
  cartButton: {
    backgroundColor: Colors.DEFAULT_RED,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 10,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: 'Poppins-Medium',
  },
});

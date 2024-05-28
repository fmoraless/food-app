import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import Separator from '../components/Separator';
import { FAB } from '../components/FAB';
import { Icon } from 'react-native-paper';
import cartData from '../mocked/cart.json';
import { useNavigation } from '@react-navigation/native';
import { CartItem } from '../components/cart/CartItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Images from '../constants/Images';
import { useDispatch, useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/shopService';
import { clearCart } from '../features/Cart/cartSlice';
import { FullScreenLoader } from '../components/FullScreenLoader';
import useDimensions from '../hooks/useDimensions';
import { formattedPrice } from '../utils/helpers';

export const CartScreen = ({ navigation }) => {
  const { setHeight, setWidth } = useDimensions();
  const dispatch = useDispatch();

  const { localId } = useSelector((state) => state.auth.value);

  const { items: cartData, total } = useSelector((state) => state.cart.value);

  const [triggerPostOrder, result, isLoading] = usePostOrderMutation();

  const onConfirmOrder = async () => {
    const orderData = {
      items: cartData,
      user: localId,
      total,
      createdAt: new Date().toLocaleString(),
    };

    try {
      triggerPostOrder(orderData);
    } catch (error) {}
  };

  useEffect(() => {
    if (isLoading) {
      return <FullScreenLoader />;
    }
    if (result?.data && result.isSuccess) {
      Alert.alert('Orden creada existosamente');
      dispatch(clearCart());
    }
  }, [result]);

  const ListFooterComponent = () => <View style={{ marginBottom: 50 }} />;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <View style={[styles.btn]}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon source="arrow-left" size={25} color="white" />
          </Pressable>
        </View>
        <Text style={[styles.headerTitle, { width: setWidth(80) }]}>
          Mi Carrito
        </Text>
      </View>
      {cartData?.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              {cartData?.map((item) => (
                <CartItem item={item} key={item?.id} />
              ))}
            </View>
            <View
              style={[
                styles.amountContainer,
                { marginHorizontal: setWidth(4) },
              ]}>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Sub total</Text>
                <Text style={styles.amountText}>${formattedPrice(total)}</Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Descuento</Text>
                <Text style={styles.amountText}>$0</Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Costo envío</Text>
                <Text style={styles.amountText}>$0</Text>
              </View>
            </View>
            <View
              style={[
                styles.totalContainer,
                { marginHorizontal: setWidth(4) },
              ]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>${formattedPrice(total)}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.checkoutButton,
                { width: setWidth(80), height: setHeight(7) },
              ]}
              onPress={onConfirmOrder}>
              <View style={styles.rowAndCenter}>
                <Ionicons
                  name="cart-outline"
                  color={Colors.DEFAULT_WHITE}
                  size={20}
                />
                <Text style={styles.checkoutText}>Pagar</Text>
              </View>
              <Text style={styles.checkoutText}>
                ${total !== 0 ? formattedPrice(total) : 0}
              </Text>
            </TouchableOpacity>
            <Separator height={setHeight(8)} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={{
              height: setWidth(60),
              width: setWidth(60),
            }}
            source={Images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Carro Vacío</Text>
          <Text style={styles.emptyCartSubText}>
            Adelante, pide alguno de nuestros platos
          </Text>
          <TouchableOpacity
            style={[styles.addButtonEmpty, { paddingHorizontal: setWidth(4) }]}
            onPress={() => navigation.navigate('Home')}>
            <AntDesign name="plus" color={Colors.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Agregar</Text>
          </TouchableOpacity>
          <Separator height={setHeight(10)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    textAlign: 'center',
  },
  btn: {
    zIndex: 1,
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: Colors.DEFAULT_RED,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 0.5,
    },
    elevation: 5,
  },
  amountContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_RED,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  totalContainer: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_RED,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: 'Poppins-Light',
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_RED,
    marginTop: 10,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
});

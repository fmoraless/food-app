import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Pressable,
  Dimensions,
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

const { height, width } = Dimensions.get('window');

// TODO: extraer a un Hook
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export const CartScreen = ({ navigation }) => {
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

  // TODO: Mover a un helper
  const formattedPrice = (price) => {
    const formatter = new Intl.NumberFormat('es-CL');
    return formatter.format(price);
  };

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
        <Text style={styles.headerTitle}>Mi Carrito</Text>
      </View>
      {cartData?.length > 0 ? (
        <>
          {/* <FlatList
            data={cartData}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item, index) => item.id + index.toString}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<ListFooterComponent />}
          /> */}
          <ScrollView>
            <View style={styles.foodList}>
              {cartData?.map((item) => (
                <CartItem item={item} key={item?.id} />
              ))}
            </View>
            <View style={styles.amountContainer}>
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
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>${formattedPrice(total)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
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
            style={styles.emptyCartImage}
            source={Images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Carro Vacío</Text>
          <Text style={styles.emptyCartSubText}>
            Adelante, pide alguno de nuestros platos
          </Text>
          <TouchableOpacity
            style={styles.addButtonEmpty}
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
    width: setWidth(80),
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
    marginHorizontal: setWidth(4),
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
    marginHorizontal: setWidth(4),
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
    width: setWidth(80),
    backgroundColor: Colors.DEFAULT_RED,
    height: setHeight(7),
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
  emptyCartImage: {
    height: setWidth(60),
    width: setWidth(60),
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
    paddingHorizontal: setWidth(4),
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

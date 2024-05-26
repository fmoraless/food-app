import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SectionListComponent,
  SectionList,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useGetOrdersQuery } from '../services/shopService';
import Separator from '../components/Separator';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FullScreenLoader } from '../components/FullScreenLoader';
import Images from '../constants/Images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window');
// TODO: extraer a un Hook
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export const OrdersScreen = () => {
  const navigation = useNavigation();
  const [ordersByUser, setOrdersByUser] = useState({});
  const { localId } = useSelector((state) => state.auth.value);
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  const filterOrdersByUser = (orders, userId) => {
    let filteredOrders = {};

    for (let orderId in orders) {
      if (orders[orderId].user === userId) {
        filteredOrders[orderId] = orders[orderId];
      }
    }

    return filteredOrders;
  };

  useEffect(() => {
    const userOrders = filterOrdersByUser(orders, localId);

    setOrdersByUser(userOrders);
  }, [orders, localId]);

  if (isLoading) return <Text>Loading...</Text>;

  const sections = Object.keys(ordersByUser).map((key) => ({
    title: `${ordersByUser[key].createdAt}`,
    total: ordersByUser[key].total,
    data: ordersByUser[key].items,
  }));

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.headerStyle}>
      <Text style={styles.sectionHeader}>{title}</Text>
    </View>
  );

  const renderSectionFooter = ({ section: { total } }) => (
    <View style={styles.footerStyle}>
      <Text style={styles.totalamountText}>{total}</Text>
    </View>
  );

  const Item = ({ name, quantity, price }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemLine}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.priceText}>x{quantity}</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.amountText}>${price}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item name={item.name} quantity={item.quantity} price={item.price} />
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyCartContainer}>
      <Image
        style={styles.emptyCartImage}
        source={Images.EMPTY_ORDERS}
        resizeMode="contain"
      />
      <Text style={styles.emptyCartText}>No tienes pedidos aún</Text>
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
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <View style={[styles.btn]}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon source="arrow-left" size={25} color="white" />
          </Pressable>
        </View>
        <Text style={styles.headerTitle}>Mis Pedidos</Text>
      </View>
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
      <Text>{}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  orderContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  screenTitle: {
    marginTop: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 16,
    color: 'green',
  },
  itemContainer: {
    paddingVertical: 5,
    marginHorizontal: 20,
  },
  headerStyle: {
    backgroundColor: '#F4CE14',
  },
  sectionHeader: {
    backgroundColor: Colors.DEFAULT_GREY,
    color: Colors.DEFAULT_BLACK,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingVertical: 5,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
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
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    width: setWidth(80),
    textAlign: 'center',
  },
  itemLine: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  nameText: {
    width: setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  amountText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  footerStyle: {
    //    backgroundColor: Colors.DEFAULT_GREY,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: Colors.DEFAULT_GREY,
    marginBottom: 10,
  },
  totalamountText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginEnd: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartImage: {
    height: setWidth(70),
    width: setWidth(70),
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

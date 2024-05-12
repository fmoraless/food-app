import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Searchbar } from 'react-native-paper';

import Separator from '../components/Separator';
import Colors from '../constants/Colors';
import { Mock } from '../constants';
import CategoryMenuItem from '../components/categories/CategoryMenuItem';
import { ProductCard } from '../components/products/ProductCard';
import responseProducts from '../mocked/products.json';
import { useSelector, useDispatch } from 'react-redux';
import { setIdSelected } from '../../src/features/Shop/shopSlice';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  //const [activeCategory, setActiveCategory] = useState('');
  const products = responseProducts.products;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productos, setProductos] = useState(products);

  const activeCategory = useSelector(
    (state) => state.shop.value.categorySelected,
  );

  //const searchQuery = useSelector((state) => state.shop.value.itemIdSelected);

  /* const setSearchQuery = () => {
    dispatch(setIdSelected(searchQuery));
  }; */

  // TODO: aplicar Debounce

  const filterProducts = () => {
    let filtered = productos;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (activeCategory) {
      filtered = filtered.filter((product) => {
        return product.category.includes(activeCategory);
      });
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, activeCategory]);

  const ListFooterComponent = () => <View style={{ marginBottom: 180 }} />;

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
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Searchbar
                placeholder="Buscar..."
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {Mock.CATEGORIES.map(({ name, logo }) => (
            <CategoryMenuItem
              key={name}
              name={name}
              logo={logo}
              activeCategory={activeCategory}
              //setActiveCategory={setActiveCategory}
            />
          ))}
        </View>
      </View>

      <View
        style={{
          marginTop: 40,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 8,
          }}>
          <FlatList
            data={filteredProducts}
            numColumns={2}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item, index) => item.id + index.toString}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<ListFooterComponent />}
          />
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
    justifyContent: 'space-evenly',
  },
  searchContainer: {
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: { paddingVertical: 5, zIndex: -5 },
  horizontalListContainer: { marginTop: 40 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  listHeaderTitle: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  listHeaderSubtitle: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
});

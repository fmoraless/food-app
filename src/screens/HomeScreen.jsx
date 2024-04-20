import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import { Searchbar } from 'react-native-paper';

import Separator from '../components/Separator';
import Colors from '../constants/Colors';
import { Fonts, Mock } from '../constants';
import CategoryMenuItem from '../components/categories/CategoryMenuItem';
import { ProductCard } from '../components/products/ProductCard';
import responseProducts from '../mocked/products.json';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const products = responseProducts.products;

  const [productos, setProductos] = useState(products);

  console.log(productos);

  const productsByCategory = products.filter((product) => {
    return product.category === activeCategory;
  });
  console.log({ productsByCategory });
  // console.log({ searchQuery });
  useEffect(() => {
    setProductos(products);
  }, []);

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
            <Searchbar
              placeholder="Buscar..."
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {Mock.CATEGORIES.map(({ name, logo }) => (
            <CategoryMenuItem
              key={name}
              name={name}
              logo={logo}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </View>
      </View>
      {/* <ScrollView style={styles.listContainer}>
        <View style={styles.horizontalListContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Mejor valorados</Text>
            <Text style={styles.listHeaderSubtitle}>Todos</Text>
          </View>
          <FlatList
            data={productos}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard {...item} />}
          />
        </View>
      </ScrollView> */}
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
          <Text>{activeCategory || 'Sin Seleccion'}</Text>
          {/* <Text>{JSON.stringify(productsByCategory, null, 2)}</Text> */}
          <FlatList
            data={productos}
            numColumns={2}
            renderItem={({ item }) => <ProductCard {...item} />}
            keyExtractor={(item, index) => item.id + index.toString}
            ListFooterComponent={<View style={{ marginBottom: 200 }} />}
            showsVerticalScrollIndicator={false}
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

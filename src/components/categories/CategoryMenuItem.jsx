import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Images from '../../constants/Images';
import Colors from '../../constants/Colors';
import { Icons } from '../../constants/Icons';
import { Icon, MD3Colors } from 'react-native-paper';

const CategoryMenuItem = ({
  name,
  logo,
  activeCategory,
  setActiveCategory,
}) => {
  // console.log(logo);
  const icono = Icons[logo];
  console.log(activeCategory);
  return (
    <TouchableOpacity
      style={styles.category()}
      key={name}
      onPress={() => setActiveCategory(name)}>
      <Image
        source={Images[logo]}
        style={styles.categoryIcon(activeCategory === name)}
      />
      <Text style={styles.categoryText(activeCategory === name)}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: (marginTop = 0) => ({
    alignItems: 'center',
    marginTop,
  }),
  categoryIcon: (isActive) => ({
    height: 30,
    width: 30,
    opacity: isActive ? 1 : 0.5,
  }),
  categoryText: (isActive) => ({
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginTop: 5,
    opacity: isActive ? 1 : 0.5,
  }),
});

export default CategoryMenuItem;

import React from 'react';
import { Icon } from 'react-native-paper';
import Colors from './Colors';

export const Icons = {
  FRIED_CHICKEN: (
    <Icon source="food-drumstick" color={Colors.DEFAULT_WHITE} size={40} />
  ),
  SANDWICHS: <Icon source="food" color={Colors.DEFAULT_WHITE} size={40} />,
  PIZZA: <Icon source="pizza" color={Colors.DEFAULT_WHITE} size={40} />,
  DRINKS: <Icon source="food-variant" color={Colors.DEFAULT_WHITE} size={40} />,
  HOT_DOGS: (
    <Icon source="food-hot-dog" color={Colors.DEFAULT_WHITE} size={40} />
  ),

  /* SANDWICHS: require('../../assets/images/food-categories/burger.png'),
    PIZZA: require('../../assets/images/food-categories/pizza.png'),
    DRINKS: require('../../assets/images/food-categories/drinks.png'),
    SNACKS: require('../../assets/images/food-categories/dessert.png'), */
};

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: {
      user: 'fmoraless',
      updatedAt: new Date().toLocaleString(),
      total: null,
      totalItemsQuantity: null,
      items: [],
    },
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      const productRepeated = state.value.items.find(
        (item) => item.id === payload.id,
      );

      if (productRepeated) {
        const itemsUpdated = state.value.items.map((item) => {
          if (item.id === payload.id) {
            item.quantity += payload.quantity;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, currentItem) =>
            (acc += currentItem.price * currentItem.quantity),
          0,
        );
        const totalItemsQuantity = itemsUpdated.reduce(
          (acc, currentItem) => (acc += currentItem.quantity),
          0,
        );
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          totalItemsQuantity,
          updatedAt: new Date().toLocaleString(),
        };
      } else {
        state.value.items.push(payload);
        const total = state.value.items.reduce(
          (acc, currentItem) =>
            (acc += currentItem.price * currentItem.quantity),
          0,
        );
        const totalItemsQuantity = state.value.items.reduce(
          (acc, currentItem) => (acc += currentItem.quantity),
          0,
        );
        state.value = {
          ...state.value,
          total,
          totalItemsQuantity,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },
    removeCartItem: (state, { payload }) => {
      // logic for removing
      console.log({ itemToRemove: payload.id });
      // remove item from cart
      const nextCartItems = state.value.items.filter(
        (cartItem) => cartItem.id !== payload.id,
      );

      const total = nextCartItems.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0,
      );
      const totalItemsQuantity = nextCartItems.reduce(
        (acc, currentItem) => (acc += currentItem.quantity),
        0,
      );
      state.value.items = nextCartItems;
      state.value.total = total;
      state.value.totalItemsQuantity = totalItemsQuantity;
      state.value.updatedAt = new Date().toLocaleString();
    },
    clearCart: (state) => {
      state.value = {
        user: state.value.user,
        updatedAt: new Date().toLocaleString(),
        total: null,
        totalItemsQuantity: null,
        items: [],
      };
    },
  },
});

export const { addCartItem, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

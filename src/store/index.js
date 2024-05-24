import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import shopReducer from '../features/Shop/shopSlice';
import cartReducer from '../features/Cart/cartSlice';
import authReducer from '../features/User/userSlice';
import { shopApi } from '../services/shopService';
import { authApi } from '../services/authService';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;

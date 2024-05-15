import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import shopReducer from '../features/Shop/shopSlice';
import { shopApi } from '../services/shopService';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    shop: shopReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});

setupListeners(store.dispatch);

export default store;

import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../features/Shop/shopSlice';

export default configureStore({
  reducer: {
    shop: shopReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import sellerReducer from '../features/seller/sellerSlice';


const store = configureStore({
    reducer: {seller: sellerReducer, },
  });

  export default store;
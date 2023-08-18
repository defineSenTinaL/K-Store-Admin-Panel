import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "../features/seller/sellerSlice";
import shiprocketReducer from "../features/shiprocket/shiprocketSlice";

const store = configureStore({
  reducer: { seller: sellerReducer, shiprocket: shiprocketReducer },
});

export default store;

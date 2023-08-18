// shiprocketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('shiprocketToken') || null,
};

const shiprocketSlice = createSlice({
  name: 'shiprocket',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('shiprocketToken', action.payload); // Store in local storage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('shiprocketToken'); // Remove from local storage
    },
  },
});

export const { setToken, clearToken } = shiprocketSlice.actions;

export default shiprocketSlice.reducer;

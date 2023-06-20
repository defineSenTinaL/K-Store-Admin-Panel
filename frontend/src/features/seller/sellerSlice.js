import { createSlice } from '@reduxjs/toolkit';

const sellerSlice = createSlice({
  name: 'seller',
  initialState: null,
  reducers: {
    setLoggedInSeller: (state, action) => {
      return action.payload;
    },
    logoutSeller: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoggedInSeller, logoutSeller } = sellerSlice.actions;
export default sellerSlice.reducer;
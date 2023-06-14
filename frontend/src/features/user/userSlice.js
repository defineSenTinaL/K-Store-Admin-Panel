import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setLoggedInUser: (state, action) => {
      return action.payload;
    },
    logoutUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoggedInUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
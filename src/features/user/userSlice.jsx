import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOnline: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserStatus: (state, action) => {
      state.userOnline = action.payload;
    },
    getCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateUserStatus, getCurrentUser } = userSlice.actions;

export default userSlice.reducer;

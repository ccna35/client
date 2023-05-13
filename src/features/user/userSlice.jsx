import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOnline: false,
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserStatus: (state, action) => {
      state.userOnline = action.payload;
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { updateUserStatus, getUserId } = userSlice.actions;

export default userSlice.reducer;

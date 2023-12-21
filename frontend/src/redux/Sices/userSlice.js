import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gUser: null,
  msg: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    getUser(state, action) {
      state.gUser = action.payload;
    },
    getMsg(state, action) {
      state.msg = action.payload;
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };

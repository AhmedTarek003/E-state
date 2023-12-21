import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("UserInfo")
    ? JSON.parse(localStorage.getItem("UserInfo"))
    : null,
  registerMSG: null,
  verifyMSG: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    authUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
    getVerifyMSG(state, action) {
      state.verifyMSG = action.payload;
    },
    getRegisterMSG(state, action) {
      state.registerMSG = action.payload;
    },
    clearRegisterMSG(state) {
      state.registerMSG = null;
    },
  },
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authActions, authReducer };

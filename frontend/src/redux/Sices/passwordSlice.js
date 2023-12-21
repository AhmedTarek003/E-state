import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newPassMsg: null,
  errPassMsg: null,
};

const passSlice = createSlice({
  name: "pass",
  initialState,
  reducers: {
    newPassMsg(state, action) {
      state.newPassMsg = action.payload;
    },
    clearNewPassMsg(state) {
      state.newPassMsg = null;
    },
    errPassMsg(state, action) {
      state.errPassMsg = action.payload;
    },
  },
});

const passActions = passSlice.actions;
const passReducer = passSlice.reducer;

export { passActions, passReducer };

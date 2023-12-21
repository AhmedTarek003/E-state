import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchWord(state, action) {
      state.search = action.payload;
    },
  },
});

const searchActions = searchSlice.actions;
const searchReducer = searchSlice.reducer;

export { searchActions, searchReducer };

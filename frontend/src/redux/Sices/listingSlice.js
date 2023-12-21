import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  listing: null,
  loading: false,
  msg: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    getAllListings(state, action) {
      state.listings = action.payload;
    },
    getSingleListing(state, action) {
      state.listing = action.payload;
    },
    createListing(state, action) {
      state.listings.pop(action.payload);
    },
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
    createdMSG(state, action) {
      state.msg = action.payload;
    },
    clearCreatedMSG(state) {
      state.msg = null;
    },
  },
});

const listingActions = listingSlice.actions;
const listingReducer = listingSlice.reducer;

export { listingActions, listingReducer };

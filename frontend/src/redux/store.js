import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Sices/authSlice";
import { userReducer } from "./Sices/userSlice";
import { listingReducer } from "./Sices/listingSlice";
import { searchReducer } from "./Sices/searchSlice";
import { passReducer } from "./Sices/passwordSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    listing: listingReducer,
    search: searchReducer,
    pass: passReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import tokenSlice from "./tokenSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    token: tokenSlice.reducer,
  },
});

export default store;
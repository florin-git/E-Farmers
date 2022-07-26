import { createSlice } from "@reduxjs/toolkit";

/**
 * Reducers are functions that take the current state and an action
 * as arguments, and return a new state.
 * 	(state, action) => newState
 */

const authSlice = createSlice({
  // Slice for authentication
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    userId: null,
    accountType: 0,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);

      // These are the data from the Login form
      state.userId = action.payload.userId;
      state.accountType = action.payload.accountType;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", false);
      
      state.userId = null;
      state.accountType = 0;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

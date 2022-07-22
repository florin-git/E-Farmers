import { createSlice } from "@reduxjs/toolkit";

/**
 * Reducers are functions that take the current state and an action
 * as arguments, and return a new state.
 * 	(state, action) => newState
 */

const tokenSlice = createSlice({
  // Slice for authentication
  name: "token",
  initialState: { accessToken: null, refreshToken: null },
  reducers: {
    storeToken(state, action) {
      // These are the data from the Login form
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    removeToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const tokenActions = tokenSlice.actions;
export default tokenSlice;

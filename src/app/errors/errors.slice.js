import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorData: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    loadError: (state, action) => {
      if (!Array.isArray(state.errorData)) state.errorData = [];
      state.errorData.push(action.payload);
    },
    clearError: (state) => {
      state.errorData = null;
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice;

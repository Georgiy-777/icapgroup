import { createSlice } from "@reduxjs/toolkit";
import authOperation from "./auth-operation";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isFetchingCurrent: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  recovery_email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRecovery: (state, action) => {
      // console.log("ssssss");
      state.recovery_email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authOperation.register.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(authOperation.register.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      }),
      builder.addCase(authOperation.register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
      }),
      builder.addCase(authOperation.logIn.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(authOperation.logIn.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.token = action.payload?.refreshToken;
        state.isLoggedIn = !!action.payload?.refreshToken || undefined;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      }),
      builder.addCase(authOperation.googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload?.user?.providerData;
        state.token = action.payload?.accessToken;
        state.isLoggedIn = !!action.payload?.accessToken || undefined;
      }),
      builder.addCase(
        authOperation.googleSignOut.fulfilled,
        (state, action) => {
          state.user = null;
          state.token = null;
          state.isLoggedIn = false;
        }
      );
  },
});

export const extraAuthActions = authSlice.actions;

export default authSlice;

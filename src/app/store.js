import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { terazApi } from "./teraz_api/teraz_api";
// import accountSlice from "./account/account.slice";
import authSlice from "./auth/auth-slice";
import errorSlice from "./errors/errors.slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isLoggedIn", "recovery_email"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  error: errorSlice.reducer,
  [terazApi.reducerPath]: terazApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(terazApi.middleware)
     
});

export const persistor = persistStore(store);

export default store;

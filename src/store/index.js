import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { persistReducer, persistStore } from 'redux-persist';
import { icapgroupApi } from '@/services/apiService';
import authSlice from './auth/auth.slice';
// import projectsSlice from './projects/projects.slice';
// import profileSlice from './profile/profile.slice';
// import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import contentSlice from './content/content.slice';


const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const contentConfig = {
  key: 'content',
  storage,
  whitelist: [],
};

const rootReducers = combineReducers({
  auth: persistReducer(authConfig, authSlice.reducer),
  // projects: persistReducer(projectsConfig, projectsSlice.reducer),
  // profile: persistReducer(profileConfig, profileSlice.reducer),
  content: persistReducer(contentConfig, contentSlice.reducer),
  // pipeline: persistReducer(pipelineConfig, pipelineSlice.reducer),

  [icapgroupApi.reducerPath]: icapgroupApi.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      icapgroupApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;

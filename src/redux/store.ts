import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import projectsReducer from './features/projectsSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
});

const persistConfig = {
  key: 'kaiju-developer-portal',
  storage: storage,
  version: parseInt(process.env.NEXT_PUBLIC_REDUX_PERSIST_VERSION!),
  whitelist: ['auth', 'projects'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

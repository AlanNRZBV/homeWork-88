import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {usersReducer} from "../features/Users/usersSlice.ts";
import {threadsReducer} from "../features/Threads/threadsSlice.ts";

const usersPersistConfig = {
  key: 'forum:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  threads: threadsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
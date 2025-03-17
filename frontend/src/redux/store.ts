import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import storage from 'redux-persist/lib/storage'; // Uses localStorage for persistence
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root', // Key for storing data in localStorage
  storage, // Storage engine (localStorage by default)
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use persisted reducer
  },
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

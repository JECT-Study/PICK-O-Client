import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import tokenReducer from './auth';

const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useNewDispatch = () => useDispatch<AppDispatch>();
export const useNewSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

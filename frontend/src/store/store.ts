import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../store/counterSlice";
import userReducer from "../store/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

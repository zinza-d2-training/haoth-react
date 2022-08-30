import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import forgotPasswordReducer from '../features/user/forgotPasswordSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

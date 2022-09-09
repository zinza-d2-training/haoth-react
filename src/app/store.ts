import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  userReducer,
  forgotPasswordReducer,
  registrationVaccineReducer
} from '../features/user/';
export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    registrationVaccine: registrationVaccineReducer
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

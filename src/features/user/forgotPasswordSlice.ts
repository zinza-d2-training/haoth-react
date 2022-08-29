import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { fetchForgotPassword } from './userAPI';
export interface ForgotState {
  message: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: ForgotState = {
  message: '',
  status: 'idle',
  loading: false
};

export const forgotPasswordAsync = createAsyncThunk(
  'user/forgotPassword',
  async (payload: string) => {
    const response = await fetchForgotPassword(payload);
    return response.data;
  }
);

export const ForgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.message = 'Not found email';
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const selectLoading = (state: RootState) => state.forgotPassword.loading;
export const selectState = (state: RootState) => state.forgotPassword;
export default ForgotPasswordSlice.reducer;

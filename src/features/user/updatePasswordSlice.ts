import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUpdatePassword } from './userAPI';

interface IPasswordUpdate {
  password: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: IPasswordUpdate = {
  password: '',
  status: 'idle',
  loading: false
};

export const updatePasswordAsync = createAsyncThunk(
  'update-password',
  async (payload: string) => {
    const response = await fetchUpdatePassword(payload);
    return response;
  }
);

export const UpdatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(updatePasswordAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export default UpdatePasswordSlice.reducer;

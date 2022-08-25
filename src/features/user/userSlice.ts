import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { fetchLogin, User } from './userAPI';
export interface UserState {
  info?: User;
  token?: string;
  isFetching: boolean;
  error: boolean;
}
const initialState: UserState = {
  info: {},
  token: '',
  isFetching: false,
  error: false
};

export const loginAsync = createAsyncThunk(
  'user/fetchLogin',
  async (payload: User) => {
    const response = await fetchLogin(payload);
    return response.data;
  }
);

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.error = false;
        state.token = action.payload.token;
        state.info = action.payload;
        state.isFetching = false;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      });
  }
});

export const selectUser = (state: RootState) => state.user.info;
export const selectToken = (state: RootState) => state.user.token;
export const selectError = (state: RootState) => state.user.error;
export const selectIsFetching = (state: RootState) => state.user.isFetching;
export default UserSlice.reducer;
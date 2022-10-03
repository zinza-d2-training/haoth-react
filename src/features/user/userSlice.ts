import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { saveLocalStorage } from '../../utils/localStorage';
import { IResponseLogin, IUser, IUserLogin } from '../../interfaces/interface';
import { axioInstance } from '../../utils/request/httpRequest';
export interface UserState {
  info?: Partial<IUser>;
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
  async (
    payload: IUserLogin,
    { rejectWithValue }
  ): Promise<IResponseLogin | unknown> => {
    try {
      const response = await axioInstance.post<IResponseLogin>('auth/login', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
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
      .addCase(loginAsync.fulfilled, (state, action: any) => {
        saveLocalStorage('token', action.payload.token);
        saveLocalStorage('user', action.payload.user);
        state.error = false;
        state.token = action.payload.token;
        state.info = action.payload.user;
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

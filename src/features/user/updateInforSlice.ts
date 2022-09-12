import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';
import { saveLocalStorage } from '../../utils/localStorage';
import { fetchUpdateInformation, InfoUser } from './userAPI';

interface IDataUpdate {
  data: Partial<IUser>;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

export const updateInformationAsync = createAsyncThunk(
  '/update-information',
  async (payload: Partial<IUser>) => {
    const response = await fetchUpdateInformation(payload);
    return response;
  }
);

const initialState: IDataUpdate = {
  data: {
    card: '',
    name: '',
    birthday: '',
    gender: '',
    province: '',
    district: '',
    ward: ''
  },
  status: 'idle',
  loading: false
};

export const UpdateInformationSlice = createSlice({
  name: 'updateInformation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateInformationAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateInformationAsync.fulfilled, (state, action) => {
        const user = JSON.parse(
          localStorage.getItem('user') as string
        ) as InfoUser;
        const newUser: InfoUser = {
          ...user,
          ...action.payload
        };
        saveLocalStorage('user', newUser);
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(updateInformationAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export default UpdateInformationSlice.reducer;

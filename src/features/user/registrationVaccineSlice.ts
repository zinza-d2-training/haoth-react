import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { IVaccineRegistrationInfo } from '../../interfaces';
import { saveLocalStorage } from '../../utils/localStorage';
import { fetchRegistration } from './userAPI';

interface IVaccineRegistrationState {
  vaccineRegistrationInfo: IVaccineRegistrationInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

export const registrationAsync = createAsyncThunk(
  '/registration-vaccine',
  async (payload: IVaccineRegistrationInfo) => {
    const response = await fetchRegistration(payload);
    return response.data;
  }
);

const initialState: IVaccineRegistrationState = {
  vaccineRegistrationInfo: {
    id: 0,
    userId: '',
    group: '',
    cardInsurance: '',
    job: '',
    workplace: '',
    address: '',
    time: '',
    shift: ''
  },
  status: 'idle',
  loading: false
};

export const RegistrationVaccineSlice = createSlice({
  name: 'registrationVaccine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registrationAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(registrationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        saveLocalStorage('vaccineRegistration', action.payload);
        state.vaccineRegistrationInfo = action.payload;
        state.loading = false;
      })
      .addCase(registrationAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const selectInfoRegistration = (state: RootState) =>
  state.registrationVaccine.vaccineRegistrationInfo;
export default RegistrationVaccineSlice.reducer;

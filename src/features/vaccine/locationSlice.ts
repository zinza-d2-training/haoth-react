import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { ILocation } from '../../interfaces';
import { fetchStoreLocation } from '../api/vaccineApi';

interface ILocationState {
  location: ILocation;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: ILocationState = {
  location: {
    id: 0,
    name: '',
    street: '',
    leader: '',
    table: 0
  },
  status: 'idle',
  loading: false
};

export const fetchCreateLocation = createAsyncThunk(
  '/create-location',
  async (payload: Partial<ILocation>) => {
    const res = await fetchStoreLocation(payload);
    return res;
  }
);
export const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateLocation.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(fetchCreateLocation.fulfilled, (state, action) => {
        state.location = action.payload;
        console.log(action.payload);
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchCreateLocation.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const selectLocation = (state: RootState) => state.location.location;
export default LocationSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ILocation } from '../../interfaces/interface';

interface ILocationState {
  location: Partial<ILocation>;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: ILocationState = {
  location: {
    id: 0,
    name: '',
    address: '',
    wardId: 0,
    leader: '',
    table: 0
  },
  status: 'idle',
  loading: false
};

export const fetchCreateLocation = createAsyncThunk(
  '/create-location',
  async (payload: Partial<ILocation>): Promise<ILocation> => {
    try {
      const axiosToken = useAxiosPrivate();
      const res = await axiosToken.post<ILocation>('sites', payload);
      return res.data;
    } catch (error) {
      throw new Error();
    }
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

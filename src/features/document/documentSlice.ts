import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { IDocument } from '../../interfaces';
import { fetchStoreDocument } from '../api/documentApi';

interface IDocumentState {
  document: IDocument;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: boolean;
}

const initialState: IDocumentState = {
  document: {
    id: 0,
    title: '',
    description: '',
    download: 0,
    link: '#'
  },
  status: 'idle',
  loading: false
};

export const fetchCreateDocument = createAsyncThunk(
  '/create-document',
  async (payload: Partial<IDocument>) => {
    const res = await fetchStoreDocument(payload);
    return res;
  }
);
export const DocumentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateDocument.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(fetchCreateDocument.fulfilled, (state, action) => {
        state.document = action.payload;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchCreateDocument.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const selectDocument = (state: RootState) => state.document.document;
export default DocumentSlice.reducer;

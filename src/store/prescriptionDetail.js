import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
};

export const getPrescriptionDetail = createAsyncThunk(
  'prescriptionDetail/getPrescriptionDetails',
  async (id) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(`${baseUrl}/provider/prescription/fetch/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const prescriptionDetail = createSlice({
  name: 'support',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPrescriptionDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrescriptionDetail.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.result) {
        state.data = action.payload.result;
      }
    });
    builder.addCase(getPrescriptionDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default prescriptionDetail.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
  content: [],
  newReqState: {
    loading: false,
    status: '',
    loaded: false,
  },
};

export const getAllPayments = createAsyncThunk('payment', async (args) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/payment/all?page=${args.page}&size=${args.size}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getPaymentsWithFilter = createAsyncThunk('payment/filter', async (args) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/payment/all?status=${args.filter}&page=${args.page}&size=${args.size}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const PaymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.result;
      state.content = action.payload.result?.page_content;
    });
    builder.addCase(getAllPayments.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getPaymentsWithFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPaymentsWithFilter.fulfilled, (state, action) => {
      state.loading = false;
      state.content = action.payload.result?.page_content;
    });
    builder.addCase(getPaymentsWithFilter.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default PaymentSlice.reducer;

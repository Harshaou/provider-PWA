import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
  content: [],
  stats: null,
  statsLoading: false,
};

export const getStats = createAsyncThunk('report/stats', async (args) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(`${baseUrl}/provider/report/stats`, {
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
});

export const pendingClaimsReport = createAsyncThunk('reportClaims', async (args) => {
  let token = localStorage.getItem('x-auth-token');
  let urlWithOutFilter = `${baseUrl}/provider/report/claim?page=${args.page}&size=${args.size}`;
  let urlWithFilter = `${baseUrl}/provider/report/claim?page=${args.page}&size=${args.size}&status=${args.status}`;

  let baseUrll = args.status ? urlWithFilter : urlWithOutFilter;

  try {
    const response = await axios.get(baseUrll, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    args.modalOf();
    return response.data;
  } catch (error) {
    args.modalOf();
    console.log(error);
  }
});

export const approvedPreAuthsReport = createAsyncThunk('report/preAuths', async (args) => {
  let token = localStorage.getItem('x-auth-token');
  let urlWithOutFilter = `${baseUrl}/provider/report/pre-auth?page=${args.page}&size=${args.size}`;
  let urlWithFilter = `${baseUrl}/provider/report/pre-auth?page=${args.page}&size=${args.size}&status=${args.status}`;

  let baseUrll = args.status ? urlWithFilter : urlWithOutFilter;

  try {
    const response = await axios.get(baseUrll, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    args.modalOf();
    return response.data;
  } catch (error) {
    args.modalOf();
    console.log(error);
  }
});

export const getPaymentReport = createAsyncThunk('report', async (args) => {
  let token = localStorage.getItem('x-auth-token');
  let urlWithOutFilter = `${baseUrl}/provider/report/payment?page=${args.page}&size=${args.size}`;
  let urlWithFilter = `${baseUrl}/provider/report/payment?page=${args.page}&size=${args.size}&status=${args.status}`;

  let baseUrll = args.status ? urlWithFilter : urlWithOutFilter;
  try {
    const response = await axios.get(baseUrll, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    args.modalOf();
    console.log(response.data);
    return response.data;
  } catch (error) {
    args.modalOf();
    console.log(error);
  }
});

export const ReportSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    resetContent: (state) => {
      state.loading = false;
      state.data = null;
      state.content = [];
    },
    addHardCodeData: (state, action) => {
      state.loading = false;
      state.content = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getStats.pending, (state) => {
      state.statsLoading = true;
    });
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.statsLoading = false;
      state.stats = action.payload.result;
    });
    builder.addCase(getStats.rejected, (state) => {
      state.statsLoading = false;
    });
    builder.addCase(pendingClaimsReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(pendingClaimsReport.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.result;
      state.content = action.payload.result?.page_content;
    });
    builder.addCase(pendingClaimsReport.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(approvedPreAuthsReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(approvedPreAuthsReport.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.result;
      state.content = action.payload.result?.page_content;
    });
    builder.addCase(approvedPreAuthsReport.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getPaymentReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPaymentReport.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.result;
      state.content = action.payload.result?.page_content;
    });
    builder.addCase(getPaymentReport.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetContent, addHardCodeData } = ReportSlice.actions;

export default ReportSlice.reducer;

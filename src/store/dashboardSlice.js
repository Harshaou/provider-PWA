import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { baseUrl } from '../utils';

const initialState = {
  loading: false,
  snapshot: {},
  data: {
    content: [],
  },
  visits: {
    loading: false,
    data: [],
  },
};

export const getVisitDashboard = createAsyncThunk('getVisitDashboard', async () => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/visit?status=Open&sort=visitCreatedOn,desc`,
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

export const getSnapShot = createAsyncThunk('getSnapShot', async () => {
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

export const createVisit = createAsyncThunk('dashboard/createVisit', async ({ member }) => {
  try {
    const visit = {
      name: member?.name,
      visit_number: Math.floor(100000 + Math.random() * 900000),
      member_number: member.member_number,
      timestamp: new moment().format('DD-MM-YYYY hh:m A'),
    };
    console.log(visit);
    return visit;
  } catch (err) {
    console.log(err);
  }
});

export const getNewPreAuths = createAsyncThunk('dashboard/getLatestPreAuths', async () => {
  let token = localStorage.getItem('x-auth-token');

  try {
    const response = await axios.get(
      `${baseUrl}/provider/preauth/list?sort=created_timestamp,desc&size=10`,
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

export const getNewClaims = createAsyncThunk('dashboard/getLatestClaims', async () => {
  let token = localStorage.getItem('x-auth-token');

  try {
    const response = await axios.get(
      `${baseUrl}/provider/claim/list?sort=created_timestamp,desc&size=10`,
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

export const getMemberByCardNumber = createAsyncThunk('dashboard/getMember', async (memberNo) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(`${baseUrl}/provider/search/member/${memberNo}`, {
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

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetMember: (state) => {
      state.member.isSearchLoading = false;
      state.member.isSearchLoaded = false;
      state.member.data = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMemberByCardNumber.pending, (state) => {
      state.member.isSearchLoading = true;
    });
    builder.addCase(getMemberByCardNumber.fulfilled, (state, action) => {
      state.member.isSearchLoaded = true;
      state.member.isSearchLoading = false;
      state.member.data = action.payload.result;
    });
    builder.addCase(getMemberByCardNumber.rejected, (state) => {
      state.member.isSearchLoaded = true;
      state.member.isSearchLoading = false;
    });
    builder.addCase(getVisitDashboard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVisitDashboard.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.data = action.payload.result;
      } else {
        state.data = initialState.data;
      }
    });
    builder.addCase(getVisitDashboard.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createVisit.pending, (state, action) => {
      state.visits.loading = true;
    });
    builder.addCase(createVisit.fulfilled, (state, action) => {
      state.visits.data = [...state.visits.data, action.payload];
      state.visits.loading = false;
    });
    builder.addCase(createVisit.rejected, (state, action) => {
      state.visits.loading = false;
    });
    builder.addCase(getSnapShot.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSnapShot.fulfilled, (state, action) => {
      state.loading = false;
      state.snapshot = action.payload?.result;
    });
    builder.addCase(getSnapShot.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const { resetMember } = dashboardSlice.actions;

export default dashboardSlice.reducer;

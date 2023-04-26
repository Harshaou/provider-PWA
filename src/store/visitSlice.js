import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: {
    content: [],
  },
  visitDetail: null,
};

export const getVisits = createAsyncThunk('getVisits', async (page) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/visit?status=Open&sort=visitCreatedOn,desc&page=${page}&size=${6}`,
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

export const getVisitsDetailById = createAsyncThunk('getVisitsDetailById', async (id) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(`${baseUrl}/provider/visit/${id}/detail?sublimit=true`, {
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

export const getPreAuthsWithFilter = createAsyncThunk('preAuths/filter', async (args) => {
  let token = localStorage.getItem('x-auth-token');

  try {
    const response = await axios.get(
      `${baseUrl}/provider/preauth/list?page=${args.page}&size=${args.size}&sort=createdTimestamp,desc&status=${args.filter}&patientType=${args.type}`,
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

export const getMemberStatusAndInfo = createAsyncThunk('searchMember/preAuths', async (numb) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/search/submission-status/${numb}?memberInformation=true`,
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

export const newPreAuth = createAsyncThunk('addNewPreAuths', async ({ data, handleFinish }) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios({
      method: 'POST',
      url: `${baseUrl}/provider/preauth/create`,
      data: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    handleFinish();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const preAuthSearch = createAsyncThunk('preAuth/preAuthSearch', async (e) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${baseUrl}/provider/preauth/search?query=${e}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const PreAuthSlice = createSlice({
  name: 'visits',
  initialState: initialState,
  extraReducers(builder) {
    //AsyncReducers start here
    //Get Pre-auth
    builder.addCase(getVisits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVisits.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.data = action.payload?.result;
      } else {
        state.data = {
          content: [],
        };
      }
    });
    builder.addCase(getVisits.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
    //Get Pre-auth with Filter
    builder.addCase(getPreAuthsWithFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPreAuthsWithFilter.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.result) {
        state.data = action.payload.result;
      } else {
        state.data = initialState.data;
      }
    });
    builder.addCase(getPreAuthsWithFilter.rejected, (state) => {
      state.loading = false;
    });
    //PreAuth member search
    builder.addCase(getMemberStatusAndInfo.pending, (state) => {
      state.member.isSearchLoading = true;
    });
    builder.addCase(getMemberStatusAndInfo.fulfilled, (state, action) => {
      state.member.isSearchLoading = false;
      state.member.isSearchLoaded = true;
      if (!action.payload.result) {
        state.member.error = action.payload.message;
      } else {
        if (action.payload?.result.pre_auth === false) {
          state.member.error = false;
          state.member.data = action.payload?.result?.member;
        } else {
          state.member.error = 'An existing pre-auth already exists for Member number';
        }
      }
    });
    builder.addCase(getMemberStatusAndInfo.rejected, (state) => {
      state.loading = false;
    });
    //PreAuth search
    builder.addCase(preAuthSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(preAuthSearch.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.result) {
        state.data = action.payload.result;
      } else {
        state.data = initialState.data;
      }
    });
    builder.addCase(getVisitsDetailById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVisitsDetailById.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.visitDetail = action.payload.result;
      }
    });
    builder.addCase(getVisitsDetailById.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetMember, addMemberError } = PreAuthSlice.actions;

export default PreAuthSlice.reducer;

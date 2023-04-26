import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  openVisit: {
    content: [],
  },
  submittedVisit: {
    content: [],
  },
  claimDetails: {
    timeline: [],
  },
};

export const fileClaim = createAsyncThunk(
  'newPreAuth/new',
  async ({ formData, openNotificationWithIcon, navigate }) => {
    console.log(...formData);
    let token = localStorage.getItem('x-auth-token');
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${baseUrl}/provider/medical-claim`,
        data: formData,
        headers: {
          Accept: 'application/json',

          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      openNotificationWithIcon('success', data.message);
      navigate(`/pre-auths/${data?.result?.pre_authorisation_id}`);
      return data;
    } catch (error) {
      openNotificationWithIcon('error', error.message);
      console.log(error);
    }
  },
);

export const getSubmittedClaims = createAsyncThunk('getSubmittedClaims', async (page) => {
  let token = localStorage.getItem('x-auth-token');

  try {
    const response = await axios.get(
      `${baseUrl}/provider/medical-claim/?sort=createdTimestamp,desc&page=${page}&size=${6}`,
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

export const getSubmittedClaimsWithFilter = createAsyncThunk(
  'getSubmittedClaimsWithFilter',
  async ({ page, status }) => {
    let token = localStorage.getItem('x-auth-token');

    try {
      const response = await axios.get(
        `${baseUrl}/provider/medical-claim/?sort=createdTimestamp,desc&page=${page}&size=${6}&status=${status}`,
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
  },
);

export const searchSubmittedClaims = createAsyncThunk(
  'searchSubmittedClaims',
  async ({ page, query }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(
        `${baseUrl}/provider/medical-claim/search?query=${query}`,
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
  },
);

export const getClaimDetail = createAsyncThunk('getClaimDetail', async (id) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(`${baseUrl}/provider/medical-claim/${id}/status/timeline`, {
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

export const getClaimVisits = createAsyncThunk('getClaimVisits', async (page) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/visit?status=Close&sort=visitCreatedOn,desc&screen=Claim&page=${page}&size=${6}`,
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

export const claimSlice = createSlice({
  name: 'claim',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getClaimVisits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClaimVisits.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.openVisit = action.payload?.result;
      } else {
        state.openVisit = {
          content: [],
        };
      }
    });
    builder.addCase(getClaimVisits.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
    builder.addCase(getSubmittedClaims.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubmittedClaims.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.submittedVisit = action.payload?.result;
      } else {
        state.submittedVisit = {
          content: [],
        };
      }
    });
    builder.addCase(getSubmittedClaims.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
    builder.addCase(getSubmittedClaimsWithFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubmittedClaimsWithFilter.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.submittedVisit = action.payload?.result;
      } else {
        state.submittedVisit = {
          content: [],
        };
      }
    });
    builder.addCase(getSubmittedClaimsWithFilter.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });

    builder.addCase(searchSubmittedClaims.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchSubmittedClaims.fulfilled, (state, action) => {

      state.loading = false;
      if (action.payload?.result) {
        console.log(action.payload?.result)
        state.submittedVisit.content = action.payload?.result;
        state.submittedVisit.property = null;
      } else {
        state.submittedVisit = {
          content: [],
        };
      }
    });
    builder.addCase(searchSubmittedClaims.rejected, (state) => {
      state.loading = false;
      state.submittedVisit = {
        content: [],
      };
    });

    builder.addCase(getClaimDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClaimDetail.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.claimDetails = action.payload.result;
      } else {
        state.claimDetails = [];
      }
    });
    builder.addCase(getClaimDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetMember, addMemberError } = claimSlice.actions;

export default claimSlice.reducer;

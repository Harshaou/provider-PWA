import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: {
    content: [],
  },
  openVisit: {
    content: [],
  },
  preAuthDetails: {
    timeline: [],
  },
};

export const getVisitsPreAuth = createAsyncThunk('getVisits', async (page) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/visit?status=Open&sort=visitCreatedOn,desc&screen=PreAuth&page=${page}&size=${6}`,
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

export const newPreAuth = createAsyncThunk(
  'newPreAuth/new',
  async ({ updatedValue, openNotificationWithIcon, navigate, setLoading }) => {
    let token = localStorage.getItem('x-auth-token');
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/provider/pre-authorisation`, updatedValue, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('data==', data);
      if (data?.api?.responseCode === 2010) {
        openNotificationWithIcon('success', data.message);
        navigate(`/pre-auths/${data?.result?.pre_authorisation_id}`);
      } else {
        openNotificationWithIcon('error', data.message);
      }
      setLoading(false);
      return data;
    } catch (error) {
      openNotificationWithIcon('error', error.message);
      console.log(error);
      setLoading(false);
    }
  },
);

export const getSubmittedPreAuth = createAsyncThunk('getSubmittedPreAuth', async (page) => {
  let token = localStorage.getItem('x-auth-token');

  try {
    const response = await axios.get(
      `${baseUrl}/provider/pre-authorisation?sort=createdTimestamp,desc&page=${page}&size=${6}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getSubmittedPreAuthWithFilter = createAsyncThunk(
  'getSubmittedPreAuthWithFilter',
  async ({ page, status }) => {
    let token = localStorage.getItem('x-auth-token');

    try {
      const response = await axios.get(
        `${baseUrl}/provider/pre-authorisation/?sort=createdTimestamp,desc&page=${page}&size=${6}&status=${status}`,
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

export const searchSubmittedPreAuth = createAsyncThunk(
  'searchSubmittedPreAuth',
  async ({ page, query }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(
        `${baseUrl}/provider/pre-authorisation/search?query=${query}`,
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

export const getPreAuthDetail = createAsyncThunk('preAuthDetail', async (id) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/pre-authorisation/${id}/status/timeline`,
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

export const PreAuthSlice = createSlice({
  name: 'preAuths',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    //AsyncReducers start here
    //Get Pre-auth
    builder.addCase(getVisitsPreAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVisitsPreAuth.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.openVisit = action.payload?.result;
      } else {
        state.openVisit = {
          content: [],
        };
      }
    });
    builder.addCase(getVisitsPreAuth.rejected, (state) => {
      state.loading = false;
      state.openVisit = {
        content: [],
      };
    });
    builder.addCase(getSubmittedPreAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubmittedPreAuth.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.data = action.payload?.result;
      } else {
        state.data = {
          content: [],
        };
      }
    });
    builder.addCase(getSubmittedPreAuth.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
    builder.addCase(getPreAuthDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPreAuthDetail.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.preAuthDetails = action.payload?.result;
      } else {
        state.preAuthDetails = {
          content: [],
        };
      }
    });
    builder.addCase(getPreAuthDetail.rejected, (state) => {
      state.loading = false;
      state.preAuthDetails = {
        content: [],
      };
    });
    builder.addCase(getSubmittedPreAuthWithFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubmittedPreAuthWithFilter.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.data = action.payload?.result;
      } else {
        state.data = {
          content: [],
        };
      }
    });
    builder.addCase(getSubmittedPreAuthWithFilter.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
    builder.addCase(searchSubmittedPreAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchSubmittedPreAuth.fulfilled, (state, action) => {

      state.loading = false;
      if (action.payload?.result) {
        state.data.content = action.payload?.result;
        state.data.property = null;
      } else {
        state.data = {
          content: [],
        };
      }
    });
    builder.addCase(searchSubmittedPreAuth.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
  },
});

// export const {} = PreAuthSlice.actions;

export default PreAuthSlice.reducer;

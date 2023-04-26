import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  openVisits: {
    content: [],
  },
  data: {
    content: [],
  },
  prescriptionDetail: {
    medicines: [],
  },
};

export const getPrescriptionVisits = createAsyncThunk('getVisits/prescription', async (page) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(
      `${baseUrl}/provider/visit?status=Open&sort=visitCreatedOn,desc&screen=Prescription&page=${page}&size=${6}`,
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

export const getSubmittedPrescriptions = createAsyncThunk(
  'getSubmittedPrescriptions',
  async (page) => {
    let token = localStorage.getItem('x-auth-token');

    try {
      const response = await axios.get(
        `${baseUrl}/provider/rx/?sort=createdTimestamp,desc&page=${page}&size=${6}`,
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

export const searchSubmittedPrescriptions = createAsyncThunk(
  'searchSubmittedPrescriptions',
  async ({ page, query }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(
        `${baseUrl}/provider/rx/search?query=${query}`,
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

export const createPrescription = createAsyncThunk(
  'createPrescription/new',
  async ({ updatedValue, navigate, openNotificationWithIcon, setLoading }) => {
    let token = localStorage.getItem('x-auth-token');
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/provider/rx`, updatedValue, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.api?.responseCode === 2010) {
        openNotificationWithIcon('success', data.message);
        navigate(`/prescription/${data?.result?.prescription_id}`);
      } else {
        openNotificationWithIcon('error', data.message);
      }
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      openNotificationWithIcon('error', error.message);
      console.log(error);
    }
  },
);

export const getPrescriptionDetail = createAsyncThunk('getClaimDetail', async (id) => {
  let token = localStorage.getItem('x-auth-token');
  try {
    const response = await axios.get(`${baseUrl}/provider/rx/${id}`, {
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

export const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState: initialState,
  extraReducers(builder) {
    builder.addCase(getPrescriptionVisits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrescriptionVisits.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.openVisits = action.payload?.result;
      } else {
        state.openVisits = {
          content: [],
        };
      }
    });
    builder.addCase(getPrescriptionVisits.rejected, (state) => {
      state.loading = false;
      state.openVisits = {
        content: [],
      };
    });
    builder.addCase(getSubmittedPrescriptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubmittedPrescriptions.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.data = action.payload?.result;
      } else {
        state.data = {
          content: [],
        };
      }
    });
    builder.addCase(getSubmittedPrescriptions.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
    builder.addCase(getPrescriptionDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrescriptionDetail.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.prescriptionDetail = action.payload?.result;
      } else {
        state.prescriptionDetail = {};
      }
    });
    builder.addCase(getPrescriptionDetail.rejected, (state) => {
      state.loading = false;
      state.prescriptionDetail = {};
    });

    builder.addCase(searchSubmittedPrescriptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchSubmittedPrescriptions.fulfilled, (state, action) => {

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
    builder.addCase(searchSubmittedPrescriptions.rejected, (state) => {
      state.loading = false;
      state.data = {
        content: [],
      };
    });
  },
});

export const { resetMember, addMemberError } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;

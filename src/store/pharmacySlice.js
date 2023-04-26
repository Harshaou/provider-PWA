import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: {
    content: [],
  },
  newReqState: {
    loading: false,
  },
  member: {
    isSearchLoaded: false,
    isSearchLoading: false,
    data: null,
    error: false,
  },
};

export const createManualClaim = createAsyncThunk(
  'createManualClaim',
  async ({ formData, openNotificationWithIcon, navigate }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${baseUrl}/provider/pharmacy`,
        data: formData,
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      openNotificationWithIcon('success', data.message);
      navigate('/');
    } catch (error) {
      openNotificationWithIcon('error', error.message);
    }
  },
);

export const deletePrescription = createAsyncThunk(
  'prescriptionDelete',
  async ({ id, openNotificationWithIcon }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const { data } = await axios.delete(`${baseUrl}/provider/prescription/delete/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      openNotificationWithIcon('success', data.message);
      return id;
    } catch (error) {
      console.log(error);
      openNotificationWithIcon('error', error.message);
    }
  },
);

export const getPharmacyClaimList = createAsyncThunk(
  'getPharmacyClaimList/new',
  async ({ page }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const { data } = await axios.get(
        `${baseUrl}/provider/pharmacy/list?page=${page}&size=${6}&sort=createdTimestamp,desc`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getPharmacyManualClaimList = createAsyncThunk(
  'getPharmacyManualClaimList/new',
  async ({ page }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const { data } = await axios.get(
        `${baseUrl}/provider/pharmacy/manual-claim/list?page=${page}&size=${6}&sort=createdTimestamp,desc`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const initiatePharmacyClaim = createAsyncThunk(
  'initiatePharmacyClaim/new',
  async ({ updatedValue, navigate, openNotificationWithIcon }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const { data } = await axios.post(`${baseUrl}/provider/pharmacy/claim`, updatedValue, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.api.responseCode === 2010) {
        openNotificationWithIcon('success', data.message);
        navigate('/');
      } else {
        openNotificationWithIcon('error', data.message);
      }
      return data;
    } catch (error) {
      openNotificationWithIcon('error', error.message);
      console.log(error);
    }
  },
);

export const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState: initialState,
  reducers: {
    addMemberError: (state) => {
      state.member.isSearchLoaded = true;
      state.member.error = 'An existing prescription already exists for Member number';
    },
    resetMember: (state) => {
      state.member.isSearchLoading = false;
      state.member.isSearchLoaded = false;
      state.member.data = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPharmacyClaimList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPharmacyClaimList.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.data = action.payload?.result;
      } else {
        state.data = initialState.data;
      }
    });
    builder.addCase(getPharmacyClaimList.rejected, (state) => {
      state.loading = false;
      state.data = initialState.data;
    });
    builder.addCase(getPharmacyManualClaimList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPharmacyManualClaimList.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.data = action.payload?.result;
      } else {
        state.data = initialState.data;
      }
    });
    builder.addCase(getPharmacyManualClaimList.rejected, (state) => {
      state.loading = false;
      state.data = initialState.data;
    });

    builder.addCase(deletePrescription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePrescription.fulfilled, (state, action) => {
      state.loading = false;
      state.data.content = state.data.content.filter(
        (item) => item.prescription_id !== action.payload,
      );
      state.data.property.total_elements = state.data.property.total_elements - 1;
    });
  },
});

export const { resetMember, addMemberError } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;

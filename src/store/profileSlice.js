import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
  users: [],
};

export const getUserProfile = createAsyncThunk('userProfile/getUserProfile', async () => {
  try {
    let token = localStorage.getItem('x-auth-token');
    const { data } = await axios({
      method: 'GET',
      url: `${baseUrl}/provider/profile`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const listAllUsers = createAsyncThunk('userProfile/listAllUsers', async () => {
  try {
    let token = localStorage.getItem('x-auth-token');
    const { data } = await axios({
      method: 'GET',
      url: `${baseUrl}/provider/profile/users`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const changeUserStatus = createAsyncThunk(
  'userProfile/changeUserStatus',
  async ({ userId, openNotificationWithIcon }) => {
    try {
      let token = localStorage.getItem('x-auth-token');
      const { data } = await axios({
        method: 'POST',
        url: `${baseUrl}/user/${userId}/activate`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      openNotificationWithIcon('success', data.message);
      return userId;
    } catch (error) {
      openNotificationWithIcon('error');
    }
  },
);

export const deleteUserProfile = createAsyncThunk(
  'userProfile/deleteUserProfile',
  async ({ id, openNotificationWithIcon }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.delete(`${baseUrl}/user/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      openNotificationWithIcon('success', response.data.message);
      return id;
    } catch (error) {
      openNotificationWithIcon('error');
      console.log(error);
    }
  },
);

export const addNewUser = createAsyncThunk('userProfile/addNewUser', async (data) => {
  try {
    let token = localStorage.getItem('x-auth-token');
    const response = await axios({
      method: 'POST',
      url: `${baseUrl}/user`,
      data: data.data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.api.responseCode === 2010) {
      data.notification('success', response.data.message);
      data.addUserScreen(false);
    }
    if (response.data.api.responseCode === 3530) {
      data.notification('error', response.data.message, 'Email already in use');
    }
    console.log(response);
    return response.data;
  } catch (error) {
    data.notification('error', error.response.data.message);
  }
});

export const changePassword = createAsyncThunk('userProfile/changePassword', async (data) => {
  try {
    let token = localStorage.getItem('x-auth-token');
    const response = await axios({
      method: 'PATCH',
      url: `${baseUrl}/user/account/password`,
      data: data.data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    data.notification('success');
    data.navigate(false);
    console.log(data);
    return response.data;
  } catch (error) {
    data.notification('error', error.response.data.message);
  }
});

export const changeLogo = createAsyncThunk(
  'userProfile/changeLogo',
  async ({ formData, openNotificationWithIcon }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/provider/profile/logo`,
        data: formData,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      openNotificationWithIcon('success', response.data.message);
      return response.data?.result;
    } catch (error) {
      openNotificationWithIcon('error');
      console.log(error);
    }
  },
);

export const removeLogo = createAsyncThunk(
  'userProfile/removeLogo',
  async ({ openNotificationWithIcon }) => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${baseUrl}/provider/profile/logo`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      openNotificationWithIcon('success', response.data.message);
    } catch (error) {
      openNotificationWithIcon('error');
      console.log(error);
    }
  },
);

export const UserProfileSlice = createSlice({
  name: 'userProfile',
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
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.result;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.result;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(listAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload?.result;
    });
    builder.addCase(listAllUsers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(changeUserStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeUserStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((item) => {
        if (item.user_id === action.payload) {
          return { ...item, status: 'Active' };
        }
        return item;
      });
    });

    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.result) {
        state.users = [...state.users, action.payload?.result];
      }
    });
    builder.addCase(changeLogo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeLogo.fulfilled, (state, action) => {
      state.loading = false;
      state.data.documents = action.payload;
    });
    builder.addCase(changeLogo.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(removeLogo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeLogo.fulfilled, (state) => {
      state.loading = false;
      state.data.documents.logo = {};
    });
    builder.addCase(removeLogo.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((item) => item.user_id !== action.payload);
    });
    builder.addCase(deleteUserProfile.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default UserProfileSlice.reducer;

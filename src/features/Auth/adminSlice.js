import adminApi from "api/adminApi";
import userApi from "api/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const login = createAsyncThunk(
  '/admin/auth/admin-sign-in',

  async (payload) => {
    const data = await userApi.login(payload);
    localStorage.setItem('access_token', data.data.data.token);
    localStorage.setItem('admin', JSON.stringify(data.data.data));

    return data.data.data;
  }
);

export const getRecruiters = createAsyncThunk(
  '/admin',

  async (payload) => {
    const data = await adminApi.getRecruiters(payload);
    return data.data.data;
  }
);

export const verifyCompany = createAsyncThunk(
  '/admin/verification',

  async (payload) => {
    const data = await adminApi.verifyCompany(payload.id, payload.verify);
    return data.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    current: JSON.parse(localStorage.getItem('admin')) || {},
    settings: {},
    recruiters: []
  },
  // Async action
  reducers: {
    logout(state) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('admin');
      state.recruiters = [];
      state.current = {};
    },
    addToRecruiters: (state, action) => {
      const newRecruiters = state.recruiters;
      const index = newRecruiters.findIndex(x => x.id === action.payload.id);
      if (index > -1) {
        return;
      }
      newRecruiters.splice(0, 0, action.payload);
    },
    removeCompany: (state, action) => {
      const data = state.recruiters;
      const index = data.findIndex(company => company.id === action.payload);
      if (index !== -1) {
        data.splice(index, 1);
      } else { return }
    }
  },
  // when thunk successfully, use extraReducer update data
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [getRecruiters.fulfilled]: (state, action) => {
      state.recruiters = action.payload.data;
    },
    // [verifyCompany.fulfilled]: (state, action) => {
    //   return state.recruiters.filter(company => company.id !== action.payload)
    // }
  },
});

const { actions, reducer: adminReducer } = adminSlice;
export const { logout, removeCompany, addToRecruiters } = actions;
export default adminReducer;
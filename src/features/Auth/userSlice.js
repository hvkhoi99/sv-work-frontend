import userApi from 'api/userApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const register = createAsyncThunk(
  '/register',

  async (payload) => {
    const data = await userApi.signup(payload);

    console.log(data.data);
    
    return data.data;
  }

);

export const login = createAsyncThunk(
  '/login',

  async (payload) => {
    const data = await userApi.login(payload);

    localStorage.setItem('access_token', data.data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.data));
    localStorage.setItem('role', data.data.data.role_id);

    return data.data.data;
  }
);

export const loginGoogle = createAsyncThunk(
  '/loginGoogle',

  async (payload) => {
    console.log("payload", payload)
    const data = await userApi.loginGoogle(payload);
    
    localStorage.setItem('access_token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data));
    localStorage.setItem('role', data.data.role);

    return data;
  }


);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem('user')) || {},
    settings: {},
  },
  // Async action
  reducers: {
    logout(state) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      console.log("logout");
      
      state.current = {};
    },

    uploadAvatar(state, action) {
      const linkAvatar = action.payload.linkAva;
      state.current.avatarLink = linkAvatar;
    },
  },
  // when thunk successfully, use extraReducer update data
  extraReducers: {
    // 'user/login/fulfilled'
    // 'user/login/pending'
    // 'user/login/error'

    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginGoogle.fulfilled]: (state, action) => {
      state.current = action.payload.data;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, uploadAvatar } = actions;
export default reducer;
import userApi from 'api/userApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// export const signup = createAsyncThunk(
//   'auth/sign-up/:roleId',

//   async (payload) => {
//     const data = await userApi.signup(payload);

//     return data.data;
//   }

// );

export const login = createAsyncThunk(
  '/auth/sign-in',

  async (payload) => {
    const data = await userApi.login(payload);
    localStorage.setItem('access_token', data.data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.data));
    localStorage.setItem('role_id', JSON.stringify(data.data.data.role_id));

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
    localStorage.setItem('role_id', JSON.stringify(data.data.role_id));

    return data.data.data;
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
      localStorage.removeItem('role_id');
      
      state.current = {};
    },

    updateUser(state, action) {
      state.current = action.payload
    },

    uploadAvatar(state, action) {
      const linkAvatar = action.payload.linkAva;
      state.current.avatarLink = linkAvatar;
    },
  },
  // when thunk successfully, use extraReducer update data
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginGoogle.fulfilled]: (state, action) => {
      state.current = action.payload.data;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, updateUser, uploadAvatar } = actions;
export default reducer;
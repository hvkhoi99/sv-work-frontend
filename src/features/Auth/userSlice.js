import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
      addUser: (state, action) => {
        const newUsers = [action.payload].concat(state);
        return newUsers;
      },
    //   removePhoto: (state, action) => {
    //     const photoId = action.payload;
    //     return state.filter(photo => photo.id !== photoId);
    //   },
    //   updatePhoto: (state, action) => {
    //     const newPhoto = action.payload;
  
    //     const photoIndex = state.findIndex(photo => photo.id === newPhoto.id);
  
    //     if (photoIndex !== -1) {
    //       state[photoIndex] = newPhoto;
    //     }
    //   }
    }
  });
  
  const { reducer: userReducer } = user;
//   export const { } = actions;
  export default userReducer;
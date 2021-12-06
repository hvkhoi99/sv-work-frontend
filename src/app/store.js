import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/Auth/userSlice';
import adminReducer from 'features/Auth/adminSlice';

const rootReducer = {
    users: userReducer,
    admin: adminReducer
};

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
});

export default store;

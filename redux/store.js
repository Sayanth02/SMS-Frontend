import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import userReducer from './slices/userSlice'
import studentReucer from './slices/studentSlice'
import feesReducer from './slices/feesSlice'
import libraryReducer from './slices/librarySlice'

const store = configureStore({
  reducer: {
    auth: authReducer, 
    user: userReducer,
    student: studentReucer,
    fees : feesReducer,
    library : libraryReducer,
  },
});

export default store;

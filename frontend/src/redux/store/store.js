import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slice';
import studentsReducer from "../slices/students.slice"

const store = configureStore({
  reducer: {
    user: userReducer,
    students:studentsReducer
  }
});

export default store;

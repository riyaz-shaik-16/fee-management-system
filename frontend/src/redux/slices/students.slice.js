import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
      state.error = null;
    },
    updateStudent(state, action) {
      const updated = action.payload;
      state.students = state.students.map((student) =>
        student.id === updated.id ? updated : student
      );
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearStudents(state) {
      state.students = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setStudents,
  updateStudent,
  setLoading,
  setError,
  clearStudents,
  addStudent,
} = studentsSlice.actions;

export const selectStudents = (state) => state.students.students;
export const selectStudentsLoading = (state) => state.students.loading;
export const selectStudentsError = (state) => state.students.error;

export default studentsSlice.reducer;

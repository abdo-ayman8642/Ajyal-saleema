import { createSlice } from '@reduxjs/toolkit';
import {
  addGrade,
  deleteGrade,
  editGrade,
  getGrades,
  getGradesInDepartment,
} from './actions';

const initialState = {
  grades: [],
  gradesGroup: null,
  loading: false,
  error: null,
  success: true,
};

const gradeSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {},
  extraReducers: {
    //Show grades
    [getGrades.pending]: (state) => {
      state.loading = true;
    },
    [getGrades.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.grades = payload.data;
    },
    [getGrades.rejected]: (state) => {
      state.loading = false;
      console.log('There is something went wrong!');
    },

    //add grade
    [addGrade.pending]: (state) => {
      state.saveLoading = true;
    },
    [addGrade.fulfilled]: (state, { payload }) => {
      state.saveLoading = false;

      if (payload.status) {
        state.grades.push(payload.data);
      }

      if (!payload.status) {
        console.log(payload.msg);
      }
    },
    [addGrade.rejected]: (state, action) => {
      state.saveLoading = false;
      toast.error('There is something went wrong!');
    },

    //edit grade
    [editGrade.pending]: (state) => {
      state.saveLoading = true;
    },
    [editGrade.fulfilled]: (state, { payload }) => {
      state.saveLoading = false;
      if (payload.status) {
        state.grades = state.grades.map((item) =>
          item.id === payload.data.id ? payload.data : item
        );
        toast.success('Updated successfully!');
      } else {
        toast.error(payload.msg);
      }
    },
    [editGrade.rejected]: (state) => {
      state.saveLoading = false;
    },

    //delete grade
    [deleteGrade.pending]: (state) => {
      state.deleteloading = true;
    },
    [deleteGrade.fulfilled]: (state, { payload }) => {
      state.deleteloading = false;

      if (payload.data.status) {
        state.grades = state.grades.filter(
          (item) => item.id !== payload.id
        );
      }

      if (!payload.data.status) {
        console.log(payload.data.msg);
      }
    },
    [deleteGrade.rejected]: (state) => {
      state.deleteloading = false;
      // toast.error('Something went wrong!');
    },

    //get specific grades
    [getGradesInDepartment.pending]: (state) => {
      state.gradesGrouploading = true;
    },
    [getGradesInDepartment.fulfilled]: (state, { payload }) => {
      state.gradesGroupLoading = false;

      if (payload.status) {
        state.gradesGroup = payload.data.lms_grades;
      }

      if (!payload.status) {
        // toast.error(payload.data.msg);
      }
    },
    [getGradesInDepartment.rejected]: (state) => {
      state.gradesGrouploading = false;
      // toast.error('Something went wrong!');
    },
  },
});

export default gradeSlice.reducer;

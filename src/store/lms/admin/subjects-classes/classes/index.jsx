import { createSlice } from '@reduxjs/toolkit';
import {
  addClass,
  deleteClass,
  editClass,
  getClasses,
  getClassesInGrade,
} from './actions';


const initialState = {
  classes: [],
  loading: false,
  error: null,
  success: true,
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: {
    //Show Classes
    [getClasses.pending]: (state) => {
      state.loading = true;
    },
    [getClasses.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.classes = payload.data;
    },
    [getClasses.rejected]: (state) => {
      state.loading = false;
    //   toast.error('There is something went wrong!');
    },

    //add Class
    [addClass.pending]: (state) => {
      state.saveLoading = true;
    },
    [addClass.fulfilled]: (state, { payload }) => {
      state.saveLoading = false;

      if (payload.status) {
        state.classes.push(payload.data);
        // toast.success('Added Successfully!');
      }

      if (!payload.status) {
        // toast.error(payload.msg);
      }
    },
    [addClass.rejected]: (state, action) => {
      state.saveLoading = false;
    //   toast.error('There is something went wrong!');
    },

    //edit class
    [editClass.pending]: (state) => {
      state.saveLoading = true;
    },
    [editClass.fulfilled]: (state, { payload }) => {
      state.saveLoading = false;
      if (payload.status) {
        state.classes = state.classes.map((item) =>
          item.id === payload.data.id ? payload.data : item
        );
        // toast.success('Updated successfully!');
      } else {
        // toast.error(payload.msg);
      }
    },
    [editClass.rejected]: (state) => {
      state.saveLoading = false;
    },

    //delete class
    [deleteClass.pending]: (state) => {
      state.deleteloading = true;
    },
    [deleteClass.fulfilled]: (state, { payload }) => {
      state.deleteloading = false;

      if (payload.data.status) {
        state.classes = state.classes.filter((item) => item.id !== payload.id);
        // toast.success('Deleted successfully!');
      }

      if (!payload.data.status) {
        // toast.error(payload.data.msg);
      }
    },
    [deleteClass.rejected]: (state) => {
      state.deleteloading = false;
    //   toast.error('Something went wrong!');
    },

    // Get specific classes for grade:
    [getClassesInGrade.pending]: (state) => {
      state.loading = true;
    },
    [getClassesInGrade.fulfilled]: (state, { payload }) => {
      state.loading = true;
      if (payload.status) {
        state.classesGroup = payload.data.lms_classes;
      } else {
        // toast.error(payload.msg);
      }
    },
    [getClassesInGrade.rejected]: (state) => {
      state.loading = true;
    //   toast.error('There is something went wrong!');
    },
  },
});

export default classSlice.reducer;

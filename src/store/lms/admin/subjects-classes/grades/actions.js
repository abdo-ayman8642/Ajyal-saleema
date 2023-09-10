import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminBaseUrl } from 'src/configs/baseUrl.js';

export const getGrades = createAsyncThunk(
  //action type string
  '/academics/grades/getGrades',
  // callback function
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get('/academics/grade?lang=en');
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const addGrade = createAsyncThunk(
  //action type string
  'grades/addGrade',
  // callback function
  async ({ data, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post('/academics/grade/save?lang=en', data);
      if (response.data.status) {
        reset();
      }
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteGrade = createAsyncThunk(
  //action type string
  'grades/deleteGrade',
  // callback function
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(`/academics/grade/${id}/delete?lang=en`);

      return { data: response.data, id: id };
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const editGrade = createAsyncThunk(
  //action type string
  'grades/editGrade',
  // callback function
  async ({ data, id, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post(
        `/academics/grade/${id}/update?lang=en`,
        data
      );
      if (response.data.status) {
        reset();
      }
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const getGradesInDepartment = createAsyncThunk(
  //action type string
  'grades/getGradesInDepartment',
  // callback function
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(
        `/academics/department/${id}/grades?lang=en`
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

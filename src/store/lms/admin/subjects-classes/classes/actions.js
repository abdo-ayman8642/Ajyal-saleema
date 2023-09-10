import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminBaseUrl } from 'src/configs/baseUrl.js';

export const getClasses = createAsyncThunk(
  //action type string
  'classes/getClasses',
  // callback function
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get('/academics/class?lang=en');
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const addClass = createAsyncThunk(
  //action type string
  'classes/addClass',
  // callback function
  async ({ data, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post('/academics/class/save?lang=en', data);
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

export const deleteClass = createAsyncThunk(
  //action type string
  'classes/deleteClass',
  // callback function
  async ({ id, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(`/academics/class/${id}/delete?lang=en`);

      reset();

      return { data: response.data, id: id };
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const editClass = createAsyncThunk(
  //action type string
  'classes/editClass',
  // callback function
  async ({ data, id, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post(
        `/academics/class/${id}/update?lang=en`,
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

export const getClassesInGrade = createAsyncThunk(
  'classes/getClassesInGrade',
  async (id, { rejectWithValue }) => {
    try {
      const repsonse = await adminBaseUrl.get(`/academics/grade/${id}/classes?lang=en`);
      return repsonse.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
    }
  }
);

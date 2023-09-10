import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminBaseUrl } from 'src/configs/baseUrl.js';

export const getDepartments = createAsyncThunk(
  //action type string
  'departments/getDepartments',
  // callback function
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get('/academics/department?lang=en');
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const addDepartment = createAsyncThunk(
  //action type string
  'departments/addDepartment',
  // callback function
  async ({ data, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post(
        '/academics/department/save?lang=en',
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

export const deleteDepartment = createAsyncThunk(
  //action type string
  'departments/deleteDepartment',
  // callback function
  async ({ id  }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(
        `/academics/department/${id}/delete?lang=en`
      );

      return { data: response.data, id: id };
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const editDepartment = createAsyncThunk(
  //action type string
  'departments/editDepartment',
  // callback function
  async ({ data, id, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post(
        `/academics/department/${id}/update?lang=en`,
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

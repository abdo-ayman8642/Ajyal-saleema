import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminBaseUrl } from 'src/configs/baseUrl.js';

export const getSubjects = createAsyncThunk(
  //action type string
  'subjects/getsubjects',
  // callback function
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get('/academics/subject?lang=en');
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const addSubject = createAsyncThunk(
  //action type string
  'subjects/addSubject',
  // callback function
  async ({ data, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post('/academics/subject/save?lang=en', data);
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

export const deleteSubject = createAsyncThunk(
  //action type string
  'subjects/deleteSubject',
  // callback function
  async ({ id, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(`/academics/subject/${id}/delete?lang=en`);

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

export const editSubject = createAsyncThunk(
  //action type string
  'subjects/editSubject',
  // callback function
  async ({ data, id, reset }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post(
        `/academics/subject/${id}/update?lang=en`,
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

export const getAllocatedSubjects = createAsyncThunk(
  //action type string
  'subjects/allocatedSubject',
  // callback function
  async ({ id }, { rejectWithValue }) => {

    try {
      const response = await adminBaseUrl.get(
        `/${id}/subjectsAllocation`
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

export const getSubjectsInClass = createAsyncThunk(
  //action type string
  'subjects/getSubjectsInClass',
  // callback function
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(
        `/academics/class/${id}/subjects?lang=en`
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

export const getSubjectQuizzes = createAsyncThunk(
  //action type string
  'subjects/getSubjectQuizzes',
  // callback function
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(
        `/lms/quizz/${id}/showQuizzes`
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

export const deleteQuiz = createAsyncThunk(
  //action type string
  'subjects/deleteQuize',
  // callback function
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.get(
        `/lms/quizz/${id}/delete`
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

export const addQuiz = createAsyncThunk(
  //action type string
  'subjects/addQuiz',
  // callback function
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminBaseUrl.post(
        `/lms/quizz/save`,data
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